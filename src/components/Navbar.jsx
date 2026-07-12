import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { user, logout }        = useAuth()
  const { theme, toggleTheme }  = useTheme()
  const navigate                = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(11,10,8,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl tracking-widest" style={{ color: 'var(--gold)' }}>
          APEX<span className="text-white/60 text-sm ml-1">STUDIO</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm tracking-wider transition-colors hover:text-[var(--gold)] ${isActive ? 'text-[var(--gold)]' : 'text-[var(--text-dim)]'}`
              }
            >{l.label}</NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'var(--bg3)', border: '1px solid var(--glass-border)', color: 'var(--gold)' }}
            title={`Switch to ${theme === 'dark' ? 'night' : 'dark'} theme`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <>
              <Link to="/dashboard"
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ background: 'var(--bg3)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
              >Dashboard</Link>
              <button onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-dim)' }}
              >Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: 'var(--text-dim)' }}
              >Login</Link>
              <Link to="/start-project" className="btn-gold text-sm px-5 py-2">
                Start Project
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(!open)}>
          <span className={`block w-6 h-0.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
          <span className={`block w-6 h-0.5 transition-all ${open ? 'opacity-0' : ''}`} style={{ background: 'var(--gold)' }} />
          <span className={`block w-6 h-0.5 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: 'rgba(11,10,8,.96)' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm tracking-wider py-2 border-b transition-colors ${isActive ? 'text-[var(--gold)]' : 'text-[var(--text-dim)]'}`
              }
              style={{ borderColor: 'var(--glass-border)' }}
            >{l.label}</NavLink>
          ))}
          <Link to="/start-project" onClick={() => setOpen(false)} className="btn-gold text-center mt-2">Start Project</Link>
        </div>
      )}
    </nav>
  )
}
