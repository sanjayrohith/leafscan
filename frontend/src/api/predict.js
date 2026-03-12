import axios from 'axios'

/**
 * Base URL for the backend API, read from the VITE_API_URL environment variable.
 * Falls back to localhost:8000 if not set.
 */
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Send a leaf image to the backend /predict endpoint for disease classification.
 *
 * @param {File} imageFile - The image file selected/dropped by the user.
 * @returns {Promise<Object>} The prediction result from the API.
 */
export async function predictDisease(imageFile) {
  const formData = new FormData()
  formData.append('file', imageFile)

  const response = await axios.post(`${API_BASE}/predict`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000, // 30-second timeout for large images / slow networks
  })

  return response.data
}
