import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { SKILLS as SEED } from '../data/staticData'

// ── تحويل SEED data لنفس شكل Supabase ──────────────────────────
function normalizeSeed() {
  return SEED.map((cat, ci) => ({
    id: `seed-cat-${ci}`,
    category: cat.category,
    icon: cat.icon,
    color: cat.color,
    sort_order: ci,
    items: cat.items.map((item, ii) => ({
      id: `seed-item-${ci}-${ii}`,
      name: item.name,
      level: item.level,
      sort_order: ii,
    })),
  }))
}

// ── Public hook — للصفحة العامة ──────────────────────────────────
export function useSkills() {
  const [categories, setCategories] = useState([])
  const [tools, setTools]           = useState([])   // "also familiar with"
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        // جيب الـ categories مع الـ skills مدمجة
        const { data: cats, error: cErr } = await supabase
          .from('skill_categories')
          .select('*, skills(id, name, level, sort_order)')
          .order('sort_order', { ascending: true })

        if (cErr) throw cErr

        // جيب الـ tools (also familiar with)
        const { data: toolsData } = await supabase
          .from('tools')
          .select('*')
          .order('sort_order', { ascending: true })

        if (cats && cats.length > 0) {
          // رتّب الـ skills جوه كل category
          const sorted = cats.map(c => ({
            ...c,
            items: (c.skills || []).sort((a, b) => a.sort_order - b.sort_order),
          }))
          setCategories(sorted)
          setTools(toolsData || [])
        } else {
          setCategories(normalizeSeed())
          setTools([])
        }
      } catch {
        setCategories(normalizeSeed())
        setTools([])
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { categories, tools, loading }
}

// ── Admin hook — CRUD كامل ────────────────────────────────────────
export function useAdminSkills() {
  const [categories, setCategories] = useState([])
  const [tools, setTools]           = useState([])
  const [loading, setLoading]       = useState(true)

  // ─── Fetch ───
  const fetchAll = async () => {
    setLoading(true)
    const { data: cats } = await supabase
      .from('skill_categories')
      .select('*, skills(id, name, level, sort_order)')
      .order('sort_order', { ascending: true })

    const { data: toolsData } = await supabase
      .from('tools')
      .select('*')
      .order('sort_order', { ascending: true })

    setCategories(
      (cats || []).map(c => ({
        ...c,
        items: (c.skills || []).sort((a, b) => a.sort_order - b.sort_order),
      }))
    )
    setTools(toolsData || [])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  // ─── Category CRUD ───
  const createCategory = async ({ category, icon, color }) => {
    const sort_order = categories.length
    const { data, error } = await supabase
      .from('skill_categories')
      .insert([{ category, icon, color, sort_order }])
      .select()
      .single()
    if (error) throw error
    setCategories(prev => [...prev, { ...data, items: [] }])
    return data
  }

  const updateCategory = async (id, updates) => {
    const { data, error } = await supabase
      .from('skill_categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, ...data } : c)
    )
    return data
  }

  const deleteCategory = async (id) => {
    // حذف الـ skills الفرعية أولاً
    await supabase.from('skills').delete().eq('category_id', id)
    const { error } = await supabase.from('skill_categories').delete().eq('id', id)
    if (error) throw error
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  // ─── Skill item CRUD ───
  const createSkill = async (categoryId, { name, level }) => {
    const cat = categories.find(c => c.id === categoryId)
    const sort_order = cat ? cat.items.length : 0
    const { data, error } = await supabase
      .from('skills')
      .insert([{ category_id: categoryId, name, level: Number(level), sort_order }])
      .select()
      .single()
    if (error) throw error
    setCategories(prev =>
      prev.map(c => c.id === categoryId
        ? { ...c, items: [...c.items, data] }
        : c
      )
    )
    return data
  }

  const updateSkill = async (categoryId, skillId, updates) => {
    const { data, error } = await supabase
      .from('skills')
      .update({ ...updates, level: Number(updates.level) })
      .eq('id', skillId)
      .select()
      .single()
    if (error) throw error
    setCategories(prev =>
      prev.map(c => c.id === categoryId
        ? { ...c, items: c.items.map(s => s.id === skillId ? data : s) }
        : c
      )
    )
    return data
  }

  const deleteSkill = async (categoryId, skillId) => {
    const { error } = await supabase.from('skills').delete().eq('id', skillId)
    if (error) throw error
    setCategories(prev =>
      prev.map(c => c.id === categoryId
        ? { ...c, items: c.items.filter(s => s.id !== skillId) }
        : c
      )
    )
  }

  // ─── Tools CRUD ───
  const createTool = async (name) => {
    const sort_order = tools.length
    const { data, error } = await supabase
      .from('tools')
      .insert([{ name, sort_order }])
      .select()
      .single()
    if (error) throw error
    setTools(prev => [...prev, data])
    return data
  }

  const deleteTool = async (id) => {
    const { error } = await supabase.from('tools').delete().eq('id', id)
    if (error) throw error
    setTools(prev => prev.filter(t => t.id !== id))
  }

  return {
    categories, tools, loading,
    createCategory, updateCategory, deleteCategory,
    createSkill, updateSkill, deleteSkill,
    createTool, deleteTool,
    refetch: fetchAll,
  }
}
