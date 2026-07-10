import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, ExternalLink, X, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/portfolioStore'

const CATEGORIES = ['ecommerce','logistics','saas','marketing','construction','other']
const TYPES      = ['live','source','case-study']
const STATUSES   = ['published','draft','archived']

function ProjectForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initial || {} })
  const [saving, setSaving] = useState(false)

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      data.techStack = data.techStack?.split(',').map(t => t.trim()).filter(Boolean) || []
      await onSave(data)
    } finally {
      setSaving(false)
    }
  }

  const input = 'w-full px-3 py-2 rounded-[8px] text-sm text-white placeholder-[#475569] outline-none transition-all focus:border-[rgba(99,102,241,.5)]'
  const style = { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', fontFamily:"'Inter',sans-serif" }

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
      className="glass p-6 mb-4">
      <div className="flex justify-between items-center mb-5">
        <div className="font-display font-bold text-base">{initial?._id ? 'Edit Project' : 'New Project'}</div>
        <button onClick={onCancel} className="text-[#475569] hover:text-white"><X size={16}/></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Title *</label>
          <input className={input} style={style} placeholder="Aqualift Store" {...register('title',{required:true})}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Slug *</label>
          <input className={input} style={style} placeholder="aqualift-store" {...register('slug',{required:true})}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Category</label>
          <select className={input} style={{...style,cursor:'pointer'}} {...register('category')}>
            {CATEGORIES.map(c=><option key={c} value={c} style={{background:'#0D1117'}}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Type</label>
          <select className={input} style={{...style,cursor:'pointer'}} {...register('type')}>
            {TYPES.map(t=><option key={t} value={t} style={{background:'#0D1117'}}>{t}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-[#64748B] mb-1.5">Short Description</label>
          <input className={input} style={style} placeholder="One-line description (max 200 chars)" {...register('shortDescription')}/>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-[#64748B] mb-1.5">Full Description</label>
          <textarea className={input} style={{...style,minHeight:80,resize:'vertical'}} placeholder="Detailed project description…" {...register('description')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Live URL</label>
          <input className={input} style={style} placeholder="https://aqualift.store" {...register('liveUrl')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Tech Stack (comma separated)</label>
          <input className={input} style={style} placeholder="React, Tailwind, Node.js" {...register('techStack')}/>
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1.5">Status</label>
          <select className={input} style={{...style,cursor:'pointer'}} {...register('status')}>
            {STATUSES.map(s=><option key={s} value={s} style={{background:'#0D1117'}}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="featured" className="accent-[#6366F1]" {...register('featured')}/>
          <label htmlFor="featured" className="text-sm text-[#94A3B8]">Featured project</label>
        </div>
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-semibold text-white disabled:opacity-60"
            style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
            <Save size={14}/>{saving?'Saving…':'Save Project'}
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

export default function AdminProjects() {
  const { projects, fetchProjects, createProject, updateProject, deleteProject } = usePortfolioStore()
  const [form, setForm] = useState(null) // null | 'new' | project obj

  useEffect(() => { fetchProjects({ status: undefined }) }, [])

  const handleSave = async (data) => {
    try {
      if (form?._id) {
        await updateProject(form._id, data); toast.success('Project updated')
      } else {
        await createProject(data); toast.success('Project created')
      }
      setForm(null)
    } catch (e) { toast.error(e.response?.data?.message || 'Save failed') }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await deleteProject(id); toast.success('Deleted')
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl">Projects</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{projects.length} project{projects.length!==1?'s':''}</p>
        </div>
        <button onClick={() => setForm('new')}
          className="flex items-center gap-2 px-4 py-2 rounded-[9px] text-sm font-semibold text-white"
          style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
          <Plus size={15}/>New Project
        </button>
      </div>

      <AnimatePresence>
        {form && (
          <ProjectForm
            initial={form === 'new' ? null : form}
            onSave={handleSave}
            onCancel={() => setForm(null)}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3">
        {projects.map(p => (
          <motion.div key={p._id} layout initial={{opacity:0}} animate={{opacity:1}}
            className="glass p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-xl">{p.category==='ecommerce'?'📦':p.category==='logistics'?'🚛':p.category==='construction'?'🏗️':'💻'}</div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{p.title}</div>
                <div className="text-[11px] text-[#475569] font-mono">{p.slug} · {p.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:opacity-80"><ExternalLink size={14}/></a>}
              <button onClick={() => setForm(p)} className="text-[#64748B] hover:text-white"><Pencil size={14}/></button>
              <button onClick={() => handleDelete(p._id)} className="text-[#64748B] hover:text-red-400"><Trash2 size={14}/></button>
            </div>
          </motion.div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-16 text-[#334155] text-sm">No projects yet. Click "New Project" to add one.</div>
        )}
      </div>
    </div>
  )
}
