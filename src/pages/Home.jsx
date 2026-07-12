import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '5K+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Expert Editors' },
  { value: '24h', label: 'Rush Delivery' },
]

const services = [
  { icon: '📸', title: 'Photo Editing', desc: 'Cinematic retouching, compositing & color mastery', link: '/services/photo-editing' },
  { icon: '🎬', title: 'Video Editing', desc: 'Feature-quality cuts, motion graphics & sound design', link: '/services/video-editing' },
  { icon: '🎨', title: 'Color Grading', desc: 'Hollywood-grade LUT application & grade sessions', link: '/services' },
  { icon: '✨', title: 'Retouching', desc: 'Flawless skin, beauty & high-end fashion retouching', link: '/services' },
]

export default function Home() {
  const heroRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: .2 })
      gsap.fromTo('.hero-sub',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: .6 })
      gsap.fromTo('.hero-btns',  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: .9 })

      gsap.fromTo('.stat-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out',
          scrollTrigger: { trigger: '.stats-row', start: 'top 80%' }
        }
      )

      gsap.fromTo('.svc-card',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .8, stagger: .15, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%' }
        }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,168,78,.08) 0%, transparent 70%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(200,168,78,.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-32">
          <p className="hero-sub text-xs font-semibold tracking-[.4em] uppercase mb-6" style={{ color: 'var(--gold)' }}>
            Premium Photo & Video Editing
          </p>
          <h1 className="hero-title font-display text-5xl md:text-7xl font-black leading-none mb-6">
            Where Vision<br />
            <span style={{ color: 'var(--gold)', textShadow: '0 0 60px rgba(200,168,78,.5)' }}>Becomes Art</span>
          </h1>
          <p className="hero-sub text-lg md:text-xl mb-10 leading-relaxed" style={{ color: 'var(--text-dim)', maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            Cinematic-quality editing that elevates brands, creators, and storytellers worldwide.
          </p>
          <div className="hero-btns flex flex-wrap gap-4 justify-center">
            <Link to="/start-project" className="btn-gold px-8 py-3 text-base">Start Your Project</Link>
            <Link to="/portfolio" className="btn-outline px-8 py-3 text-base">View Portfolio</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>SCROLL</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 stats-row" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="stat-item text-center">
              <p className="font-display text-4xl font-black mb-1" style={{ color: 'var(--gold)' }}>{s.value}</p>
              <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[.4em] uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>What We Do</p>
          <h2 className="font-display text-4xl font-black text-center mb-16">Our Expertise</h2>
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <Link key={s.title} to={s.link}
                className="svc-card glass-card p-8 group transition-all hover:border-[var(--gold)] hover:-translate-y-1">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--gold)] transition-colors">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: 'var(--bg2)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
            Ready to Create<br /><span style={{ color: 'var(--gold)' }}>Something Iconic?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'var(--text-dim)' }}>
            Tell us your vision. We'll handle everything else.
          </p>
          <Link to="/start-project" className="btn-gold px-10 py-4 text-base">Start Your Project →</Link>
        </div>
      </section>
    </div>
  )
}
