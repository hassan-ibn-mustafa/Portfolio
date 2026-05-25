import React, { useState, useEffect } from 'react'
import { X, Save } from 'lucide-react'

const COLORS = [
  { label: 'Crimson',  value: '#c0392b' },
  { label: 'Purple',   value: '#7c3aed' },
  { label: 'Emerald',  value: '#10b981' },
  { label: 'Amber',    value: '#e8a020' },
  { label: 'Rose',     value: '#f43f5e' },
  { label: 'Blue',     value: '#2563eb' },
  { label: 'Cyan',     value: '#06b6d4' },
  { label: 'Orange',   value: '#ea580c' },
]

const EMPTY = {
  title:  '',
  issuer: '',
  year:   new Date().getFullYear().toString(),
  color:  '#c0392b',
  credential_url: '',
}

export default function CertificationForm({ certification, onSave, onCancel, loading }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    setForm(certification ? { ...EMPTY, ...certification } : EMPTY)
  }, [certification])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md card">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="font-display font-bold text-slate-text">
            {certification ? 'Edit Certification' : 'Add Certification'}
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Title */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Certification Title <span className="text-red-400">*</span>
            </label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              placeholder="PCB Design with KiCad"
            />
          </div>

          {/* Issuer */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Issuer / Platform <span className="text-red-400">*</span>
            </label>
            <input
              className="admin-input"
              value={form.issuer}
              onChange={(e) => set('issuer', e.target.value)}
              required
              placeholder="Coursera / Udemy / University"
            />
          </div>

          {/* Year + Color row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
                Year <span className="text-red-400">*</span>
              </label>
              <input
                className="admin-input"
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                required
                placeholder="2024"
                maxLength={4}
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Card Color</label>
              {/* Color picker row */}
              <div className="flex flex-wrap gap-2 mt-1">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => set('color', c.value)}
                    className="w-7 h-7 rounded-md transition-all"
                    style={{
                      background: c.value,
                      outline: form.color === c.value ? `2px solid ${c.value}` : '2px solid transparent',
                      outlineOffset: '2px',
                      opacity: form.color === c.value ? 1 : 0.6,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Credential URL */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Credential URL <span className="text-slate-muted/40">(optional)</span>
            </label>
            <input
              className="admin-input"
              value={form.credential_url}
              onChange={(e) => set('credential_url', e.target.value)}
              placeholder="https://coursera.org/verify/..."
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-2">Preview</label>
            <div
              className="relative rounded-xl p-4 overflow-hidden"
              style={{ background: '#161616', border: `1px solid ${form.color}22` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: form.color }}
              />
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${form.color}15`, border: `1px solid ${form.color}30` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={form.color} strokeWidth="2">
                  <circle cx="12" cy="8" r="6"/><path d="M8 14H4l-2 7h20l-2-7h-4"/>
                </svg>
              </div>
              <p className="font-display font-semibold text-sm text-slate-text leading-snug mb-1">
                {form.title || 'Certification Title'}
              </p>
              <p className="font-mono text-xs text-slate-muted/70 mb-0.5">
                {form.issuer || 'Issuer'}
              </p>
              <p className="font-mono text-xs" style={{ color: form.color }}>
                {form.year || '2024'}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                <>
                  <Save size={15} />
                  {certification ? 'Save Changes' : 'Add Certification'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
