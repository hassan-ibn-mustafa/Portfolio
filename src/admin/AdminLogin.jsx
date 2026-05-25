import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Zap, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin/dashboard', { replace: true })
    })
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-ink-900 bg-circuit-grid bg-grid flex items-center justify-center p-4">
      {/* Ambient glow */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(192,57,43,0.06)' }}
      />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl border border-crimson/30 bg-crimson/10 items-center justify-center mb-4">
            <Zap size={24} className="text-crimson-bright" />
          </div>
          <h1 className="font-display font-black text-2xl text-slate-text">Admin Panel</h1>
          <p className="font-mono text-xs text-slate-muted/60 mt-1">Portfolio CMS · Secure Access</p>
        </div>

        {/* Card */}
        <div className="card p-7">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-muted/70 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input pr-10"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted/50 hover:text-slate-muted transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-crimson/30 border-t-crimson rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                <>
                  <LogIn size={15} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-xs text-slate-muted/30 mt-6">
          <a href="/" className="hover:text-slate-muted/60 transition-colors">← Back to Portfolio</a>
        </p>
      </div>
    </div>
  )
}
