import multer from 'multer'
import { uploadToCloudinary } from '../services/upload.service.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError }    from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg','image/png','image/webp','image/gif','application/pdf']
    if (allowed.includes(file.mimetype)) cb(null, true)
    else cb(new ApiError(400, 'Unsupported file type'))
  },
})

export const uploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file provided')
  const { url, publicId } = await uploadToCloudinary(req.file.buffer, {
    folder: 'hammad-portfolio',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  res.json(new ApiResponse(200, { url, publicId }, 'File uploaded'))
})
