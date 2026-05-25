import React from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'
import { CategoryIllustration } from './CategoryIllustrations'

const CATEGORY_COLORS = {
  'PCB Design':            '#7c3aed',
  'Embedded Systems':      '#c0392b',
  'Industrial Automation': '#e8a020',
  'Hardware':              '#10b981',
  'Software':              '#f43f5e',
}

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    tech_stack = [],
    category,
    github_url,
    demo_url,
    image_url,
    featured,
  } = project

  const catColor = CATEGORY_COLORS[category] || '#6b7f96'

  return (
    <article className="card flex flex-col overflow-hidden group">

      {/* ── Illustration / Image banner ── */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '176px' }}>

        {image_url ? (
          /* User-uploaded image */
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* SVG category illustration */
          <div className="w-full h-full">
            <CategoryIllustration category={category} title={title} />
          </div>
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-mono font-medium z-10"
          style={{
            background: `${catColor}22`,
            border: `1px solid ${catColor}55`,
            color: catColor,
            backdropFilter: 'blur(4px)',
          }}
        >
          {category}
        </div>

        {/* Featured star */}
        {featured && (
          <div
            className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center z-10"
            style={{
              background: 'rgba(255,179,0,0.15)',
              border: '1px solid rgba(255,179,0,0.35)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <Star size={12} style={{ color: '#ffb300', fill: '#ffb300' }} />
          </div>
        )}

        {/* Bottom gradient fade into card body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #161616, transparent)' }}
        />
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-display font-bold mb-2 leading-snug transition-colors"
          style={{ color: '#e8e8e8' }}
          onMouseEnter={e => e.currentTarget.style.color = catColor}
          onMouseLeave={e => e.currentTarget.style.color = '#e8e8e8'}
        >
          {title}
        </h3>

        <p className="text-sm leading-relaxed mb-4 flex-1 font-body" style={{ color: '#7a7a7a' }}>
          {description}
        </p>

        {/* Tech stack tags */}
        {tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech_stack.slice(0, 5).map((t) => (
              <span key={t} className="tech-tag text-xs">{t}</span>
            ))}
            {tech_stack.length > 5 && (
              <span className="tech-tag text-xs" style={{ color: '#7a7a7a' }}>
                +{tech_stack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {github_url && github_url !== '#' && (
            <a
              href={github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body transition-colors"
              style={{ color: '#7a7a7a' }}
              onMouseEnter={e => e.currentTarget.style.color = '#e8e8e8'}
              onMouseLeave={e => e.currentTarget.style.color = '#7a7a7a'}
            >
              <Github size={13} />
              GitHub
            </a>
          )}
          {demo_url && (
            <a
              href={demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body transition-colors"
              style={{ color: `${catColor}99` }}
              onMouseEnter={e => e.currentTarget.style.color = catColor}
              onMouseLeave={e => e.currentTarget.style.color = `${catColor}99`}
            >
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {(!github_url || github_url === '#') && !demo_url && (
            <span className="text-xs font-mono italic" style={{ color: 'rgba(122,122,122,0.4)' }}>
              Private / In Progress
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
