import mongoose from 'mongoose'
const { Schema, model } = mongoose

/* ─── About (Singleton) ───────────────────────────────── */
const AboutSchema = new Schema({
  name:         { type: String, required: true, default: 'Hammad Ali Khan' },
  headline:     { type: String, required: true },
  bio:          { type: String, required: true },
  avatar:       { type: String },
  location:     { type: String, default: 'Multan, Punjab, Pakistan' },
  email:        { type: String },
  linkedin:     { type: String },
  availability: { type: String, enum: ['available', 'busy', 'unavailable'], default: 'available' },
  resumeUrl:    { type: String },
  stats: [{
    label:  { type: String },
    value:  { type: String },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
  }],
}, { timestamps: true })

/* ─── Project ─────────────────────────────────────────── */
const ProjectSchema = new Schema({
  title:            { type: String, required: true },
  slug:             { type: String, required: true, unique: true },
  category:         { type: String, enum: ['ecommerce','logistics','saas','marketing','construction','other'], default: 'other' },
  type:             { type: String, enum: ['live','source','case-study'], default: 'live' },
  shortDescription: { type: String, maxlength: 200 },
  description:      { type: String },
  thumbnail:        { type: String },
  images:           [String],
  techStack:        [String],
  liveUrl:          { type: String },
  sourceCode:       { type: String },
  featured:         { type: Boolean, default: false },
  metrics: {
    visitors:       Number,
    conversionRate: Number,
    revenue:        String,
    custom: [{ label: String, value: String }],
  },
  status: { type: String, enum: ['published','draft','archived'], default: 'draft' },
  order:  { type: Number, default: 0 },
}, { timestamps: true })

/* ─── Experience ──────────────────────────────────────── */
const ExperienceSchema = new Schema({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  type:        { type: String, enum: ['full-time','part-time','freelance','contract'] },
  location:    { type: String },
  startDate:   { type: Date, required: true },
  endDate:     { type: Date },
  current:     { type: Boolean, default: false },
  description: { type: String },
  bullets:     [String],
  achievements:[{ metric: String, description: String }],
  logo:        { type: String },
  tags:        [String],
  scene:       { type: String, enum: ['truck','amazon','tiktok','warpmill','factory'], default: 'truck' },
  order:       { type: Number, default: 0 },
}, { timestamps: true })

/* ─── Skill ───────────────────────────────────────────── */
const SkillSchema = new Schema({
  category: { type: String, required: true },
  items: [{
    name:        String,
    proficiency: { type: Number, min: 0, max: 100 },
    icon:        String,
    highlighted: { type: Boolean, default: false },
  }],
  color:   { type: String, default: '#6366F1' },
  order:   { type: Number, default: 0 },
})

/* ─── Lead (Contact Form) ─────────────────────────────── */
const LeadSchema = new Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  company: String,
  budget:  String,
  service: { type: String, enum: ['amazon-ppc','social-media','web-dev','logistics','other'], default: 'other' },
  message: { type: String, required: true },
  status:  { type: String, enum: ['new','read','replied','archived'], default: 'new' },
  ip:      String,
}, { timestamps: true })

/* ─── User (Admin Auth) ───────────────────────────────── */
const UserSchema = new Schema({
  username:     { type: String, required: true, unique: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  role:         { type: String, enum: ['admin','super-admin'], default: 'admin' },
  refreshToken: String,
  lastLogin:    Date,
}, { timestamps: true })

/* Mask password in JSON responses */
UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  delete obj.refreshToken
  return obj
}

export const About      = model('About',      AboutSchema)
export const Project    = model('Project',    ProjectSchema)
export const Experience = model('Experience', ExperienceSchema)
export const Skill      = model('Skill',      SkillSchema)
export const Lead       = model('Lead',       LeadSchema)
export const User       = model('User',       UserSchema)
