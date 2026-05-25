import React, { useState } from 'react'
import {
  Plus, Trash2, Pencil, Save, X, ChevronDown, ChevronUp,
  Loader2, RefreshCw, Cpu, Layers, Settings, Code2, Wrench,
} from 'lucide-react'
import { useAdminSkills } from '../hooks/useSkills'

const COLORS = [
  { label: 'Crimson',  value: '#c0392b' },
  { label: 'Red',      value: '#e84040' },
  { label: 'Purple',   value: '#7c3aed' },
  { label: 'Emerald',  value: '#10b981' },
  { label: 'Amber',    value: '#e8a020' },
  { label: 'Rose',     value: '#f43f5e' },
  { label: 'Blue',     value: '#2563eb' },
  { label: 'Dark Red', value: '#922b21' },
]

const ICON_OPTIONS = [
  { value: 'cpu',      label: 'CPU',      Icon: Cpu },
  { value: 'layers',   label: 'Layers',   Icon: Layers },
  { value: 'settings', label: 'Settings', Icon: Settings },
  { value: 'code',     label: 'Code',     Icon: Code2 },
]
const ICON_MAP = { cpu: Cpu, layers: Layers, settings: Settings, code: Code2 }

// ── Add/Edit Category modal ───────────────────────────────────────
function CategoryModal({ category, onSave, onCancel, saving }) {
  const [form, setForm] = useState({
    category: category?.category || '',
    icon:     category?.icon     || 'cpu',
    color:    category?.color    || '#c0392b',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const Icon = ICON_MAP[form.icon] || Cpu

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <h3 className="font-display font-bold text-slate-text">
            {category ? 'Edit Category' : 'New Category'}
          </h3>
          <button onClick={onCancel}
            className="w-7 h-7 rounded-md flex items-center justify-center text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all">
            <X size={14} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input className="admin-input" value={form.category}
              onChange={e => set('category', e.target.value)}
              placeholder="e.g. Embedded Systems" required />
          </div>

          {/* Icon */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Icon</label>
            <div className="flex gap-2">
              {ICON_OPTIONS.map(({ value, label, Icon: Ic }) => (
                <button key={value} type="button"
                  onClick={() => set('icon', value)}
                  className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg border transition-all text-xs font-mono"
                  style={{
                    background: form.icon === value ? `${form.color}15` : 'transparent',
                    borderColor: form.icon === value ? `${form.color}50` : 'rgba(255,255,255,0.08)',
                    color: form.icon === value ? form.color : '#7a7a7a',
                  }}>
                  <Ic size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Color</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(c => (
                <button key={c.value} type="button" title={c.label}
                  onClick={() => set('color', c.value)}
                  className="w-7 h-7 rounded-md transition-all"
                  style={{
                    background: c.value,
                    outline: form.color === c.value ? `2px solid ${c.value}` : '2px solid transparent',
                    outlineOffset: '2px',
                    opacity: form.color === c.value ? 1 : 0.5,
                  }} />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 p-3 rounded-lg"
            style={{ background: '#1e1e1e', border: `0.5px solid ${form.color}25` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${form.color}12`, border: `0.5px solid ${form.color}30` }}>
              <Icon size={16} style={{ color: form.color }} />
            </div>
            <div>
              <p className="font-display font-semibold text-sm" style={{ color: '#e8e8e8' }}>
                {form.category || 'Category Name'}
              </p>
              <p className="font-mono text-xs" style={{ color: form.color }}>
                {form.color}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button
              disabled={!form.category || saving}
              onClick={() => onSave(form)}
              className="btn-primary flex-1 justify-center disabled:opacity-50">
              {saving
                ? <><span className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" /> Saving…</>
                : <><Save size={14} /> {category ? 'Save' : 'Create'}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Skill row (inline edit — name only, no level) ─────────────────
function SkillRow({ skill, color, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [name, setName]       = useState(skill.name)
  const [saving, setSaving]   = useState(false)

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    await onUpdate(skill.id, { name })
    setSaving(false)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2 py-1">
        <input
          className="admin-input flex-1 text-sm py-1.5"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          autoFocus
        />
        <button onClick={() => { setEditing(false); setName(skill.name) }}
          className="w-7 h-7 rounded flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text transition-all flex-shrink-0">
          <X size={12} />
        </button>
        <button onClick={handleSave} disabled={saving}
          className="w-7 h-7 rounded flex items-center justify-center border text-xs flex-shrink-0 disabled:opacity-50 transition-all"
          style={{ borderColor: `${color}40`, color, background: `${color}10` }}>
          {saving
            ? <span className="w-3 h-3 border border-current rounded-full animate-spin opacity-50" />
            : <Save size={12} />}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group py-0.5">
      {/* Tag preview */}
      <span
        className="font-mono text-xs px-3 py-1 rounded-full flex-1"
        style={{
          background: `${color}0d`,
          border: `0.5px solid ${color}35`,
          color,
        }}
      >
        {skill.name}
      </span>
      {/* Hover actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button onClick={() => setEditing(true)}
          className="w-6 h-6 rounded flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all">
          <Pencil size={11} />
        </button>
        <button onClick={() => onDelete(skill.id)}
          className="w-6 h-6 rounded flex items-center justify-center border border-red-500/20 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <Trash2 size={11} />
        </button>
      </div>
    </div>
  )
}

// ── Category card (collapsible) ───────────────────────────────────
function CategoryCard({ cat, onEditCat, onDeleteCat, onAddSkill, onUpdateSkill, onDeleteSkill, showToast }) {
  const Icon = ICON_MAP[cat.icon] || Cpu
  const [expanded, setExpanded]       = useState(true)
  const [addingSkill, setAddingSkill] = useState(false)
  const [newName, setNewName]         = useState('')
  const [savingSkill, setSavingSkill] = useState(false)

  const handleAddSkill = async () => {
    if (!newName.trim()) return
    setSavingSkill(true)
    try {
      await onAddSkill(cat.id, { name: newName.trim(), level: 0 })
      setNewName('')
      setAddingSkill(false)
      showToast('Skill added.')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSavingSkill(false)
    }
  }

  return (
    <div className="card overflow-hidden">
      {/* Colored top bar */}
      <div style={{ height: '2px', background: cat.color }} />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5"
        style={{ borderBottom: expanded ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${cat.color}12`, border: `0.5px solid ${cat.color}30` }}>
          <Icon size={15} style={{ color: cat.color }} />
        </div>
        <span className="font-display font-semibold text-sm text-slate-text flex-1">
          {cat.category}
        </span>
        <span className="font-mono text-xs px-2 py-0.5 rounded-full mr-1"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#7a7a7a' }}>
          {cat.items?.length || 0}
        </span>
        <button onClick={() => onEditCat(cat)}
          className="w-7 h-7 rounded-md flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all">
          <Pencil size={12} />
        </button>
        <button onClick={() => onDeleteCat(cat)}
          className="w-7 h-7 rounded-md flex items-center justify-center border border-red-500/20 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <Trash2 size={12} />
        </button>
        <button onClick={() => setExpanded(e => !e)}
          className="w-7 h-7 rounded-md flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text hover:bg-white/5 transition-all">
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Skills list */}
      {expanded && (
        <div className="p-4 space-y-1.5">
          {cat.items?.length === 0 && !addingSkill && (
            <p className="text-xs font-mono text-center py-2" style={{ color: 'rgba(122,122,122,0.4)' }}>
              No skills yet — add one below
            </p>
          )}

          {cat.items?.map(skill => (
            <SkillRow
              key={skill.id}
              skill={skill}
              color={cat.color}
              onUpdate={(sid, updates) => onUpdateSkill(cat.id, sid, updates)}
              onDelete={(sid) => { onDeleteSkill(cat.id, sid); showToast('Skill removed.') }}
            />
          ))}

          {/* Add skill inline */}
          {addingSkill ? (
            <div className="flex items-center gap-2 pt-1">
              <input
                className="admin-input flex-1 text-sm py-1.5"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                placeholder="Skill name (e.g. KiCad)"
                autoFocus
              />
              <button onClick={() => { setAddingSkill(false); setNewName('') }}
                className="w-8 h-8 rounded-md flex items-center justify-center border border-white/10 text-slate-muted hover:text-slate-text transition-all flex-shrink-0">
                <X size={13} />
              </button>
              <button onClick={handleAddSkill} disabled={savingSkill || !newName.trim()}
                className="w-8 h-8 rounded-md flex items-center justify-center border text-xs flex-shrink-0 disabled:opacity-40 transition-all"
                style={{ borderColor: `${cat.color}40`, color: cat.color, background: `${cat.color}10` }}>
                {savingSkill
                  ? <span className="w-3 h-3 border border-current rounded-full animate-spin opacity-50" />
                  : <Plus size={14} />}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingSkill(true)}
              className="w-full mt-1 py-2 rounded-lg border border-dashed text-xs font-mono transition-all flex items-center justify-center gap-1.5"
              style={{ borderColor: `${cat.color}25`, color: `${cat.color}60` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${cat.color}50`; e.currentTarget.style.color = cat.color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${cat.color}25`; e.currentTarget.style.color = `${cat.color}60` }}
            >
              <Plus size={12} /> Add Skill
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ── Tools section ─────────────────────────────────────────────────
function ToolsSection({ tools, onCreate, onDelete, showToast }) {
  const [input, setInput] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async () => {
    const name = input.trim()
    if (!name) return
    setSaving(true)
    try {
      await onCreate(name)
      setInput('')
      showToast('Tool added.')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Wrench size={14} style={{ color: '#c0392b' }} />
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(122,122,122,0.7)' }}>
          Also Familiar With
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-8">
        {tools.length === 0 && (
          <p className="text-xs font-mono" style={{ color: 'rgba(122,122,122,0.4)' }}>No tools yet</p>
        )}
        {tools.map(tool => (
          <span key={tool.id}
            className="font-mono text-xs px-3 py-1 rounded-full flex items-center gap-1.5 group cursor-default"
            style={{ border: '0.5px solid rgba(255,255,255,0.1)', color: '#7a7a7a' }}>
            {tool.name}
            <button
              onClick={() => { onDelete(tool.id); showToast('Tool removed.') }}
              className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
              title="Remove">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="admin-input flex-1 text-sm"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Type a tool name and press Enter"
        />
        <button onClick={handleAdd} disabled={saving || !input.trim()}
          className="btn-primary px-4 py-2 text-xs disabled:opacity-50">
          {saving
            ? <span className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
            : <Plus size={14} />}
        </button>
      </div>
      <p className="font-mono text-xs mt-2" style={{ color: 'rgba(122,122,122,0.4)' }}>
        Hover a tag to remove it
      </p>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────
export default function SkillsManager({ showToast }) {
  const {
    categories, tools, loading,
    createCategory, updateCategory, deleteCategory,
    createSkill, updateSkill, deleteSkill,
    createTool, deleteTool,
    refetch,
  } = useAdminSkills()

  const [catModal, setCatModal]           = useState(false)
  const [catSaving, setCatSaving]         = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleSaveCat = async (formData) => {
    setCatSaving(true)
    try {
      if (catModal === 'new') {
        await createCategory(formData)
        showToast('Category created.')
      } else {
        await updateCategory(catModal.id, formData)
        showToast('Category updated.')
      }
      setCatModal(false)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setCatSaving(false)
    }
  }

  const handleDeleteCat = async () => {
    try {
      await deleteCategory(deleteConfirm.id)
      setDeleteConfirm(null)
      showToast('Category deleted.')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl text-slate-text mb-1">Skills & Technologies</h2>
          <p className="font-mono text-xs text-slate-muted/60">
            {categories.length} categories · {categories.reduce((s, c) => s + (c.items?.length || 0), 0)} skills
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={refetch} className="btn-secondary p-2" title="Refresh">
            <RefreshCw size={15} />
          </button>
          <button onClick={() => setCatModal('new')} className="btn-primary">
            <Plus size={15} /> Add Category
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={28} className="animate-spin" style={{ color: '#c0392b' }} />
        </div>
      ) : (
        <div className="space-y-4">
          {categories.length === 0 && (
            <div className="card p-16 text-center">
              <p className="font-body text-sm text-slate-muted mb-4">No skill categories yet.</p>
              <button onClick={() => setCatModal('new')} className="btn-primary mx-auto">
                <Plus size={15} /> Add First Category
              </button>
            </div>
          )}

          {categories.map(cat => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              onEditCat={c => setCatModal(c)}
              onDeleteCat={c => setDeleteConfirm(c)}
              onAddSkill={createSkill}
              onUpdateSkill={updateSkill}
              onDeleteSkill={deleteSkill}
              showToast={showToast}
            />
          ))}

          <ToolsSection
            tools={tools}
            onCreate={createTool}
            onDelete={deleteTool}
            showToast={showToast}
          />
        </div>
      )}

      {/* Category modal */}
      {catModal && (
        <CategoryModal
          category={catModal === 'new' ? null : catModal}
          onSave={handleSaveCat}
          onCancel={() => setCatModal(false)}
          saving={catSaving}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="card w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Trash2 size={18} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-text">Delete Category?</h3>
                <p className="font-mono text-xs text-slate-muted/60">All skills inside will be deleted too</p>
              </div>
            </div>
            <p className="text-sm text-slate-muted font-body mb-6">
              Delete <strong className="text-slate-text">"{deleteConfirm.category}"</strong> and
              its {deleteConfirm.items?.length || 0} skills?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary flex-1 justify-center">
                Cancel
              </button>
              <button onClick={handleDeleteCat}
                className="flex-1 justify-center py-2 px-4 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-md text-sm font-semibold transition-all flex items-center gap-2">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
