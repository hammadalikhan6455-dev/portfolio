import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const authenticate = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer '))
    throw new ApiError(401, 'No token provided')

  try {
    const token = authHeader.split(' ')[1]
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }
})

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user?.role))
    throw new ApiError(403, 'Access forbidden: insufficient role')
  next()
}
