import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Briefcase, FolderOpen, Star, Inbox, LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminProjects   from './Projects'
import AdminExperience from './Experience'
import AdminAbout      from './About'
import AdminLeads      from './Leads'
import toast from 'react-hot-toast'

const NAV = [
  { to: '',             Icon: LayoutDashboard, label: 'Overview'   },
  { to: 'about',        Icon: User,            label: 'About'      },
  { to: 'projects',     Icon: FolderOpen,      label: 'Projects'   },
  { to: 'experience',   Icon: Briefcase,       label: 'Experience' },
  { to: 'leads',        Icon: Inbox,           label: 'Leads'      },
]

function Sidebar() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate('/login')
  }

  const base = 'flex items-center gap-2.5 px-3 py-2 rounded-[8px] text-sm font-medium transition-all duration-150'
  const active = `${base} bg-[rgba(99,102,241,.15)] text-white border border-[rgba(99,102,241,.25)]`
  const idle   = `${base} text-[#64748B] hover:text-white hover:bg-[rgba(255,255,255,.05)]`

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col h-screen sticky top-0"
      style={{ background:'#0A0D16', borderRight:'1px solid rgba(255,255,255,.06)' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="font-display font-bold text-lg grad-text">HAK Admin</div>
        <div className="text-[10px] text-[#334155] mt-0.5 font-mono">{user?.email || 'admin'}</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1">
        {NAV.map(({ to, Icon, label }) => (
          <NavLink key={label} to={`/admin${to ? '/' + to : ''}`} end={!to}
            className={({ isActive }) => isActive ? active : idle}>
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.06]">
        <button onClick={handleLogout} className={`${idle} w-full`}>
          <LogOut size={15} />
          Logout
        </button>
        <a href="/" target="_blank" rel="noopener noreferrer"
          className={`${idle} w-full mt-1 text-[#6366F1] hover:text-[#818CF8]`}>
          <Star size={15} />
          View Portfolio
        </a>
      </div>
    </aside>
  )
}

function Overview() {
  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-2xl mb-2">Dashboard Overview</h1>
      <p className="text-[#64748B] text-sm mb-8">Manage all portfolio content from here.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:'Projects',   color:'#6366F1', icon:'📁' },
          { label:'Experience', color:'#22D3EE', icon:'💼' },
          { label:'Leads',      color:'#22C55E', icon:'📬' },
          { label:'Skills',     color:'#C084FC', icon:'⚡' },
        ].map(c => (
          <div key={c.label} className="glass p-5 flex flex-col gap-3">
            <span className="text-2xl">{c.icon}</span>
            <div className="font-display font-bold text-lg" style={{ color:c.color }}>—</div>
            <div className="text-[11px] text-[#64748B] uppercase tracking-wider font-medium">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen" style={{ background:'#07090F' }}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route index          element={<Overview />} />
          <Route path="about"      element={<AdminAbout />} />
          <Route path="projects"   element={<AdminProjects />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="leads"      element={<AdminLeads />} />
        </Routes>
      </main>
    </div>
  )
}
