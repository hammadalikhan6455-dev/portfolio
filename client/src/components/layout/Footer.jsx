import { Github, Linkedin, Mail } from 'lucide-react'

const LINKS = [
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Contact',    id: 'contact' },
]

const SOCIALS = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/hammad-ali-khan-b313692bb/', label: 'LinkedIn' },
  { Icon: Mail,     href: 'hammadalikhan6455@gmail.com',                   label: 'Email' },
]

export default function Footer() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,.06)', background: '#07090F' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-xl grad-text mb-1">Hammad Ali</div>
            <div className="text-xs text-[#475569]">Amazon PPC · Logistics · Full-Stack Digital</div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5">
            {LINKS.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs text-[#475569] hover:text-white transition-colors font-medium"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-[8px] flex items-center justify-center transition-all duration-200 hover:border-[rgba(99,102,241,.4)] hover:bg-[rgba(99,102,241,.1)]"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}
              >
                <Icon size={15} className="text-[#64748B] hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6 text-[11px] text-[#1E293B]"
          style={{ borderTop: '1px solid rgba(255,255,255,.04)' }}
        >
          <span>© {new Date().getFullYear()} Hammad Ali. All rights reserved.</span>
          <span style={{ color: '#1E3A5F' }}>
            Built with <span style={{ color: '#6366F1' }}>React · Node.js · MongoDB</span> · Obsidian × Indigo Design System
          </span>
        </div>
      </div>
    </footer>
  )
}
