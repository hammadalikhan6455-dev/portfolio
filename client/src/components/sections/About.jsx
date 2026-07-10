import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, ExternalLink, BookOpen } from 'lucide-react'

const STATS = [
  { label: 'Monthly Ad Budget', value: '$50K', suffix: '/mo',   color: '#6366F1' },
  { label: 'ACoS Reduction',    value: '40%',  suffix: '',      color: '#22C55E' },
  { label: 'PPC Accounts',      value: '15+',  suffix: '',      color: '#22D3EE' },
  { label: 'First-Month Sales', value: '£10K+',suffix: '',      color: '#C084FC' },
]

const INFO = [
  { Icon: MapPin,     label: 'Location', value: 'Multan, Punjab, Pakistan',         href: null },
  { Icon: Mail,       label: 'Email',    value: 'hammadalikhan6455@gmail.com',       href: 'mailto:hammadalikhan6455@gmail.com' },
  { Icon: ExternalLink,label:'LinkedIn', value: 'linkedin.com/in/hammad-alikhan…',  href: 'https://www.linkedin.com/in/hammad-alikhan-b313692bb' },
  { Icon: BookOpen,   label: 'Degree',   value: 'BS Computer Science · GCU Faisalabad', href: null },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="py-16 px-6" style={{ background: '#0A0D16' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="section-label">// about</div>
          <h2 className="font-display font-bold text-3xl mb-8">The person behind the results.</h2>
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-5">
          {/* Left — avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass p-6 flex flex-col items-center text-center gap-4"
          >
            {/* Avatar */}
            <div 
  className="w-24 h-24 rounded-full overflow-hidden" 
  style={{
    border: '3px solid rgba(99,102,241,.4)',
    boxShadow: '0 0 30px rgba(99,102,241,.25)',
  }}
>
  <img 
    src="/person.png" 
    alt="Hammad Ali" 
    className="w-full h-full object-cover" 
  />
</div>

            {/* Name */}
            <div>
              <div className="font-display font-bold text-lg">Hammad Ali</div>
              <div className="text-xs text-[#475569] mt-1">Entrepreneur & Tech Founder</div>
            </div>

            {/* Availability */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)', color: '#22C55E' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" style={{ animation: 'availBlink 2s ease-in-out infinite' }} />
              Available for work
            </div>

            {/* Info rows */}
            <div className="w-full flex flex-col gap-2.5 text-left mt-1">
              {INFO.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-[#6366F1] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#475569] uppercase tracking-[.6px] font-medium">{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[#94A3B8] hover:text-[#6366F1] transition-colors">{value}</a>
                    ) : (
                      <span className="text-xs text-[#94A3B8]">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — bio + highlights */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="glass p-6"
            >
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                I help Amazon sellers eliminate wasted ad spend and scale profitably. Over the past year managing
                Amazon PPC campaigns, I've grown stores from zero to 6-figure revenues through data-driven campaign
                strategy — not guesswork.
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                Before that I spent 5 years in production management at JKSM–Pepsi Cola Bottlers, building the
                process discipline that now drives how I approach every ad account. I also work across TikTok Shop,
                Shopify, Meta Ads, and social media growth — giving clients a full-funnel view, not just one campaign.
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                My approach is straightforward: examine your data, fix what's broken, build campaigns that convert.
                No fluff. No vanity metrics. Just outcomes.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {[
                  { label: 'SPECIALTY',   value: 'Amazon PPC & Brand Growth',   color: '#6366F1' },
                  { label: 'EXPERIENCE',  value: '6+ Years Across Platforms',    color: '#22D3EE' },
                  { label: 'MARKETS',     value: 'US, UK & Pakistan',            color: '#C084FC' },
                  { label: 'EDUCATION',   value: 'BS Computer Science',          color: '#FB923C' },
                ].map(h => (
                  <div
                    key={h.label}
                    className="rounded-xl p-3"
                    style={{ background: `rgba(99,102,241,.06)`, border: `1px solid rgba(99,102,241,.15)` }}
                  >
                    <div className="font-mono text-[10px] mb-1" style={{ color: h.color }}>{h.label}</div>
                    <div className="text-[13px] font-medium">{h.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}
                >
                  <div className="font-display font-bold text-xl" style={{ color: s.color }}>
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-[10px] text-[#475569] mt-1 uppercase tracking-[.6px] font-medium leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
