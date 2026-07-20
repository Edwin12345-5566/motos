import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    modelo: 'Yamaha R6',
    mensaje: '',
    acepto: false
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: '',
          subject: formData.modelo,
          message: formData.mensaje
        })
      })

      const data = await response.json()
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'No se pudo enviar el mensaje')
      }

      setStatus({ type: 'success', message: data.message || 'Mensaje enviado correctamente.' })
      setFormData({
        nombre: '',
        email: '',
        modelo: 'Yamaha R6',
        mensaje: '',
        acepto: false
      })
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'No se pudo enviar el mensaje.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="start-stripe" aria-hidden="true"></div>

      <header className="topbar">
        <div className="topbar__brand">
          <span className="topbar__mark">R</span>
          <span className="topbar__name">SPORTBIKES</span>
        </div>
        <nav className="topbar__nav" aria-label="Navegacion principal">
          <a href="#inicio">Inicio</a>
          <a href="#conceptos">Conceptos</a>
          <a href="#modelos">Modelos</a>
          <a href="#comparativa">Comparativa</a>
          <a href="#videos">Videos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <img
            className="hero__img"
            src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1400&q=80"
            alt="Moto deportiva en carretera"
          />
          <div className="hero__overlay"></div>
          <div className="hero__content">
            <p className="eyebrow">Guia rapida - motociclismo deportivo</p>
            <h1 className="hero__title">Potencia, precision y estilo.</h1>
            <p className="hero__sub">
              Descubre como funcionan las sportbikes, que modelos destacan y donde disfrutar de la experiencia sobre dos ruedas.
            </p>
            <a href="#modelos" className="btn btn--primary">Ver modelos ↓</a>
          </div>
        </section>

        <section className="section section--light" id="conceptos">
          <div className="section-head">
            <span className="rpm">01</span>
            <h2>Conceptos clave</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="content-grid">
            <div className="panel">
              <h3>Titulos</h3>
              <p>Las sportbikes se reconocen por su enfoque en rendimiento, agarre y respuesta inmediata.</p>
              <ol>
                <li>Motor de altas revoluciones</li>
                <li>Chasis rigido</li>
                <li>Frenada precisa</li>
              </ol>
            </div>

            <div className="panel">
              <h3>Listas utiles</h3>
              <ul>
                <li>Casco integral</li>
                <li>Guantes de cuero</li>
                <li>Protecciones</li>
              </ul>
              <p>El equipamiento correcto marca la diferencia entre una salida comoda y una experiencia segura.</p>
            </div>
          </div>
        </section>

        <section className="section" id="modelos">
          <div className="section-head">
            <span className="rpm">02</span>
            <h2>Modelos destacados</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="cards">
            <article className="card">
              <img src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&w=900&q=80" alt="Yamaha R6" />
              <div className="card__body">
                <h3>Yamaha R6</h3>
                <p className="card__tag">Supersport 600</p>
                <p>Ideal para quienes buscan una moto agil y muy vinculada al circuito.</p>
                <a href="https://www.yamaha-motor.eu/" target="_blank" rel="noopener noreferrer">Ver marca</a>
              </div>
            </article>

            <article className="card">
              <img src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80" alt="Kawasaki Ninja ZX-6R" />
              <div className="card__body">
                <h3>Kawasaki ZX-6R</h3>
                <p className="card__tag">Supersport 636</p>
                <p>Equilibrio entre potencia, estabilidad y una ergonomia muy equilibrada.</p>
                <a href="https://www.kawasaki.com/" target="_blank" rel="noopener noreferrer">Ver marca</a>
              </div>
            </article>

            <article className="card">
              <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80" alt="Ducati Panigale V2" />
              <div className="card__body">
                <h3>Ducati Panigale V2</h3>
                <p className="card__tag">Superbike italiana</p>
                <p>Una opcion premium con un caracter muy exclusivo y una gran presencia.</p>
                <a href="https://www.ducati.com/" target="_blank" rel="noopener noreferrer">Ver marca</a>
              </div>
            </article>
          </div>
        </section>

        <section className="section section--light" id="comparativa">
          <div className="section-head">
            <span className="rpm">03</span>
            <h2>Comparativa rapida</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Motor</th>
                  <th>Potencia</th>
                  <th>Enfoque</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Yamaha R6</td>
                  <td>599 cc</td>
                  <td>~118 CV</td>
                  <td>Circuito</td>
                </tr>
                <tr>
                  <td>Kawasaki ZX-6R</td>
                  <td>636 cc</td>
                  <td>~127 CV</td>
                  <td>Versatilidad</td>
                </tr>
                <tr>
                  <td>Ducati Panigale V2</td>
                  <td>955 cc</td>
                  <td>~155 CV</td>
                  <td>Alta gama</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section" id="galeria">
          <div className="section-head">
            <span className="rpm">04</span>
            <h2>Galeria visual</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=900&q=80" alt="Detalle de una moto deportiva" />
            <img src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&w=900&q=80" alt="Moto deportiva de perfil" />
            <img src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80" alt="Moto deportiva en curva" />
          </div>
        </section>

        <section className="section section--light" id="videos">
          <div className="section-head">
            <span className="rpm">05</span>
            <h2>Video y mapa</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="media-grid">
            <div className="iframe-card">
              <h3>Video de referencia</h3>
              <iframe
                src="https://www.youtube-nocookie.com/embed/mvn_3LRVr8c?rel=0&modestbranding=1&playsinline=1"
                title="Video de motos deportivas"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="iframe-card">
              <h3>Mapa interactivo</h3>
              <iframe
                src="https://www.google.com/maps?q=Jerez%20de%20la%20Frontera%20Circuito&output=embed"
                title="Mapa interactivo de un circuito de motos"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section className="section" id="contacto">
          <div className="section-head">
            <span className="rpm">06</span>
            <h2>Formulario de contacto</h2>
            <div className="redline" aria-hidden="true"></div>
          </div>

          <div className="contact-wrap">
            <p>Quieres recibir mas informacion sobre modelos, rutas o mantenimiento? Completa el formulario y te responderemos.</p>
            <form className="contact__form" id="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Correo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tuemail@ejemplo.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="modelo">Modelo de interes</label>
                <select id="modelo" name="modelo" value={formData.modelo} onChange={handleChange}>
                  <option>Yamaha R6</option>
                  <option>Kawasaki ZX-6R</option>
                  <option>Ducati Panigale V2</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  placeholder="Escribe tu consulta..."
                  value={formData.mensaje}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-row form-row--inline">
                <input
                  type="checkbox"
                  id="acepto"
                  name="acepto"
                  required
                  checked={formData.acepto}
                  onChange={handleChange}
                />
                <label htmlFor="acepto">Acepto recibir informacion relacionada con motocicletas.</label>
              </div>
              {status.message ? (
                <p className={`form-status form-status--${status.type}`}>{status.message}</p>
              ) : (
                <p className="form-status" role="status" aria-live="polite"></p>
              )}
              <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="start-stripe start-stripe--thin" aria-hidden="true"></div>
        <p>Sportbikes - informacion, imagenes y contenidos para apasionados del motor.</p>
      </footer>
    </>
  )
}

export default App
