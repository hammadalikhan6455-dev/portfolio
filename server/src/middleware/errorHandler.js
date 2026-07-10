import { logger } from './logger.js'

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message    = err.message    || 'Internal Server Error'

  logger.error(`[${req.method}] ${req.originalUrl} → ${statusCode}: ${message}`, {
    stack: err.stack,
    body:  req.body,
  })

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
