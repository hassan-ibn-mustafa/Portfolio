import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined) // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center">
        <Loader2 size={28} className="text-crimson-bright animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin" replace />
  }

  return children
}
