import { z } from 'zod'
import { ApiError } from '../utils/ApiError.js'

/**
 * validate(schema) — Express middleware factory
 * Validates req.body against a Zod schema.
 * Throws ApiError(422) on failure.
 */
export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const msg = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(', ')
    return next(new ApiError(422, `Validation error — ${msg}`))
  }
  req.body = result.data
  next()
}

/* ── Schemas ─────────────────────────────────────────────── */
export const leadSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  company: z.string().max(100).optional(),
  service: z.enum(['amazon-ppc','social-media','web-dev','logistics','other']).optional(),
  message: z.string().min(10).max(2000),
})

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(6),
})

export const projectSchema = z.object({
  title:            z.string().min(2).max(100),
  slug:             z.string().regex(/^[a-z0-9-]+$/),
  category:         z.enum(['ecommerce','logistics','saas','marketing','construction','other']).optional(),
  type:             z.enum(['live','source','case-study']).optional(),
  shortDescription: z.string().max(200).optional(),
  description:      z.string().optional(),
  techStack:        z.array(z.string()).optional(),
  liveUrl:          z.string().url().optional().or(z.literal('')),
  status:           z.enum(['published','draft','archived']).optional(),
  featured:         z.boolean().optional(),
  order:            z.number().optional(),
})
