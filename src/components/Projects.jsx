import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { useProjects } from '../hooks/useProjects'

export default function Projects() {
  const { projects, loading } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))]

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="section-padding bg-ink-800/20">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">
              Featured <span className="text-crimson-bright">Projects</span>
            </h2>
          </div>

          {/* Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all border ${
                    activeFilter === cat
                      ? 'bg-crimson/10 border-crimson/40 text-crimson-bright'
                      : 'bg-transparent border-white/10 text-slate-muted hover:border-white/20 hover:text-slate-text'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 size={28} className="text-crimson-bright animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-slate-muted/60 text-sm">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
