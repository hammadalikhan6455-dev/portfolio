import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { usePortfolioStore } from '../../store/portfolioStore'

export default function AdminAbout() {
  const { about, fetchAbout, updateAbout } = usePortfolioStore()
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, control, reset } = useForm()
  const { fields, append, remove } = useFieldArray({ control, name: 'stats' })

  useEffect(() => { fetchAbout() }, [])
  useEffect(() => { if (about) reset(about) }, [about])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateAbout(data)
      toast.success('About section updated!')
    } catch (e) {
      toast.error(e.response?.data?.message || 'Update failed')
    } finally { setSaving(false) }
  }

  const input = 'w-full px-3 py-2 rounded-[8px] text-sm text-white placeholder-[#475569] outline-none transition-all'
  const style = { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', fontFamily:"'Inter',sans-serif" }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display font-bold text-2xl mb-1">About Section</h1>
      <p className="text-[#64748B] text-sm mb-6">Manage your bio, headline, and key stats.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="glass p-5 flex flex-col gap-4">
          <div className="font-mono text-[11px] text-[#6366F1] uppercase tracking-widest mb-1">Personal Info</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">Full Name</label>
              <input className={input} style={style} {...register('name')} placeholder="Hammad Ali Khan"/>
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">Location</label>
              <input className={input} style={style} {...register('location')} placeholder="Multan, Punjab, Pakistan"/>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-[#64748B] mb-1.5">Headline</label>
              <input className={input} style={style} {...register('headline')} placeholder="Entrepreneur & Tech Founder | Amazon PPC..."/>
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">Email</label>
              <input type="email" className={input} style={style} {...register('email')} placeholder="you@example.com"/>
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">LinkedIn URL</label>
              <input className={input} style={style} {...register('linkedin')} placeholder="https://linkedin.com/in/..."/>
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">Resume URL (Cloudinary or direct link)</label>
              <input className={input} style={style} {...register('resumeUrl')} placeholder="https://..."/>
            </div>
            <div>
              <label className="block text-xs text-[#64748B] mb-1.5">Availability</label>
              <select className={input} style={{...style,cursor:'pointer'}} {...register('availability')}>
                {['available','busy','unavailable'].map(a=>(
                  <option key={a} value={a} style={{background:'#0D1117'}}>{a}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-[#64748B] mb-1.5">Bio</label>
            <textarea className={input} style={{...style,minHeight:100,resize:'vertical'}} {...register('bio')} placeholder="Write your bio here…"/>
          </div>
        </div>

        {/* Stats */}
        <div className="glass p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="font-mono text-[11px] text-[#6366F1] uppercase tracking-widest">Key Stats</div>
            <button type="button" onClick={() => append({ label:'', value:'', suffix:'' })}
              className="flex items-center gap-1.5 text-xs text-[#6366F1] hover:text-white">
              <Plus size={13}/> Add Stat
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {fields.map((field, i) => (
              <div key={field.id} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-center">
                <input className={input} style={style} placeholder="Label" {...register(`stats.${i}.label`)}/>
                <input className={input} style={style} placeholder="Value (e.g. $50K)" {...register(`stats.${i}.value`)}/>
                <input className={input} style={style} placeholder="Suffix (/mo)" {...register(`stats.${i}.suffix`)}/>
                <button type="button" onClick={() => remove(i)} className="text-[#475569] hover:text-red-400 flex justify-center">
                  <Trash2 size={14}/>
                </button>
              </div>
            ))}
            {fields.length === 0 && (
              <div className="text-[#334155] text-sm text-center py-4">No stats yet. Click "Add Stat" to add one.</div>
            )}
          </div>
        </div>

        <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.98}} type="submit" disabled={saving}
          className="flex items-center gap-2 self-start px-5 py-2.5 rounded-[9px] text-sm font-semibold text-white disabled:opacity-60"
          style={{background:'linear-gradient(135deg,#6366F1,#818CF8)'}}>
          <Save size={15}/>{saving ? 'Saving…' : 'Save Changes'}
        </motion.button>
      </form>
    </div>
  )
}
