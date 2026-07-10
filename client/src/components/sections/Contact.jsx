import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

const SERVICES = [
  { value: 'amazon-ppc',   label: 'Amazon PPC Management' },
  { value: 'social-media', label: 'Social Media Growth' },
  { value: 'web-dev',      label: 'Web / App Development' },
  { value: 'logistics',    label: 'Logistics Brand Strategy' },
  { value: 'other',        label: 'Other' },
]

const CONTACT_INFO = [
  { icon: '✉️', label: 'Email',    value: 'hammadalikhan6455@gmail.com', color: '#6366F1', href: 'mailto:hammadalikhan6455@gmail.com' },
  { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/hammad-alikhan…', color: '#22D3EE', href: 'https://www.linkedin.com/in/hammad-alikhan-b313692bb' },
  { icon: '📍', label: 'Location', value: 'Multan, Punjab, Pakistan',  color: '#C084FC', href: null },
]

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await axios.post('/api/leads', data)
      toast.success('Message sent! I\'ll get back to you within 24 hours.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full text-sm text-white placeholder-[#475569] px-3.5 py-2.5 rounded-[8px] outline-none transition-all duration-200 focus:border-[rgba(99,102,241,.5)]`
  const inputStyle = { background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', fontFamily: "'Inter',sans-serif" }

  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">// contact</div>
        <h2 className="font-display font-bold text-3xl mb-2">Let's build something together.</h2>
        <p className="text-[#64748B] text-sm mb-8 max-w-lg leading-relaxed">
          Whether you need Amazon PPC management, a new website, or a full digital strategy — I'm reachable within 24 hours.
        </p>

        <div className="grid md:grid-cols-[1fr_1.15fr] gap-5">
          {/* Form */}
          <div className="glass p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Full name</label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  placeholder="Alex Johnson"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className="text-[11px] text-red-400 mt-1">{errors.name.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Email address</label>
                <input
                  className={inputClass}
                  style={inputStyle}
                  type="email"
                  placeholder="alex@company.com"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                />
                {errors.email && <span className="text-[11px] text-red-400 mt-1">{errors.email.message}</span>}
              </div>
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Service needed</label>
                <select
                  className={inputClass}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  {...register('service')}
                >
                  <option value="" style={{ background: '#0D1117' }}>Select a service…</option>
                  {SERVICES.map(s => (
                    <option key={s.value} value={s.value} style={{ background: '#0D1117' }}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#64748B] font-medium mb-1.5">Message</label>
                <textarea
                  className={inputClass}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
                  placeholder="Tell me about your project..."
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && <span className="text-[11px] text-red-400 mt-1">{errors.message.message}</span>}
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-[10px] text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#6366F1,#818CF8)' }}
              >
                {loading ? 'Sending…' : 'Send Message →'}
              </motion.button>
            </form>
          </div>

          {/* Info panel */}
          <div className="glass p-6 flex flex-col gap-5">
            <div>
              <div className="font-display font-semibold text-lg mb-1.5">Prefer a direct line?</div>
              <p className="text-[13px] text-[#64748B] leading-relaxed">
                I respond to every inquiry personally. Let's talk about your goals and how I can help.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map(c => (
                <div key={c.label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: `rgba(99,102,241,.1)`, border: `1px solid rgba(99,102,241,.2)` }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64748B]">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] font-medium hover:underline" style={{ color: c.color }}>
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-[13px] font-medium text-white">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-5 border-t border-white/[0.06]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)', color: '#22C55E' }}>
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" style={{ animation: 'availBlink 2s ease-in-out infinite' }} />
                Open to freelance & long-term retainers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
