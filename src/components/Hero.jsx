import React, { useState, useEffect } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { PERSONAL } from '../data/staticData'

// Animated ECG waveform — matches the logo motif
function EcgLine() {
  return (
    <svg
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-sm opacity-60"
      aria-hidden="true"
    >
      <polyline
        className="ecg-path"
        points="0,40 40,40 55,40 65,10 75,70 85,40 110,40 120,40 135,40 150,40 165,40 180,40 200,40 220,40 240,40 260,40 280,40 300,40 320,40 340,40 360,40 380,40 400,40"
        stroke="#c0392b"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Blinking dot at the end */}
      <circle cx="400" cy="40" r="3" fill="#e84040">
        <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

// Gear + ECG hero illustration (SVG recreation of logo motif)
function HeroIllustration() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto animate-[float_6s_ease-in-out_infinite]">
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full border-2 opacity-10"
        style={{ borderColor: '#c0392b' }}
      />
      <div
        className="absolute inset-4 rounded-full border opacity-20"
        style={{ borderColor: '#c0392b', borderStyle: 'dashed' }}
      />

      {/* Center box */}
      <div
        className="absolute inset-12 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(192,57,43,0.08)',
          border: '1px solid rgba(192,57,43,0.25)',
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Hassan The Controlman"
          className="w-64 h-64 object-contain rounded-xl"
          style={{ mixBlendMode: 'lighten' }} 
        />
      </div>

      {/* Orbiting dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#c0392b' : 'rgba(192,57,43,0.4)',
            top: `${50 - 47 * Math.cos((deg * Math.PI) / 180)}%`,
            left: `${50 + 47 * Math.sin((deg * Math.PI) / 180)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

// Typewriter cycling through taglines
function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const current = words[wordIndex]
    let timeout
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => { setText(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, 60)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setText(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 35)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex(w => (w + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words])

  return (
    <span className="font-mono text-lg md:text-xl" style={{ color: '#e84040' }}>
      {text}<span className="animate-pulse" style={{ color: 'rgba(192,57,43,0.8)' }}>|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-circuit-grid"
      style={{ backgroundSize: '40px 40px' }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-[130px]"
          style={{ width: 700, height: 700, top: '-15%', left: '-10%',
            background: 'rgba(192,57,43,0.07)', animation: 'orb-pulse 9s ease-in-out infinite' }} />
        <div className="absolute rounded-full blur-[100px]"
          style={{ width: 400, height: 400, bottom: '5%', right: '0%',
            background: 'rgba(192,57,43,0.05)', animation: 'orb-pulse 11s ease-in-out infinite 3s' }} />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            {/* Status badge */}
            <div className="animate-fade-in-up delay-100 flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c0392b' }} />
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'rgba(192,57,43,0.5)', animationDelay: '200ms' }} />
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'rgba(192,57,43,0.2)', animationDelay: '400ms' }} />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#7a7a7a' }}>
                Control Systems Online
              </span>
            </div>

            {/* Name */}
            <h1
              className="animate-fade-in-up delay-200 font-display font-black leading-none mb-1"
              style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', color: '#e8e8e8' }}
            >
              HASSAN
              <span style={{ color: '#c0392b' }}>.</span>
            </h1>

            {/* Brand tagline */}
            <p
              className="animate-fade-in-up delay-300 font-display font-bold tracking-widest uppercase mb-4"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#c0392b', letterSpacing: '0.3em' }}
            >
              THE CONTROLMAN
            </p>

            {/* Role */}
            <p className="animate-fade-in-up delay-300 font-display font-medium mb-4"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#7a7a7a' }}>
              {PERSONAL.role}
            </p>

            {/* Typewriter */}
            <div className="animate-fade-in-up delay-400 h-8 mb-6 flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: '#7a7a7a' }}>~/specialization</span>
              <span className="font-mono text-xs" style={{ color: '#555' }}>›</span>
              <Typewriter words={PERSONAL.taglines} />
            </div>

            {/* ECG line */}
            <div className="animate-fade-in-up delay-500 mb-8">
              <EcgLine />
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up delay-500 flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Projects
              </button>
              <a href={PERSONAL.cvUrl} className="btn-secondary" download>
                <Download size={15} />
                Download CV
              </a>
            </div>

            {/* Socials */}
            <div className="animate-fade-in-up delay-600 flex items-center gap-4">
              <span className="font-mono text-xs" style={{ color: 'rgba(122,122,122,0.5)' }}>Connect</span>
              <div className="w-8 h-px" style={{ background: 'rgba(122,122,122,0.2)' }} />
              {[
                { href: PERSONAL.github, icon: Github, label: 'GitHub' },
                { href: PERSONAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#7a7a7a' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#e84040'
                    e.currentTarget.style.borderColor = 'rgba(192,57,43,0.4)'
                    e.currentTarget.style.background = 'rgba(192,57,43,0.05)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#7a7a7a'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="hidden lg:flex justify-center">
            <HeroIllustration />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: 'rgba(122,122,122,0.4)' }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={16} />
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0e0e0e, transparent)' }} />
    </section>
  )
}
