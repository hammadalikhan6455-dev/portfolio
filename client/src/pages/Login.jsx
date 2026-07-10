import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login }   = useAuth()
  const navigate    = useNavigate()
  const [show, setShow]     = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async ({ email, password }) => {
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch {
      toast.error('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = {
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.08)',
    fontFamily: "'Inter',sans-serif",
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#07090F' }}
    >
      {/* Orbs */}
      <div className="absolute rounded-full pointer-events-none" style={{ width:320,height:320,background:'rgba(99,102,241,.12)',top:-80,right:-60,filter:'blur(70px)',animation:'orbFloat 9s ease-in-out infinite' }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width:220,height:220,background:'rgba(34,211,238,.08)',bottom:-40,left:20,filter:'blur(65px)',animation:'orbFloat 12s ease-in-out infinite reverse' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 w-full max-w-sm relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-display font-bold text-2xl grad-text mb-1">HAK</div>
          <div className="text-sm text-[#64748B]">Admin Dashboard</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs text-[#64748B] font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-[8px] text-sm text-white placeholder-[#475569] outline-none transition-all focus:border-[rgba(99,102,241,.5)]"
                style={inputBase}
                {...register('email', { required: 'Email required' })}
              />
            </div>
            {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-[#64748B] font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
              <input
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 rounded-[8px] text-sm text-white placeholder-[#475569] outline-none transition-all focus:border-[rgba(99,102,241,.5)]"
                style={inputBase}
                {...register('password', { required: 'Password required' })}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-white"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && <span className="text-[11px] text-red-400 mt-1 block">{errors.password.message}</span>}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-[9px] text-sm font-semibold text-white mt-2 disabled:opacity-60 transition-all"
            style={{ background: 'linear-gradient(135deg,#6366F1,#818CF8)' }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-[#475569] hover:text-white transition-colors">← Back to portfolio</a>
        </div>
      </motion.div>
    </div>
  )
}
