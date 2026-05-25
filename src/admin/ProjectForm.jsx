import React, { useState, useEffect } from 'react'
import { X, Plus, Trash2, Save } from 'lucide-react'

const EMPTY = {
  title: '',
  description: '',
  long_description: '',
  tech_stack: [],
  category: 'Embedded Systems',
  image_url: '',
  github_url: '',
  demo_url: '',
  featured: false,
}

const CATEGORIES = [
  'Embedded Systems',
  'PCB Design',
  'Industrial Automation',
  'Hardware',
  'Software',
  'Other',
]

export default function ProjectForm({ project, onSave, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (project) {
      setForm({
        ...EMPTY,
        ...project,
        tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack : [],
      })
    } else {
      setForm(EMPTY)
    }
    setTagInput('')
  }, [project])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tech_stack.includes(t)) {
      set('tech_stack', [...form.tech_stack, t])
    }
    setTagInput('')
  }

  const removeTag = (tag) => set('tech_stack', form.tech_stack.filter((t) => t !== tag))

  const handleTagKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto card">
        {/* Header */}
        <div className="sticky top-0 bg-ink-800 border-b border-white/5 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-slate-text">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              placeholder="ESP32 Industrial PLC Board"
            />
          </div>

          {/* Category + Featured row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Category</label>
              <select
                className="admin-input"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    form.featured ? 'bg-crimson/30 border-crimson/50' : 'bg-ink-700'
                  } border`}
                  onClick={() => set('featured', !form.featured)}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      form.featured ? 'left-5 bg-crimson' : 'left-0.5 bg-slate-muted/40'
                    }`}
                  />
                </div>
                <span className="font-mono text-xs text-slate-muted/80">Featured project</span>
              </label>
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Short Description <span className="text-red-400">*</span>
            </label>
            <textarea
              className="admin-input resize-none"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              required
              rows={3}
              placeholder="A concise summary shown on the project card…"
            />
          </div>

          {/* Long description */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Long Description (optional)</label>
            <textarea
              className="admin-input resize-none"
              value={form.long_description}
              onChange={(e) => set('long_description', e.target.value)}
              rows={4}
              placeholder="Detailed project write-up, challenges, results…"
            />
          </div>

          {/* Tech stack tags */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Tech Stack</label>
            {form.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tech_stack.map((t) => (
                  <span
                    key={t}
                    className="tech-tag flex items-center gap-1 cursor-pointer hover:border-red-500/40 hover:text-red-400 transition-colors"
                    onClick={() => removeTag(t)}
                  >
                    {t}
                    <Trash2 size={10} />
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className="admin-input flex-1"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
                placeholder="Type tag and press Enter (e.g. ESP32)"
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-secondary px-3 py-2 text-xs"
              >
                <Plus size={14} />
              </button>
            </div>
            <p className="font-mono text-xs text-slate-muted/40 mt-1">Press Enter or comma to add a tag. Click a tag to remove it.</p>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Image URL</label>
              <input
                className="admin-input"
                value={form.image_url}
                onChange={(e) => set('image_url', e.target.value)}
                placeholder="https://i.imgur.com/…"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">GitHub URL</label>
              <input
                className="admin-input"
                value={form.github_url}
                onChange={(e) => set('github_url', e.target.value)}
                placeholder="https://github.com/…"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Demo / Live URL</label>
              <input
                className="admin-input"
                value={form.demo_url}
                onChange={(e) => set('demo_url', e.target.value)}
                placeholder="https://…"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-crimson/30 border-t-electric rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                <>
                  <Save size={15} />
                  {project ? 'Save Changes' : 'Create Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
