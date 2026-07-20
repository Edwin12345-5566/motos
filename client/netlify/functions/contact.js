const nodemailer = require('nodemailer')

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Método no permitido' })
    }
  }

  try {
    const data = JSON.parse(event.body || '{}')
    const { name, email, phone, subject, message } = data
    const smtpUser = process.env.SMTP_USER || process.env.USER
    const smtpPass = process.env.SMTP_PASS || process.env.PASS
    const contactTo = process.env.CONTACT_TO || process.env.SMTP_TO
    const smtpFrom = process.env.SMTP_FROM || smtpUser

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, message: 'Completa los campos obligatorios.' })
      }
    }

    if (!smtpUser || !smtpPass || !contactTo) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ok: false,
          message: 'Faltan variables SMTP. Configura SMTP_USER, SMTP_PASS y CONTACT_TO en Netlify.'
        })
      }
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    await transporter.verify()

    await transporter.sendMail({
      from: `MotoXtreme <${smtpFrom}>`,
      to: contactTo,
      replyTo: email,
      subject: subject ? `Nuevo mensaje: ${subject}` : 'Nuevo mensaje desde la web',
      html: `
        <h2>Nuevo mensaje recibido en MotoXtreme</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${subject || 'Sin asunto'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })

    await transporter.sendMail({
      from: `MotoXtreme <${smtpFrom}>`,
      to: email,
      subject: 'Hemos recibido tu mensaje - MotoXtreme',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${name},</p>
        <p>Tu mensaje ha sido recibido correctamente.</p>
        <p><strong>Resumen de tu mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Saludos,<br>El equipo de MotoXtreme</p>
      `
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, message: 'Mensaje enviado correctamente.' })
    }
  } catch (error) {
    console.error('Contact form error:', error)
    let message = 'No se pudo enviar el mensaje. Revisa la configuracion SMTP.'

    if (error && (error.code === 'EAUTH' || error.responseCode === 535)) {
      message = 'Error de autenticacion SMTP. Verifica usuario, contrasena y App Password de Gmail.'
    }

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message })
    }
  }
}
