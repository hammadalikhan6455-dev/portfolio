import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'

const PROJECTS = [
  {
    id: 'aqualift',
    title: 'Aqualift Store',
    type: 'E-Commerce',
    badge: 'LIVE',
    badgeColor: { text: '#22C55E', bg: 'rgba(34,197,94,.15)', border: 'rgba(34,197,94,.3)' },
    emoji: '💧',
    thumbBg: 'linear-gradient(135deg,rgba(34,211,238,.15),rgba(99,102,241,.06))',
    desc: 'Full-stack e-commerce storefront with custom product catalog, checkout flow, and conversion optimization.',
    tech: ['Shopify', 'Tailwind', 'Meta Ads'],
    url: 'https://www.aqualift.store',
    urlLabel: 'aqualift.store',
    featured: true,
  },
  {
    id: 'deenhub',
    title: 'Deenhub',
    type: 'Digital Platform',
    badge: 'LIVE',
    badgeColor: { text: '#22C55E', bg: 'rgba(34,197,94,.15)', border: 'rgba(34,197,94,.3)' },
    emoji: '🌙',
    thumbBg: 'linear-gradient(135deg,rgba(192,132,252,.15),rgba(99,102,241,.06))',
    desc: 'Islamic content platform featuring articles, resources, and a community-driven CMS.',
    tech: ['WordPress', 'SEO', 'Content'],
    url: 'https://deenhub.info',
    urlLabel: 'deenhub.info',
    featured: true,
  },
  {
    id: 'sulaiman',
    title: 'Sulaiman Enterprises',
    type: 'Construction & Interior',
    badge: 'SOURCE',
    badgeColor: { text: '#FB923C', bg: 'rgba(251,146,60,.15)', border: 'rgba(251,146,60,.3)' },
    emoji: '🏗️',
    thumbBg: 'linear-gradient(135deg,rgba(251,146,60,.12),rgba(251,191,36,.05))',
    desc: 'Premium construction & interior design website. Navy/copper branding, scroll reveals, lead capture, and animated testimonials.',
    tech: ['Tailwind CSS', 'Vanilla JS', 'EmailJS'],
    url: null,
    urlLabel: null,
    featured: false,
  },
  {
    id: 'loadedge',
    title: 'LoadEdge Dispatch',
    type: 'Logistics / Brand Growth',
    badge: 'CASE STUDY',
    badgeColor: { text: '#818CF8', bg: 'rgba(99,102,241,.15)', border: 'rgba(99,102,241,.3)' },
    emoji: '🚛',
    thumbBg: 'linear-gradient(135deg,rgba(99,102,241,.14),rgba(34,211,238,.05))',
    desc: 'Social media growth strategy for a US freight dispatching firm. Built organic pipeline targeting owner-operators and fleet managers.',
    tech: ['LinkedIn', 'Facebook', 'Analytics'],
    url: null,
    urlLabel: null,
    featured: false,
  },
]

const FILTERS = ['All', 'E-Commerce', 'Digital Platform', 'Construction & Interior', 'Logistics / Brand Growth']

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: '#0D1117',
        border: `1px solid ${hovered ? 'rgba(255,255,255,.16)' : 'rgba(255,255,255,.08)'}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,.4)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Thumbnail */}
      <div
        className="flex items-center justify-center relative overflow-hidden"
        style={{ height: 110, background: project.thumbBg }}
      >
        <span style={{ fontSize: 36 }}>{project.emoji}</span>
        <div
          className="absolute top-2.5 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{
            color: project.badgeColor.text,
            background: project.badgeColor.bg,
            border: `1px solid ${project.badgeColor.border}`,
          }}
        >
          {project.badge}
        </div>
        {project.featured && (
          <div className="absolute top-2.5 left-3 text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ color: '#6366F1', background: 'rgba(99,102,241,.15)', border: '1px solid rgba(99,102,241,.3)' }}>
            FEATURED
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="font-mono text-[10px] text-[#6366F1] uppercase tracking-[1px] mb-1.5 font-medium">
          {project.type}
        </div>
        <div className="font-display font-semibold text-[15px] mb-2">{project.title}</div>
        <p className="text-[12px] text-[#475569] leading-relaxed mb-3">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-[6px] text-[#64748B]"
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)' }}>
              {t}
            </span>
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-[#22D3EE] font-medium hover:underline"
            onClick={e => e.stopPropagation()}
          >
            {project.urlLabel}
            <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.type === filter)

  return (
    <section id="projects" className="py-16 px-6" style={{ background: '#07090F' }}>
      <div className="max-w-6xl mx-auto">
        <div className="section-label">// portfolio</div>
        <h2 className="font-display font-bold text-3xl mb-3">Products I've built & grown.</h2>
        <p className="text-[#64748B] text-sm mb-7 max-w-lg leading-relaxed">
          From e-commerce stores to logistics platforms — each project is a live proof of strategy, design, and execution.
        </p>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'E-Commerce', 'Digital Platform', 'Logistics / Brand Growth'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={
                filter === f
                  ? { background: '#6366F1', color: '#fff' }
                  : { background: 'rgba(255,255,255,.04)', color: '#64748B', border: '1px solid rgba(255,255,255,.08)' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
