import React from 'react'
import { PERSONAL } from '../data/staticData'
import myLogo from '../logo.png'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-8" style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0e0e0e' }}>
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={myLogo}
            alt="Hassan The Controlman"
            className="w-32 h-auto scale-150 origin-left"
            style={{ mixBlendMode: 'lighten' }}
          />
        </a>

        <p className="font-mono text-xs text-center" style={{ color: 'rgba(122,122,122,0.5)' }}>
          © {year} Hassan · The Controlman · Built with React + Supabase
        </p>

        <a
          href="#/admin"
          className="font-mono text-xs transition-colors"
          style={{ color: 'rgba(122,122,122,0.3)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(192,57,43,0.6)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(122,122,122,0.3)'}
        >
          admin panel
        </a>
      </div>
    </footer>
  )
}
