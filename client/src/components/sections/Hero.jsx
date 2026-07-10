import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: '$50K', label: 'Monthly Ad Budget', suffix: '/mo' },
  { value: '40%',  label: 'ACoS Reduction',    suffix: '' },
  { value: '15+',  label: 'PPC Accounts',       suffix: '' },
  { value: '£10K+',label: 'First-Month Sales',  suffix: '' },
]

const PARTICLES = [
  { dx: '-14px', dy: '-18px', dur: '6s',   color: 'rgba(99,102,241,.5)',  size: 4, top: '35%', left: '22%' },
  { dx: '18px',  dy: '10px',  dur: '8s',   color: 'rgba(34,211,238,.45)', size: 3, top: '20%', left: '55%' },
  { dx: '-9px',  dy: '14px',  dur: '7s',   color: 'rgba(192,132,252,.5)', size: 5, top: '58%', left: '80%' },
  { dx: '11px',  dy: '-7px',  dur: '5.5s', color: 'rgba(99,102,241,.35)', size: 3, top: '42%', left: '90%' },
  { dx: '-16px', dy: '12px',  dur: '9s',   color: 'rgba(34,211,238,.3)',  size: 4, top: '72%', left: '45%' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

export default function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-16 px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380, height: 380,
          background: 'rgba(99,102,241,.14)',
          top: -90, right: -60,
          filter: 'blur(70px)',
          animation: 'orbFloat 9s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 260, height: 260,
          background: 'rgba(34,211,238,.09)',
          bottom: -30, left: 20,
          filter: 'blur(65px)',
          animation: 'orbFloat 12s ease-in-out infinite reverse',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size, height: p.size,
            background: p.color,
            top: p.top, left: p.left,
            animation: `partFloat ${p.dur} ease-in-out infinite`,
            '--dx': p.dx, '--dy': p.dy,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(99,102,241,.1)',
                border: '1px solid rgba(99,102,241,.25)',
                color: '#818CF8',
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-[#22C55E]"
                style={{ animation: 'availBlink 2s ease-in-out infinite' }}
              />
              Open to opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-bold leading-[1.08] mb-3"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
          >
            I scale brands<br />
            <span className="grad-text">on Amazon & beyond.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={item}
            className="text-[#64748B] text-sm leading-relaxed max-w-[440px] mt-4 mb-8"
          >
            Amazon PPC strategist · Logistics growth partner · Full-stack digital builder.<br />
            Turning ad spend into 6-figure revenue since 2019.
          </motion.p>

         {/* CTA */}
<motion.div variants={item} className="flex gap-3 flex-wrap">
  <button
    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
    className="px-6 py-3 rounded-[10px] bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_8px_25px_rgba(99,102,241,.4)] hover:-translate-y-0.5"
  >
    View My Work
  </button>
 <a
    href="/resume.pdf"
    download="resume.pdf" 
    className="px-6 py-3 rounded-[10px] text-white text-sm font-medium transition-all duration-200 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"
  >
    Download Resume
  </a>
</motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-14"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[14px] p-4 text-center transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(255,255,255,.07)',
              }}
            >
              <div
                className="font-display font-bold text-2xl grad-text"
              >
                {s.value}
              </div>
              <div className="text-[10px] text-[#475569] mt-1 uppercase tracking-[.7px] font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
