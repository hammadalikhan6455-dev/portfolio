import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler.js'
import { logger } from './middleware/logger.js'
import indexRouter from './routes/index.js'

const app = express()

/* ─── Security & Parsing ─────────────────────────────── */
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

/* ─── Logging ─────────────────────────────────────────── */
app.use(morgan('combined', {
  stream: { write: (msg) => logger.http(msg.trim()) }
}))

/* ─── Routes ──────────────────────────────────────────── */
app.use('/api', indexRouter)

/* ─── Health Check ────────────────────────────────────── */
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }))

/* ─── 404 ─────────────────────────────────────────────── */
app.use((_req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

/* ─── Global Error Handler ────────────────────────────── */
app.use(errorHandler)

export default app
