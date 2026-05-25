import React, { useState } from 'react'
import { Github, Linkedin, Mail, Send, CheckCircle } from 'lucide-react'
import { PERSONAL } from '../data/staticData'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple mailto fallback — replace with Formspree or EmailJS if preferred
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:${PERSONAL.email}?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="section-padding bg-ink-800/20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="section-label justify-center">Get in Touch</div>
            <h2 className="section-title">
              Let's <span className="text-crimson-bright">Work Together</span>
            </h2>
            <p className="mt-3 text-slate-muted font-body max-w-lg mx-auto">
              Interested in collaboration, internships, or just want to talk engineering? Feel free to reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                  color: '#c0392b',
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  value: 'Connect on LinkedIn',
                  href: PERSONAL.linkedin,
                  color: '#0a66c2',
                },
                {
                  icon: Github,
                  label: 'GitHub',
                  value: 'View my repositories',
                  href: PERSONAL.github,
                  color: '#e8edf5',
                },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 p-4 group hover:no-underline"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-slate-muted/60 mb-0.5">{label}</p>
                    <p className="text-sm font-body text-slate-text">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Message form */}
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Your name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="admin-input"
                  placeholder="Ahmed Khaled"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Email address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="admin-input"
                  placeholder="ahmed@example.com"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-muted/70 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="admin-input resize-none"
                  placeholder="Hi Hassan, I'd like to discuss..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                {sent ? (
                  <>
                    <CheckCircle size={15} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
