import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

const TEST_DB = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/hammad-portfolio-test'

beforeAll(async () => {
  await mongoose.connect(TEST_DB)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

/* ─── Health ──────────────────────────────────────────── */
describe('GET /health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

/* ─── About ───────────────────────────────────────────── */
describe('GET /api/about', () => {
  it('returns about data with default seed', async () => {
    const res = await request(app).get('/api/about')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data).toHaveProperty('name')
    expect(res.body.data.name).toBe('Hammad Ali Khan')
  })
})

/* ─── Projects ────────────────────────────────────────── */
describe('GET /api/projects', () => {
  it('returns empty array when no projects exist', async () => {
    const res = await request(app).get('/api/projects')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })
})

/* ─── Lead submission ─────────────────────────────────── */
describe('POST /api/leads', () => {
  it('accepts a valid lead submission', async () => {
    const res = await request(app).post('/api/leads').send({
      name:    'Test User',
      email:   'test@example.com',
      service: 'amazon-ppc',
      message: 'I need help with my Amazon ads.',
    })
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
  })

  it('rejects missing required fields', async () => {
    const res = await request(app).post('/api/leads').send({ name: 'Incomplete' })
    expect(res.status).toBe(500)
  })
})

/* ─── Auth ────────────────────────────────────────────── */
describe('POST /api/auth/login', () => {
  it('rejects invalid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email:    'fake@fake.com',
      password: 'wrongpassword',
    })
    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false)
  })
})

/* ─── Admin guard ─────────────────────────────────────── */
describe('Admin route protection', () => {
  it('returns 401 without JWT', async () => {
    const res = await request(app).get('/api/admin/leads')
    expect(res.status).toBe(401)
  })

  it('returns 401 with malformed JWT', async () => {
    const res = await request(app)
      .get('/api/admin/leads')
      .set('Authorization', 'Bearer fake.token.here')
    expect(res.status).toBe(401)
  })
})
