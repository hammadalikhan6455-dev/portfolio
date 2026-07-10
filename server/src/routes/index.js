import { Router }   from 'express'
import rateLimit    from 'express-rate-limit'
import { authenticate, authorize } from '../middleware/auth.middleware.js'
import { validate, leadSchema, loginSchema, projectSchema } from '../middleware/validate.js'
import {
  login, refresh, logout,
  getAbout, updateAbout,
  getProjects, getProjectBySlug, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getSkills, upsertSkills,
  createLead, getLeads, updateLead,
} from '../controllers/index.js'
import { upload, uploadMedia } from '../controllers/upload.controller.js'

const router = Router()

const leadLimiter = rateLimit({ windowMs:60*60*1000, max:5, message:{success:false,message:'Too many submissions. Try again in 1 hour.'} })
const authLimiter = rateLimit({ windowMs:15*60*1000, max:10 })

/* ── Auth ─────────────────────────────────────────────── */
router.post('/auth/login',   authLimiter, validate(loginSchema), login)
router.post('/auth/refresh', refresh)
router.post('/auth/logout',  authenticate, logout)

/* ── Public ───────────────────────────────────────────── */
router.get ('/about',          getAbout)
router.get ('/projects',       getProjects)
router.get ('/projects/:slug', getProjectBySlug)
router.get ('/experiences',    getExperiences)
router.get ('/skills',         getSkills)
router.post('/leads',          leadLimiter, validate(leadSchema), createLead)

/* ── Admin (JWT required) ─────────────────────────────── */
router.use('/admin', authenticate, authorize('admin'))

router.put   ('/admin/about',             updateAbout)
router.post  ('/admin/projects',          validate(projectSchema), createProject)
router.put   ('/admin/projects/:id',      updateProject)
router.delete('/admin/projects/:id',      deleteProject)
router.post  ('/admin/experiences',       createExperience)
router.put   ('/admin/experiences/:id',   updateExperience)
router.delete('/admin/experiences/:id',   deleteExperience)
router.put   ('/admin/skills',            upsertSkills)
router.get   ('/admin/leads',             getLeads)
router.put   ('/admin/leads/:id',         updateLead)
router.post  ('/admin/upload',            upload.single('file'), uploadMedia)

export default router
