import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, X, CheckCircle, Archive, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/portfolioStore'

const STATUS_CONFIG = {
  new:      { label:'New',     color:'#22C55E', bg:'rgba(34,197,94,.12)',   border:'rgba(34,197,94,.25)',   Icon: Mail },
  read:     { label:'Read',    color:'#6366F1', bg:'rgba(99,102,241,.12)',  border:'rgba(99,102,241,.25)',  Icon: CheckCircle },
  replied:  { label:'Replied', color:'#22D3EE', bg:'rgba(34,211,238,.12)',  border:'rgba(34,211,238,.25)',  Icon: CheckCircle },
  archived: { label:'Archived',color:'#475569', bg:'rgba(71,85,105,.12)',   border:'rgba(71,85,105,.25)',   Icon: Archive },
}

function LeadDetail({ lead, onClose, onStatus }) {
  return (
    <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}
      className="glass p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-display font-semibold text-base">{lead.name}</div>
          <a href={`mailto:${lead.email}`} className="text-xs text-[#22D3EE] hover:underline">{lead.email}</a>
        </div>
        <button onClick={onClose} className="text-[#475569] hover:text-white"><X size={16}/></button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {lead.service && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{background:'rgba(99,102,241,.1)',border:'1px solid rgba(99,102,241,.2)',color:'#818CF8'}}>
            {lead.service.replace(/-/g,' ').toUpperCase()}
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
          style={{background:STATUS_CONFIG[lead.status].bg,border:`1px solid ${STATUS_CONFIG[lead.status].border}`,color:STATUS_CONFIG[lead.status].color}}>
          {STATUS_CONFIG[lead.status].label}
        </span>
        <span className="text-[10px] text-[#334155] flex items-center gap-1">
          <Clock size={10}/>{new Date(lead.createdAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
        </span>
      </div>
      <div className="text-sm text-[#94A3B8] leading-relaxed p-3 rounded-[8px]"
        style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)'}}>
        {lead.message}
      </div>
      <div className="flex gap-2 flex-wrap">
        {Object.keys(STATUS_CONFIG).filter(s=>s!==lead.status).map(s => (
          <button key={s} onClick={()=>onStatus(lead._id,s)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-xs font-medium transition-all"
            style={{background:STATUS_CONFIG[s].bg,border:`1px solid ${STATUS_CONFIG[s].border}`,color:STATUS_CONFIG[s].color}}>
            Mark as {STATUS_CONFIG[s].label}
          </button>
        ))}
        <a href={`mailto:${lead.email}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] text-xs font-semibold text-white"
          style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
          <Mail size={12}/> Reply via Email
        </a>
      </div>
    </motion.div>
  )
}

export default function AdminLeads() {
  const { leads, fetchLeads, updateLeadStatus } = usePortfolioStore()
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchLeads() }, [])

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const handleStatus = async (id, status) => {
    await updateLeadStatus(id, status)
    toast.success(`Marked as ${status}`)
    if (selected?._id === id) setSelected(prev => ({ ...prev, status }))
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl">Leads Inbox</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{leads.filter(l=>l.status==='new').length} new · {leads.length} total</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all', ...Object.keys(STATUS_CONFIG)].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={filter===f
              ? {background:'#6366F1',color:'#fff'}
              : {background:'rgba(255,255,255,.04)',color:'#64748B',border:'1px solid rgba(255,255,255,.08)'}}>
            {f === 'all' ? 'All' : STATUS_CONFIG[f].label}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${selected ? 'grid-cols-[1fr_360px]' : 'grid-cols-1'}`}>
        {/* List */}
        <div className="flex flex-col gap-2">
          {filtered.map(lead => {
            const cfg = STATUS_CONFIG[lead.status]
            return (
              <motion.button key={lead._id} layout onClick={()=>setSelected(lead)}
                className="glass p-4 text-left flex items-start gap-3 w-full transition-all hover:border-[rgba(99,102,241,.3)]"
                style={selected?._id===lead._id?{borderColor:'rgba(99,102,241,.4)'}:{}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                  style={{background:cfg.bg,border:`1px solid ${cfg.border}`,color:cfg.color}}>
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="font-medium text-sm">{lead.name}</div>
                    <span className="text-[9px] text-[#334155] flex-shrink-0 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#475569] truncate">{lead.email}</div>
                  <div className="text-[12px] text-[#64748B] truncate mt-1">{lead.message}</div>
                </div>
                {lead.status === 'new' && (
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] flex-shrink-0 mt-1"
                    style={{animation:'availBlink 2s ease-in-out infinite'}}/>
                )}
              </motion.button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-[#334155] text-sm">No leads in this category.</div>
          )}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <LeadDetail
              lead={selected}
              onClose={() => setSelected(null)}
              onStatus={handleStatus}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
