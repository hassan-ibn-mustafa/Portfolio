import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { SEED_PROJECTS } from '../data/staticData'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      // If Supabase returns empty or misconfigured, show seed data
      setProjects(data && data.length > 0 ? data : SEED_PROJECTS)
    } catch (err) {
      console.warn('Supabase fetch failed, using seed data:', err.message)
      setProjects(SEED_PROJECTS)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, error, refetch: fetchProjects }
}

export function useAdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  const createProject = async (project) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    if (error) throw error
    setProjects((prev) => [data, ...prev])
    return data
  }

  const updateProject = async (id, updates) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setProjects((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return { projects, loading, createProject, updateProject, deleteProject, refetch: fetchProjects }
}
