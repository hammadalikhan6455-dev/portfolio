import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from '../utils/ApiError.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload a buffer or file path to Cloudinary.
 * @param {Buffer|string} source  - Buffer from multer or a file path string
 * @param {object}        options - Cloudinary upload options
 * @returns {Promise<{url:string, publicId:string}>}
 */
export const uploadToCloudinary = (source, options = {}) =>
  new Promise((resolve, reject) => {
    const defaults = { folder: 'hammad-portfolio', resource_type: 'auto' }
    const opts     = { ...defaults, ...options }

    if (Buffer.isBuffer(source)) {
      const stream = cloudinary.uploader.upload_stream(opts, (err, result) => {
        if (err) return reject(new ApiError(500, `Cloudinary upload failed: ${err.message}`))
        resolve({ url: result.secure_url, publicId: result.public_id })
      })
      stream.end(source)
    } else {
      cloudinary.uploader.upload(source, opts, (err, result) => {
        if (err) return reject(new ApiError(500, `Cloudinary upload failed: ${err.message}`))
        resolve({ url: result.secure_url, publicId: result.public_id })
      })
    }
  })

export const deleteFromCloudinary = (publicId) =>
  cloudinary.uploader.destroy(publicId)
