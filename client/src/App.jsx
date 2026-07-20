import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bike, CalendarClock, CircleDollarSign, ShieldCheck, Star, MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Gauge, Sparkles, Shield } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './App.css'

const bikes = [
  {
    name: 'Yamaha R6',
    category: 'Deportiva',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=900&q=80',
    description: 'Desempeño de alto nivel para conductores que buscan precisión y velocidad.'
  },
  {
    name: 'Kawasaki ZX-6R',
    category: 'Supersport',
    price: '$13,200',
    image: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80',
    description: 'Equilibrio perfecto entre potencia, estabilidad y diseño agresivo.'
  },
  {
    name: 'Ducati Panigale V2',
    category: 'Superbike',
    price: '$18,900',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    description: 'Tecnología premium y una experiencia de conducción excepcional.'
  }
]

const promotions = [
  { title: 'Financiamiento flexible', description: 'Planes desde 24 meses con bajos intereses.', icon: CircleDollarSign },
  { title: 'Accesorios incluidos', description: 'Llantas, casco y mantenimiento básico al activar la compra.', icon: ShieldCheck },
  { title: 'Primer servicio gratis', description: 'Incluido en tu primera compra en la agencia.', icon: Sparkles }
]

const brands = ['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'Ducati', 'KTM']

const testimonials = [
  { name: 'Luis M.', role: 'Cliente premium', comment: 'La atención fue excelente y el proceso de compra fue muy claro.', stars: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Ana P.', role: 'Compradora recurrente', comment: 'Encontré la moto ideal y el equipo me guiaron en cada paso.', stars: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
]

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (!response.ok || !data.ok) {
        throw new Error(data.message || 'No se pudo enviar el mensaje')
      }

      setStatus({ type: 'success', message: data.message })
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="text-xl font-semibold tracking-[0.3em]">MOTOXTREME</a>
          <div className="hidden gap-6 md:flex">
            <a href="#catalogo" className="text-sm text-slate-300 hover:text-red-500">Catálogo</a>
            <a href="#promociones" className="text-sm text-slate-300 hover:text-red-500">Promociones</a>
            <a href="#horarios" className="text-sm text-slate-300 hover:text-red-500">Horarios</a>
            <a href="#contacto" className="text-sm text-slate-300 hover:text-red-500">Contacto</a>
          </div>
          <a href="#contacto" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500">Contáctanos</a>
        </nav>
      </header>

      <main id="home">
        <section className="relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&w=1600&q=80" alt="Moto deportiva de alto rendimiento" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/30" />
          <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-8 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-red-500">Agencia premium de motos</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">Potencia, diseño y tecnología sobre dos ruedas.</h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">Descubre motocicletas deportivas, urbanas y touring con asesoría experta, financiamiento y servicio especializado.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#catalogo" className="rounded-full bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500">Ver catálogo</a>
                <a href="#contacto" className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-red-500 hover:text-red-500">Contáctanos</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3 text-red-500">
                <Bike size={24} />
                <span className="font-semibold uppercase tracking-[0.25em]">Especialistas en rendimiento</span>
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-200">
                <li className="flex items-center gap-3"><Gauge className="text-red-500" /> Asesoría experta para elegir el modelo ideal</li>
                <li className="flex items-center gap-3"><Shield className="text-red-500" /> Garantía y mantenimiento profesional</li>
                <li className="flex items-center gap-3"><CalendarClock className="text-red-500" /> Pruebas de manejo programadas</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
                <p className="text-sm uppercase tracking-[0.35em] text-red-500">Sobre nosotros</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Más de 15 años llevando emoción y confianza a los riders.</h2>
                <p className="mt-4 text-slate-300">MotoXtreme combina tecnología, servicio humano y un catálogo exclusivo para que cada cliente encuentre la motocicleta adecuada para su estilo y necesidades.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-800/80 p-4">
                    <h3 className="font-semibold">Misión</h3>
                    <p className="mt-2 text-sm text-slate-300">Ofrecer experiencias de compra y conducción premium, seguras y memorables.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-800/80 p-4">
                    <h3 className="font-semibold">Visión</h3>
                    <p className="mt-2 text-sm text-slate-300">Ser la agencia de referencia en innovación, servicio y pasión por las motos.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl border border-white/10">
                <img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80" alt="Motocicleta deportiva en showroom" className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-red-500">Catálogo</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">Modelos destacados</h2>
              </div>
              <p className="max-w-xl text-slate-300">Explora nuestras opciones de motos deportivas, urbanas, touring y doble propósito.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {bikes.map((bike, index) => (
                <motion.article key={bike.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                  <img src={bike.image} alt={bike.name} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-red-500">{bike.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{bike.name}</h3>
                    <p className="mt-3 text-sm text-slate-300">{bike.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xl font-semibold">{bike.price}</span>
                      <a href="#contacto" className="font-semibold text-red-500">Solicitar info</a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="promociones" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red-500">Promociones</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Beneficios para tu compra</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {promotions.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-800/70 p-6">
                    <Icon size={28} className="text-red-500" />
                    <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red-500">Marcas</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Trabajamos con las mejores marcas</h2>
            </div>
            <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 sm:grid-cols-3 lg:grid-cols-6">
              {brands.map((brand) => <div key={brand} className="rounded-2xl bg-slate-800/70 p-4 text-center font-semibold uppercase tracking-[0.25em]">{brand}</div>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red-500">Galería</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Momentos que inspiran</h2>
            </div>
            <Swiper modules={[Navigation, Pagination, Autoplay]} spaceBetween={20} slidesPerView={1} navigation pagination={{ clickable: true }} autoplay={{ delay: 3000 }} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
              {["https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1558980664-2506fca6bfc2?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80"].map((image, index) => (
                <SwiperSlide key={index}><img src={image} alt={`Moto deportiva ${index + 1}`} className="h-72 w-full rounded-3xl object-cover" /></SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red-500">Testimonios</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Lo que dicen nuestros clientes</h2>
            </div>
            <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1} autoplay={{ delay: 4000 }} breakpoints={{ 768: { slidesPerView: 2 } }}>
              {testimonials.map((item) => (
                <SwiperSlide key={item.name}>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
                    <div className="mt-4 flex gap-1 text-yellow-400">{Array.from({ length: item.stars }).map((_, i) => <Star key={i} size={16} />)}</div>
                    <p className="mt-4 text-slate-300">“{item.comment}”</p>
                    <p className="mt-4 font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section id="horarios" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-red-500">Horarios</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">Estamos para atenderte</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-800 text-slate-200">
                  <tr><th className="p-3">Día</th><th className="p-3">Horario</th></tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10"><td className="p-3">Lunes</td><td className="p-3">9:00 - 18:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Martes</td><td className="p-3">9:00 - 18:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Miércoles</td><td className="p-3">9:00 - 18:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Jueves</td><td className="p-3">9:00 - 18:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Viernes</td><td className="p-3">9:00 - 19:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Sábado</td><td className="p-3">9:00 - 17:00</td></tr>
                  <tr className="border-t border-white/10"><td className="p-3">Domingo</td><td className="p-3">Cerrado</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="contacto" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-slate-900/70 p-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-red-500">Contacto</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Hablemos de tu próxima moto</h2>
                <p className="mt-4 text-slate-300">Completa el formulario y recibirás respuesta de nuestro equipo en pocos minutos.</p>
                <div className="mt-6 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2"><Phone size={16} className="text-red-500" /> +52 555 123 4567</div>
                  <div className="flex items-center gap-2"><Mail size={16} className="text-red-500" /> info@motoxtreme.com</div>
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> Guadalajara, Jalisco</div>
                </div>
                <div className="mt-6 flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 hover:border-red-500"><Facebook size={18} /></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 hover:border-red-500"><Instagram size={18} /></a>
                  <a href="https://wa.me/525551234567" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 hover:border-red-500"><MessageCircle size={18} /></a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-slate-800/70 p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">Nombre<input name="name" value={formData.name} onChange={handleChange} required className="rounded-xl border border-white/10 bg-slate-900/80 p-3" placeholder="Tu nombre" /></label>
                  <label className="grid gap-2 text-sm">Correo<input type="email" name="email" value={formData.email} onChange={handleChange} required className="rounded-xl border border-white/10 bg-slate-900/80 p-3" placeholder="tu@correo.com" /></label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">Teléfono<input name="phone" value={formData.phone} onChange={handleChange} className="rounded-xl border border-white/10 bg-slate-900/80 p-3" placeholder="Tu teléfono" /></label>
                  <label className="grid gap-2 text-sm">Asunto<input name="subject" value={formData.subject} onChange={handleChange} className="rounded-xl border border-white/10 bg-slate-900/80 p-3" placeholder="¿Qué necesitas?" /></label>
                </div>
                <label className="grid gap-2 text-sm">Mensaje<textarea name="message" rows="5" value={formData.message} onChange={handleChange} required className="rounded-xl border border-white/10 bg-slate-900/80 p-3" placeholder="Cuéntanos qué estás buscando" /></label>
                {status.message ? <p className={`text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{status.message}</p> : null}
                <button type="submit" disabled={isSubmitting} className="w-fit rounded-full bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">MotoXtreme</h3>
            <p className="mt-3 text-sm text-slate-400">Tu agencia premium para descubrir motos deportivas, touring y urbanas con asesoría personalizada.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Enlaces</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#catalogo" className="hover:text-red-500">Catálogo</a></li>
              <li><a href="#promociones" className="hover:text-red-500">Promociones</a></li>
              <li><a href="#horarios" className="hover:text-red-500">Horarios</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Horario</h3>
            <p className="mt-3 text-sm text-slate-400">Lunes a viernes: 9:00 - 19:00</p>
            <p className="text-sm text-slate-400">Sábados: 9:00 - 17:00</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
