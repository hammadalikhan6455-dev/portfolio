import mongoose from 'mongoose'
import { logger } from '../middleware/logger.js'

const MAX_RETRIES = 5
const RETRY_MS    = 5000

export async function connectDB(uri, retries = 0) {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS:          45000,
    })
    logger.info(`MongoDB connected → ${uri.replace(/\/\/.*@/, '//***@')}`)

    mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))
    mongoose.connection.on('error',  (err) => logger.error('MongoDB error', err))
    mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'))
  } catch (err) {
    if (retries < MAX_RETRIES) {
      logger.warn(`MongoDB connection failed. Retrying in ${RETRY_MS / 1000}s… (${retries + 1}/${MAX_RETRIES})`)
      await new Promise(r => setTimeout(r, RETRY_MS))
      return connectDB(uri, retries + 1)
    }
    logger.error('MongoDB connection failed after max retries', err)
    process.exit(1)
  }
}
