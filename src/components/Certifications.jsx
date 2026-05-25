import React from 'react'
import { Award, ExternalLink, Loader2 } from 'lucide-react'
import { useCertifications } from '../hooks/useCertifications'

export default function Certifications() {
  const { certifications, loading } = useCertifications()

  return (
    <section id="certifications" className="section-padding">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-label">Qualifications</div>
          <h2 className="section-title">
            Certifications &amp; <span style={{ color: '#e84040' }}>Training</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin" style={{ color: '#c0392b' }} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id || cert.title}
                className="card p-5 relative overflow-hidden group"
              >
                {/* Color top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: cert.color }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  <Award size={16} style={{ color: cert.color }} />
                </div>

                <h3 className="font-display font-semibold text-sm leading-snug mb-1.5"
                  style={{ color: '#e8e8e8' }}>
                  {cert.title}
                </h3>
                <p className="font-mono text-xs mb-1" style={{ color: 'rgba(122,122,122,0.7)' }}>
                  {cert.issuer}
                </p>
                <p className="font-mono text-xs" style={{ color: cert.color }}>
                  {cert.year}
                </p>

                {/* Credential link */}
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-mono transition-colors"
                    style={{ color: `${cert.color}70` }}
                    onMouseEnter={e => e.currentTarget.style.color = cert.color}
                    onMouseLeave={e => e.currentTarget.style.color = `${cert.color}70`}
                  >
                    <ExternalLink size={11} />
                    View Credential
                  </a>
                )}

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${cert.color}08 0%, transparent 70%)`,
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
