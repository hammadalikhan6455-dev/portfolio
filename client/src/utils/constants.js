export const APP_NAME    = 'Hammad Ali Khan Portfolio'
export const APP_URL     = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
export const API_URL     = import.meta.env.VITE_API_URL || '/api'

export const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact']

export const SERVICES = [
  { value: 'amazon-ppc',   label: 'Amazon PPC Management'    },
  { value: 'social-media', label: 'Social Media Growth'       },
  { value: 'web-dev',      label: 'Web / App Development'     },
  { value: 'logistics',    label: 'Logistics Brand Strategy'  },
  { value: 'other',        label: 'Other'                     },
]

export const PROJECT_CATEGORIES = ['ecommerce','logistics','saas','marketing','construction','other']
export const PROJECT_TYPES      = ['live','source','case-study']
export const PROJECT_STATUSES   = ['published','draft','archived']
export const EXPERIENCE_TYPES   = ['full-time','part-time','freelance','contract']
export const SCENES             = ['truck','amazon','tiktok','warpmill','factory']

export const LEAD_STATUSES = {
  new:      { label:'New',      color:'#22C55E' },
  read:     { label:'Read',     color:'#6366F1' },
  replied:  { label:'Replied',  color:'#22D3EE' },
  archived: { label:'Archived', color:'#475569' },
}

export const DESIGN_TOKENS = {
  bgBase:    '#07090F',
  bgSurface: '#0D1117',
  accent:    '#6366F1',
  cyan:      '#22D3EE',
  clay:      '#C084FC',
  amber:     '#FB923C',
  success:   '#22C55E',
}
