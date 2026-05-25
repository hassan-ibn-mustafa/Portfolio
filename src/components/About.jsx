import React from 'react'
import { GraduationCap, MapPin, Users, BookOpen } from 'lucide-react'
import { PERSONAL } from '../data/staticData'

const STATS = [
  { value: '5+', label: 'Engineering Projects' },
  { value: '3', label: 'PCB Designs' },
  { value: '2+', label: 'Years Experience' },
  { value: '8+', label: 'Certifications' },
]

export default function About() {
  return (
    <section id="about" className="section-padding bg-ink-800/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — visual panel */}
          <div className="relative">
            {/* Main box */}
            <div className="relative rounded-2xl overflow-hidden border border-crimson/10 bg-ink-800"
              style={{ aspectRatio: '4/3' }}>

              {/* Grid bg */}
              <div className="absolute inset-0 bg-circuit-grid bg-grid opacity-40" />

              {/* Decorative terminal block */}
              <div className="absolute inset-6 rounded-xl border border-crimson/10 bg-ink-900/70 backdrop-blur-sm p-6 flex flex-col justify-between">
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="font-mono text-xs text-slate-muted/60 ml-2">~/about.json</span>
                  </div>

                  {/* Added overflow-x-auto here for mobile scrolling */}
                  <div className="overflow-x-auto pb-2">
                    <pre className="font-mono text-[10px] sm:text-xs text-slate-muted leading-relaxed whitespace-pre">
{`{
  "name": "${PERSONAL.name}",
  "role": "Industrial Automation
           Engineer",
  "location": "${PERSONAL.location}",
  "focus": [
    "Embedded Systems",
    "PCB Design",
    "PLC Programming",
    "Motor Drives"
  ],
  "status": "open_to_internship"
}`}
                    </pre>
                  </div>
                </div>

                {/* Blinking cursor */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-xs text-crimson-bright/60">$</span>
                  <div className="w-2 h-4 bg-crimson/60 animate-pulse" />
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-30">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 80 0 L 80 80 L 0 0 Z" fill="rgba(192,57,43,0.1)" />
                  <line x1="80" y1="0" x2="0" y2="0" stroke="#c0392b" strokeWidth="1" />
                  <line x1="80" y1="0" x2="80" y2="80" stroke="#c0392b" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Stats row - Changed to 2 columns on mobile, 4 on medium screens */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="card p-3 text-center"
                >
                  <div className="font-display font-black text-xl text-crimson-bright mb-0.5">{s.value}</div>
                  <div className="font-mono text-xs text-slate-muted leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — text */}
          <div>
            <div className="section-label">About Me</div>
            <h2 className="section-title mb-6">
              Engineering at the intersection of{' '}
              <span className="text-crimson-bright">hardware</span> and{' '}
              <span style={{ color: '#ffb300' }}>intelligence</span>
            </h2>

            <p className="text-slate-muted leading-relaxed mb-6 font-body">
              {PERSONAL.bio}
            </p>

            {/* Details list */}
            <div className="space-y-3">
              {[
                { icon: GraduationCap, text: PERSONAL.education },
                { icon: MapPin, text: PERSONAL.location },
                { icon: Users, text: 'Member, Faculty Student Union' },
                { icon: BookOpen, text: 'Active component library contributor — KiCad' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-7 h-7 rounded-md bg-crimson/10 border border-crimson/20 flex-shrink-0 flex items-center justify-center">
                    <Icon size={13} className="text-crimson-bright" />
                  </div>
                  <p className="text-sm text-slate-muted font-body">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}