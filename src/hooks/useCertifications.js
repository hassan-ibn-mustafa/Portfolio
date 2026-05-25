import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { CERTIFICATIONS as SEED } from '../data/staticData'

// ── Public hook — للصفحة العامة ──────────────────────────────────
export function useCertifications() {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('year', { ascending: false })
        if (error) throw error
        setCertifications(data && data.length > 0 ? data : SEED)
      } catch {
        setCertifications(SEED)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { certifications, loading }
}

// ── Admin hook — CRUD كامل ────────────────────────────────────────
export function useAdminCertifications() {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('year', { ascending: false })
    if (!error) setCertifications(data || [])
    setLoading(false)
  }

  const createCertification = async (cert) => {
    const { data, error } = await supabase
      .from('certifications')
      .insert([cert])
      .select()
      .single()
    if (error) throw error
    setCertifications((prev) => [data, ...prev])
    return data
  }

  const updateCertification = async (id, updates) => {
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setCertifications((prev) => prev.map((c) => (c.id === id ? data : c)))
    return data
  }

  const deleteCertification = async (id) => {
    const { error } = await supabase.from('certifications').delete().eq('id', id)
    if (error) throw error
    setCertifications((prev) => prev.filter((c) => c.id !== id))
  }

  useEffect(() => { fetchAll() }, [])

  return {
    certifications,
    loading,
    createCertification,
    updateCertification,
    deleteCertification,
    refetch: fetchAll,
  }
}
