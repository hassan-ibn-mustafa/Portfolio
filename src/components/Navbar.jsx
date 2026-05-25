import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-900/92 backdrop-blur-md border-b border-white/5 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo image */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center"
        >
          <img
            src="public\logo.png"
            alt="Hassan The Controlman"
            className="w-32 h-auto scale-150 origin-left"
            style={{ mixBlendMode: 'lighten' }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm font-body font-medium text-slate-muted hover:text-slate-text transition-colors rounded-md hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/#/admin"
            className="ml-4 px-4 py-2 text-xs font-mono border border-crimson/20 text-crimson-400 rounded-md hover:border-crimson/40 hover:text-crimson-bright transition-all"
            style={{ color: 'rgba(192,57,43,0.6)' }}
          >
            admin
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-muted hover:text-slate-text transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ink-800 border-t border-white/5">
          <div className="section-container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-body text-slate-muted hover:text-slate-text hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
