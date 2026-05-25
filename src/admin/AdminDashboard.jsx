import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAdminProjects } from '../hooks/useProjects'
import { useAdminCertifications } from '../hooks/useCertifications'
import ProjectForm from './ProjectForm'
import CertificationForm from './CertificationForm'
import SkillsManager from './SkillsManager'
import {
  Plus, LogOut, Pencil, Trash2, Star, Loader2,
  Zap, LayoutGrid, AlertTriangle, RefreshCw, Award,
  FolderOpen, Cpu,
} from 'lucide-react'

const CATEGORY_COLORS = {
  'PCB Design':            '#7c3aed',
  'Embedded Systems':      '#c0392b',
  'Industrial Automation': '#e8a020',
  'Hardware':              '#10b981',
  'Software':              '#f43f5e',
}

// ── Reusable delete confirm modal ────────────────────────────────
function DeleteConfirmModal({ item, label, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="card w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle size={18} className="text-red-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-text">Delete {label}?</h3>
            <p className="font-mono text-xs text-slate-muted/60">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-slate-muted font-body mb-6">
          Are you sure you want to delete{' '}
          <strong className="text-slate-text">"{item.title}"</strong>?
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 justify-center py-2 px-4 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-md text-sm font-semibold transition-all flex items-center gap-2"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Projects tab ─────────────────────────────────────────────────
function ProjectsTab({ showToast }) {
  const { projects, loading, createProject, updateProject, deleteProject, refetch } = useAdminProjects()
  const [formOpen, setFormOpen]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving]         = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editTarget) {
        await updateProject(editTarget.id, data)
        showToast('Project updated.')
      } else {
        await createProject(data)
        showToast('Project added!')
      }
      setFormOpen(false)
      setEditTarget(null)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProject(id)
      setDeleteConfirm(null)
      showToast('Project deleted.')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <>
      {/* Tab header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-text mb-1">Projects</h2>
          <p className="font-mono text-xs text-slate-muted/60">
            {projects.length} project{projects.length !== 1 ? 's' : ''} in database
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refetch} className="btn-secondary p-2" title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button onClick={() => { setEditTarget(null); setFormOpen(true) }} className="btn-primary">
            <Plus size={15} /> Add Project
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={28} className="text-crimson-bright animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center mx-auto mb-4">
            <Plus size={22} className="text-crimson-bright" />
          </div>
          <h3 className="font-display font-bold text-slate-text mb-2">No projects yet</h3>
          <p className="font-body text-sm text-slate-muted mb-6">
            Click "Add Project" to create your first entry.
          </p>
          <button onClick={() => setFormOpen(true)} className="btn-primary mx-auto">
            <Plus size={15} /> Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const catColor = CATEGORY_COLORS[project.category] || '#6b7f96'
            return (
              <div key={project.id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ background: catColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-semibold text-slate-text truncate">{project.title}</h3>
                    {project.featured && <Star size={12} style={{ color: '#ffb300', fill: '#ffb300' }} />}
                    <span className="px-2 py-0.5 rounded text-xs font-mono flex-shrink-0"
                      style={{ background: `${catColor}15`, border: `1px solid ${catColor}30`, color: catColor }}>
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-muted truncate font-body">{project.description}</p>
                  {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech_stack.slice(0, 4).map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="tech-tag text-slate-muted/60">+{project.tech_stack.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { setEditTarget(project); setFormOpen(true) }}
                    className="btn-secondary py-1.5 px-3 text-xs">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => setDeleteConfirm(project)}
                    className="py-1.5 px-3 text-xs border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/5 rounded-md transition-all flex items-center gap-1.5">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {formOpen && (
        <ProjectForm
          project={editTarget}
          onSave={handleSave}
          onCancel={() => { setFormOpen(false); setEditTarget(null) }}
          loading={saving}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmModal
          item={deleteConfirm}
          label="Project"
          onConfirm={() => handleDelete(deleteConfirm.id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </>
  )
}

// ── Certifications tab ───────────────────────────────────────────
function CertificationsTab({ showToast }) {
  const {
    certifications, loading,
    createCertification, updateCertification, deleteCertification, refetch,
  } = useAdminCertifications()

  const [formOpen, setFormOpen]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving]         = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editTarget) {
        await updateCertification(editTarget.id, data)
        showToast('Certification updated.')
      } else {
        await createCertification(data)
        showToast('Certification added!')
      }
      setFormOpen(false)
      setEditTarget(null)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteCertification(id)
      setDeleteConfirm(null)
      showToast('Certification deleted.')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <>
      {/* Tab header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-text mb-1">Certifications</h2>
          <p className="font-mono text-xs text-slate-muted/60">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} in database
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refetch} className="btn-secondary p-2" title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button onClick={() => { setEditTarget(null); setFormOpen(true) }} className="btn-primary">
            <Plus size={15} /> Add Certification
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={28} className="text-crimson-bright animate-spin" />
        </div>
      ) : certifications.length === 0 ? (
        <div className="card p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-crimson/10 border border-crimson/20 flex items-center justify-center mx-auto mb-4">
            <Award size={22} className="text-crimson-bright" />
          </div>
          <h3 className="font-display font-bold text-slate-text mb-2">No certifications yet</h3>
          <p className="font-body text-sm text-slate-muted mb-6">
            Click "Add Certification" to add your first one.
          </p>
          <button onClick={() => setFormOpen(true)} className="btn-primary mx-auto">
            <Plus size={15} /> Add First Certification
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="card p-4 relative overflow-hidden group">
              {/* Color top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: cert.color }} />

              <div className="flex items-start justify-between gap-2 mb-3">
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
                  <Award size={15} style={{ color: cert.color }} />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditTarget(cert); setFormOpen(true) }}
                    className="w-7 h-7 rounded-md flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all"
                  >
                    <Pencil size={12} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cert)}
                    className="w-7 h-7 rounded-md flex items-center justify-center border border-red-500/20 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <h3 className="font-display font-semibold text-sm text-slate-text leading-snug mb-1">
                {cert.title}
              </h3>
              <p className="font-mono text-xs text-slate-muted/70 mb-1">{cert.issuer}</p>
              <p className="font-mono text-xs" style={{ color: cert.color }}>{cert.year}</p>

              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-slate-muted/50 hover:text-slate-muted transition-colors"
                >
                  ↗ Credential
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {formOpen && (
        <CertificationForm
          certification={editTarget}
          onSave={handleSave}
          onCancel={() => { setFormOpen(false); setEditTarget(null) }}
          loading={saving}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirmModal
          item={deleteConfirm}
          label="Certification"
          onConfirm={() => handleDelete(deleteConfirm.id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('projects')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin', { replace: true })
  }

  const TABS = [
    { id: 'projects',       label: 'Projects',       icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'skills',         label: 'Skills',          icon: Cpu },
  ]

  return (
    <div className="min-h-screen bg-ink-900">

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-ink-800/90 backdrop-blur border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md border border-crimson/40 bg-crimson/10 flex items-center justify-center">
              <Zap size={13} className="text-crimson-bright" />
            </div>
            <span className="font-display font-bold text-sm text-slate-text">Portfolio Admin</span>
            <span className="font-mono text-xs text-slate-muted/40 hidden sm:inline">· Content Manager</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-secondary py-1.5 px-3 text-xs">
              <LayoutGrid size={13} /> View Site
            </a>
            <button onClick={handleLogout} className="btn-secondary py-1.5 px-3 text-xs">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="border-b border-white/5 bg-ink-800/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-body font-medium transition-all relative"
                style={{
                  color: activeTab === id ? '#e8e8e8' : '#7a7a7a',
                }}
              >
                <Icon size={14} />
                {label}
                {/* Active indicator */}
                {activeTab === id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                    style={{ background: '#c0392b' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'projects'        && <ProjectsTab showToast={showToast} />}
        {activeTab === 'certifications'  && <CertificationsTab showToast={showToast} />}
        {activeTab === 'skills'          && <SkillsManager showToast={showToast} />}
      </main>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border text-sm font-body shadow-lg ${
            toast.type === 'error'
              ? 'bg-red-500/15 border-red-500/30 text-red-400'
              : 'bg-crimson/10 border-crimson/30 text-crimson-bright'
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  )
}
