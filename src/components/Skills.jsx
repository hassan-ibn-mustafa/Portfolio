import React from 'react'
import { Cpu, Layers, Settings, Code2, Loader2 } from 'lucide-react'
import { useSkills } from '../hooks/useSkills'

const ICON_MAP = { cpu: Cpu, layers: Layers, settings: Settings, code: Code2 }

function CategoryCard({ cat }) {
  const Icon = ICON_MAP[cat.icon] || Cpu
  const color = cat.color || '#c0392b'
  const items = cat.items || []

  return (
    <div
      className="card overflow-hidden transition-all duration-300"
      style={{ padding: 0 }}
    >
      {/* Colored top accent bar */}
      <div style={{ height: '3px', background: color }} />

      <div style={{ padding: '18px 20px 20px' }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: `${color}12`,
              border: `0.5px solid ${color}30`,
            }}
          >
            <Icon size={17} style={{ color }} />
          </div>
          <span className="font-display font-semibold text-sm" style={{ color: '#e8e8e8' }}>
            {cat.category}
          </span>
          <span
            className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.05)',
              color: '#7a7a7a',
            }}
          >
            {items.length}
          </span>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5">
          {items.map(skill => (
            <span
              key={skill.id || skill.name}
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                background: `${color}0d`,
                border: `0.5px solid ${color}35`,
                color: color,
              }}
            >
              {skill.name}
            </span>
          ))}
          {items.length === 0 && (
            <span className="font-mono text-xs" style={{ color: 'rgba(122,122,122,0.4)' }}>
              No skills added yet
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const { categories, tools, loading } = useSkills()

  return (
    <section id="skills" className="section-padding">
      <div className="section-container">

        {/* Header */}
        <div className="mb-12 max-w-xl">
          <div className="section-label">Technical Skills</div>
          <h2 className="section-title">
            Tools &amp; <span style={{ color: '#e84040' }}>Technologies</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin" style={{ color: '#c0392b' }} />
          </div>
        ) : (
          <>
            {/* Categories grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {categories.map(cat => (
                <CategoryCard key={cat.id || cat.category} cat={cat} />
              ))}
            </div>

            {/* Also familiar with */}
            {tools.length > 0 && (
              <div className="card p-5">
                <p
                  className="font-mono text-xs tracking-widest uppercase mb-3"
                  style={{ color: 'rgba(122,122,122,0.6)' }}
                >
                  Also familiar with
                </p>
                <div className="flex flex-wrap gap-2">
                  {tools.map(t => (
                    <span
                      key={t.id || t.name}
                      className="font-mono text-xs px-3 py-1 rounded-full"
                      style={{
                        border: '0.5px solid rgba(255,255,255,0.1)',
                        color: '#7a7a7a',
                      }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
