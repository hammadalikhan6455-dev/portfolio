import 'dotenv/config'
import http from 'http'
import { connectDB } from './src/config/database.js'
import app           from './src/app.js'
import { logger }    from './src/middleware/logger.js'

const PORT  = process.env.PORT        || 5000
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/hammad-portfolio'

async function start() {
  await connectDB(MONGO)

  const server = http.createServer(app)
  server.listen(PORT, () => logger.info(`🚀  Server → http://localhost:${PORT}`))

  const shutdown = async (sig) => {
    logger.info(`${sig} received — shutting down`)
    server.close(async () => {
      const mongoose = (await import('mongoose')).default
      await mongoose.connection.close()
      logger.info('MongoDB closed')
      process.exit(0)
    })
  }
  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))
}

start()
