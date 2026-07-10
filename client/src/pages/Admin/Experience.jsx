import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/portfolioStore'

const SCENES = ['truck','amazon','tiktok','warpmill','factory']

function ExperienceForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit } = useForm({ defaultValues: initial || { current: false } })
  const [saving, setSaving] = useState(false)

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      data.tags = data.tags?.split(',').map(t => t.trim()).filter(Boolean) || []
      await onSave(data)
    } finally { setSaving(false) }
  }

  const input = 'w-full px-3 py-2 rounded-[8px] text-sm text-white placeholder-[#475569] outline-none transition-all'
  const style = { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', fontFamily:"'Inter',sans-serif" }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="glass p-6 mb-4">
      <div className="flex justify-between items-center mb-5">
        <div className="font-display font-bold text-base">{initial?._id ? 'Edit Experience' : 'New Experience'}</div>
        <button onClick={onCancel} className="text-[#475569] hover:text-white"><X size={16}/></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Company *</label>
          <input className={input} style={style} placeholder="Skillsrator" {...register('company',{required:true})}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Role *</label>
          <input className={input} style={style} placeholder="Amazon PPC Specialist" {...register('role',{required:true})}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Location</label>
          <input className={input} style={style} placeholder="Punjab, Pakistan" {...register('location')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Type</label>
          <select className={input} style={{...style,cursor:'pointer'}} {...register('type')}>
            {['full-time','part-time','freelance','contract'].map(t=>(
              <option key={t} value={t} style={{background:'#0D1117'}}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Start Date *</label>
          <input type="date" className={input} style={style} {...register('startDate',{required:true})}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">End Date</label>
          <input type="date" className={input} style={style} {...register('endDate')}/>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-[#64748B] mb-1.5">Description</label>
          <textarea className={input} style={{...style,minHeight:80,resize:'vertical'}} placeholder="What you did…" {...register('description')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Tags (comma separated)</label>
          <input className={input} style={style} placeholder="Amazon PPC, Bid Strategy" {...register('tags')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Background Scene</label>
          <select className={input} style={{...style,cursor:'pointer'}} {...register('scene')}>
            {SCENES.map(s=><option key={s} value={s} style={{background:'#0D1117'}}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Order (lower = first)</label>
          <input type="number" className={input} style={style} placeholder="0" {...register('order')}/>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="current" className="accent-[#6366F1]" {...register('current')}/>
          <label htmlFor="current" className="text-sm text-[#94A3B8]">Currently working here</label>
        </div>
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-semibold text-white disabled:opacity-60"
            style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
            <Save size={14}/>{saving?'Saving…':'Save Experience'}
          </button>
          <button type="button" onClick={onCancel}
            className="px-4 py-2 rounded-[8px] text-sm text-[#64748B] hover:text-white"
            style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)'}}>
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default function AdminExperience() {
  const { experiences, fetchExperiences, createExperience, updateExperience, deleteExperience } = usePortfolioStore()
  const [form, setForm] = useState(null)

  useEffect(() => { fetchExperiences() }, [])

  const handleSave = async (data) => {
    try {
      if (form?._id) { await updateExperience(form._id, data); toast.success('Updated') }
      else            { await createExperience(data);            toast.success('Created') }
      setForm(null)
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return
    await deleteExperience(id); toast.success('Deleted')
  }

  const sceneEmoji = { truck:'🚛', amazon:'📈', tiktok:'📱', warpmill:'⚙️', factory:'🏭' }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl">Experience</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{experiences.length} entries</p>
        </div>
        <button onClick={() => setForm('new')}
          className="flex items-center gap-2 px-4 py-2 rounded-[9px] text-sm font-semibold text-white"
          style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
          <Plus size={15}/>New Entry
        </button>
      </div>

      <AnimatePresence>
        {form && <ExperienceForm initial={form==='new'?null:form} onSave={handleSave} onCancel={()=>setForm(null)}/>}
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        {experiences.map(e => (
          <motion.div key={e._id} layout initial={{opacity:0}} animate={{opacity:1}}
            className="glass p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl">{sceneEmoji[e.scene] || '💼'}</span>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{e.company}</div>
                <div className="text-[11px] text-[#475569]">{e.role} · {e.current ? 'Present' : new Date(e.endDate).getFullYear()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={()=>setForm(e)} className="text-[#64748B] hover:text-white"><Pencil size={14}/></button>
              <button onClick={()=>handleDelete(e._id)} className="text-[#64748B] hover:text-red-400"><Trash2 size={14}/></button>
            </div>
          </motion.div>
        ))}
        {experiences.length===0 && (
          <div className="text-center py-16 text-[#334155] text-sm">No experience entries yet.</div>
        )}
      </div>
    </div>
  )
}
