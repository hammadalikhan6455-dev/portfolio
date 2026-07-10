import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILL_GROUPS = [
  {
    category: 'Amazon & E-Commerce',
    color: '#6366F1',
    bg: 'rgba(99,102,241,.12)',
    border: 'rgba(99,102,241,.25)',
    text: '#A5B4FC',
    items: ['Amazon PPC','Sponsored Products','Sponsored Brands','Sponsored Display','Keyword Research','Bid Optimization','A/B Testing','Private Label Launch','ACoS Reduction','ROAS Scaling','Shopify','Product Listing'],
  },
  {
    category: 'Social & Digital Marketing',
    color: '#22D3EE',
    bg: 'rgba(34,211,238,.1)',
    border: 'rgba(34,211,238,.22)',
    text: '#67E8F9',
    items: ['Meta Ads','TikTok Ads','TikTok Shop','LinkedIn Strategy','Content Creation','Lead Generation','Brand Awareness','Community Management','Analytics & Reporting','B2B Marketing','Copywriting','Email Marketing'],
  },
  {
    category: 'Tech & Development',
    color: '#C084FC',
    bg: 'rgba(192,132,252,.1)',
    border: 'rgba(192,132,252,.22)',
    text: '#D8B4FE',
    items: ['React.js','Node.js','Express.js','MongoDB','Tailwind CSS','JavaScript','REST APIs','Git & GitHub','Web & App Dev','Vite','Docker','Cloudinary'],
  },
  {
    category: 'Operations & Management',
    color: '#FB923C',
    bg: 'rgba(251,146,60,.1)',
    border: 'rgba(251,146,60,.22)',
    text: '#FDBA74',
    items: ['Production Supervision','Team Leadership','Quality Control','Process Optimization','Budget Management','Vendor Relations','KPI Tracking','Project Management'],
  },
]

function SkillGroup({ group, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass p-5"
    >
      <div
        className="font-mono text-[11px] font-semibold uppercase tracking-widest mb-4"
        style={{ color: group.color }}
      >
        {group.category}
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.08 + i * 0.03 }}
            className="text-[12px] font-medium px-3 py-1.5 rounded-[10px] cursor-default select-none transition-transform duration-150 hover:-translate-y-0.5"
            style={{
              background: group.bg,
              border: `1px solid ${group.border}`,
              color: group.text,
              boxShadow: `3px 3px 8px rgba(0,0,0,.35), -2px -2px 6px rgba(255,255,255,.04)`,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 px-6" style={{ background: '#0A0D16' }}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">// skills</div>
        <h2 className="font-display font-bold text-3xl mb-2">Capabilities across the stack.</h2>
        <p className="text-[#64748B] text-sm mb-8 max-w-lg leading-relaxed">
          From Amazon Seller Central to full-stack web — a broad toolkit built over 6+ years across platforms and industries.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((g, i) => <SkillGroup key={g.category} group={g} index={i} />)}
        </div>
      </div>
    </section>
  )
}
