/**
 * Seed script — run once to create the admin user
 *
 * Usage:
 *   node src/scripts/seed.js
 *
 * Set ADMIN_EMAIL / ADMIN_PASSWORD env vars or edit defaults below.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt   from 'bcryptjs'
import { User, Project, Experience, Skill } from '../models/index.js'

const MONGO = process.env.MONGODB_URI || 'mongodb+srv://MY_Portfolio:demo123@cluster0.30yyakw.mongodb.net/?appName=Cluster0'
const EMAIL = process.env.ADMIN_EMAIL    || 'admin@hammad.dev'
const PASS  = process.env.ADMIN_PASSWORD || 'Admin@1234!'

/* ── Seed data ─────────────────────────────────────────── */
const PROJECTS_SEED = [
  { title:'Aqualift Store', slug:'aqualift-store', category:'ecommerce', type:'live', shortDescription:'E-commerce storefront with product catalog and checkout.', techStack:['Shopify','Tailwind CSS','Meta Ads'], liveUrl:'https://www.aqualift.store', featured:true, status:'published', order:1 },
  { title:'Deenhub',        slug:'deenhub',        category:'saas',      type:'live', shortDescription:'Islamic content platform with CMS.', techStack:['WordPress','SEO','Content Strategy'], liveUrl:'https://deenhub.info', featured:true, status:'published', order:2 },
  { title:'Sulaiman Enterprises', slug:'sulaiman-enterprises', category:'construction', type:'source', shortDescription:'Construction & interior design company website.', techStack:['Tailwind CSS','Vanilla JS','EmailJS'], featured:false, status:'published', order:3 },
  { title:'LoadEdge Dispatch', slug:'loadedge-dispatch', category:'logistics', type:'case-study', shortDescription:'Social media growth strategy for a US freight company.', techStack:['LinkedIn','Facebook Ads','Analytics'], featured:false, status:'published', order:4 },
]

const EXPERIENCES_SEED = [
  { company:'LoadEdge Dispatch & Logistics', role:'Social Media Manager', type:'freelance', location:'Remote', startDate:new Date('2026-01-01'), current:true,  description:'Managing digital presence for a US freight dispatching company.', tags:['LinkedIn','Content Strategy','Freight'], scene:'truck',    order:1 },
  { company:'Skillsrator',                   role:'Amazon PPC Specialist', type:'freelance', location:'Punjab, Pakistan', startDate:new Date('2025-01-01'), current:true, description:'Managing 15+ PPC accounts across US & UK with $50K/mo budgets.', tags:['SP/SB/SD','Bid Strategy','ROAS'], scene:'amazon',   order:2 },
  { company:'TikTok Shop',                   role:'Virtual Assistant',     type:'freelance', location:'Multan, Pakistan', startDate:new Date('2022-11-01'), current:true, description:'Full-service TikTok Shop VA — listings, orders, creator outreach.', tags:['TikTok Ads','Shop Management'], scene:'tiktok',   order:3 },
  { company:'WarpMill Technologies',         role:'SDO',                   type:'contract',  location:'Houston, Texas (Remote)', startDate:new Date('2025-11-01'), current:true, description:'Hotel management, inbound/outbound services, e-commerce ops.', tags:['Hotel Ops','E-Commerce'], scene:'warpmill', order:4 },
  { company:'JKSM – Pepsi Cola Bottlers Multan', role:'Production Supervisor', type:'full-time', location:'Multan, Pakistan', startDate:new Date('2019-04-01'), endDate:new Date('2024-05-01'), current:false, description:'Supervised production branch at one of Pakistans largest bottling ops.', tags:['Operations','Team Leadership'], scene:'factory', order:5 },
]

const SKILLS_SEED = [
  { category:'Amazon & E-Commerce', color:'#6366F1', order:1, items:[
    {name:'Amazon PPC',proficiency:95,highlighted:true},{name:'Sponsored Products',proficiency:95,highlighted:false},{name:'Sponsored Brands',proficiency:90,highlighted:false},{name:'Keyword Research',proficiency:92,highlighted:true},{name:'ACoS Optimisation',proficiency:90,highlighted:false},{name:'Private Label Launch',proficiency:88,highlighted:false},{name:'Shopify',proficiency:78,highlighted:false},
  ]},
  { category:'Social & Digital Marketing', color:'#22D3EE', order:2, items:[
    {name:'Meta Ads',proficiency:85,highlighted:true},{name:'TikTok Ads',proficiency:82,highlighted:false},{name:'TikTok Shop',proficiency:88,highlighted:false},{name:'LinkedIn Strategy',proficiency:80,highlighted:false},{name:'Content Creation',proficiency:85,highlighted:false},{name:'Lead Generation',proficiency:82,highlighted:false},
  ]},
  { category:'Tech & Development', color:'#C084FC', order:3, items:[
    {name:'React.js',proficiency:78,highlighted:true},{name:'Node.js',proficiency:75,highlighted:false},{name:'MongoDB',proficiency:72,highlighted:false},{name:'Tailwind CSS',proficiency:82,highlighted:false},{name:'REST APIs',proficiency:74,highlighted:false},
  ]},
  { category:'Operations & Management', color:'#FB923C', order:4, items:[
    {name:'Team Leadership',proficiency:88,highlighted:false},{name:'Process Optimisation',proficiency:85,highlighted:false},{name:'Quality Control',proficiency:84,highlighted:false},{name:'Budget Management',proficiency:82,highlighted:false},
  ]},
]

/* ── Run ────────────────────────────────────────────────── */
async function seed() {
  await mongoose.connect(MONGO)
  console.log('✅  Connected to MongoDB')

  // Admin user
  const exists = await User.findOne({ email: EMAIL })
  if (!exists) {
    const hashed = await bcrypt.hash(PASS, 12)
    await User.create({ username:'admin', email:EMAIL, password:hashed, role:'super-admin' })
    console.log(`✅  Admin created  →  ${EMAIL}  /  ${PASS}`)
  } else {
    console.log(`ℹ️   Admin already exists: ${EMAIL}`)
  }

  // Projects
  for (const p of PROJECTS_SEED) {
    await Project.findOneAndUpdate({ slug:p.slug }, p, { upsert:true })
  }
  console.log(`✅  ${PROJECTS_SEED.length} projects seeded`)

  // Experiences
  await Experience.deleteMany({})
  await Experience.insertMany(EXPERIENCES_SEED)
  console.log(`✅  ${EXPERIENCES_SEED.length} experience entries seeded`)

  // Skills
  for (const s of SKILLS_SEED) {
    await Skill.findOneAndUpdate({ category:s.category }, s, { upsert:true })
  }
  console.log(`✅  ${SKILLS_SEED.length} skill groups seeded`)

  await mongoose.connection.close()
  console.log('✅  Seed complete. Database connection closed.')
  process.exit(0)
}

seed().catch(err => { console.error('❌  Seed failed:', err); process.exit(1) })
