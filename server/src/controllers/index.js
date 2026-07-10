import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { About, Project, Experience, Skill, Lead, User } from '../models/index.js'
import { ApiResponse }          from '../utils/ApiResponse.js'
import { ApiError }             from '../utils/ApiError.js'
import { asyncHandler }         from '../utils/asyncHandler.js'
import { sendLeadNotification } from '../services/email.service.js'

/* AUTH */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new ApiError(401, 'Invalid credentials')
  const access  = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:'15m' })
  const refresh = jwt.sign({ id:user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn:'7d' })
  user.refreshToken = refresh; user.lastLogin = new Date(); await user.save()
  res.cookie('refresh_token', refresh, { httpOnly:true, secure:process.env.NODE_ENV==='production', sameSite:'lax', maxAge:7*24*60*60*1000 })
  res.json(new ApiResponse(200, { access, user }, 'Login successful'))
})
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refresh_token
  if (!token) throw new ApiError(401, 'No refresh token')
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
  const user = await User.findById(decoded.id)
  if (!user || user.refreshToken !== token) throw new ApiError(401, 'Invalid refresh token')
  const access = jwt.sign({ id:user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn:'15m' })
  res.json(new ApiResponse(200, { access }, 'Token refreshed'))
})
export const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) { user.refreshToken = null; await user.save() }
  res.clearCookie('refresh_token')
  res.json(new ApiResponse(200, null, 'Logged out'))
})

/* ABOUT */
export const getAbout = asyncHandler(async (_req, res) => {
  let about = await About.findOne()
  if (!about) about = await About.create({ name:'Hammad Ali Khan', headline:'Entrepreneur & Tech Founder | Amazon PPC & Digital Growth', bio:'I help Amazon sellers eliminate wasted ad spend and scale profitably.', location:'Multan, Punjab, Pakistan', email:'hammadalikhan6455@gmail.com', availability:'available', stats:[{label:'Monthly Ad Budget',value:'$50K',suffix:'/mo'},{label:'ACoS Reduction',value:'40%'},{label:'PPC Accounts',value:'15+'},{label:'First-Month Sales',value:'£10K+'}] })
  res.json(new ApiResponse(200, about))
})
export const updateAbout = asyncHandler(async (req, res) => {
  const about = await About.findOneAndUpdate({}, req.body, { new:true, upsert:true })
  res.json(new ApiResponse(200, about, 'About updated'))
})

/* PROJECTS */
export const getProjects = asyncHandler(async (req, res) => {
  const { status='published', category, featured } = req.query
  const filter = {}
  if (status) filter.status = status
  if (category) filter.category = category
  if (featured !== undefined) filter.featured = featured === 'true'
  const projects = await Project.find(filter).sort({ order:1, createdAt:-1 })
  res.json(new ApiResponse(200, projects))
})
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug:req.params.slug })
  if (!project) throw new ApiError(404, 'Project not found')
  res.json(new ApiResponse(200, project))
})
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body)
  res.status(201).json(new ApiResponse(201, project, 'Project created'))
})
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new:true })
  if (!project) throw new ApiError(404, 'Project not found')
  res.json(new ApiResponse(200, project, 'Project updated'))
})
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) throw new ApiError(404, 'Project not found')
  res.json(new ApiResponse(200, null, 'Project deleted'))
})

/* EXPERIENCE */
export const getExperiences = asyncHandler(async (_req, res) => {
  const list = await Experience.find().sort({ order:1, startDate:-1 })
  res.json(new ApiResponse(200, list))
})
export const createExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.create(req.body)
  res.status(201).json(new ApiResponse(201, exp, 'Experience created'))
})
export const updateExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new:true })
  if (!exp) throw new ApiError(404, 'Experience not found')
  res.json(new ApiResponse(200, exp, 'Experience updated'))
})
export const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findByIdAndDelete(req.params.id)
  if (!exp) throw new ApiError(404, 'Experience not found')
  res.json(new ApiResponse(200, null, 'Experience deleted'))
})

/* SKILLS */
export const getSkills = asyncHandler(async (_req, res) => {
  const skills = await Skill.find().sort({ order:1 })
  res.json(new ApiResponse(200, skills))
})
export const upsertSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body
  const results = await Promise.all(skills.map(s => Skill.findOneAndUpdate({ category:s.category }, s, { upsert:true, new:true })))
  res.json(new ApiResponse(200, results, 'Skills updated'))
})

/* LEADS */
export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create({ ...req.body, ip:req.ip })
  sendLeadNotification(lead).catch(() => {})
  res.status(201).json(new ApiResponse(201, { id:lead._id }, "Message received! I'll get back to you within 24 hours."))
})
export const getLeads = asyncHandler(async (req, res) => {
  const { status, page=1, limit=20 } = req.query
  const filter = status ? { status } : {}
  const [leads, total] = await Promise.all([Lead.find(filter).sort({ createdAt:-1 }).skip((page-1)*limit).limit(Number(limit)), Lead.countDocuments(filter)])
  res.json(new ApiResponse(200, { leads, total, page:Number(page), pages:Math.ceil(total/limit) }))
})
export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new:true })
  if (!lead) throw new ApiError(404, 'Lead not found')
  res.json(new ApiResponse(200, lead, 'Lead updated'))
})
