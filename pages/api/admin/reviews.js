import { timingSafeEqual } from 'crypto'
import { deleteReview, getAllReviews, setVisibility } from '../../../lib/db'

function passwordsMatch(candidate, expected) {
  if (typeof candidate !== 'string' || typeof expected !== 'string') return false
  const candidateBuffer = Buffer.from(candidate)
  const expectedBuffer = Buffer.from(expected)
  return candidateBuffer.length === expectedBuffer.length
    && timingSafeEqual(candidateBuffer, expectedBuffer)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not configured')
    return res.status(503).json({ error: 'Review management is not configured.' })
  }

  if (!passwordsMatch(req.headers['x-admin-password'], adminPassword)) {
    return res.status(401).json({ error: 'Incorrect password.' })
  }

  try {
    if (req.method === 'GET') return res.status(200).json(await getAllReviews())

    if (req.method === 'PATCH') {
      const { id, visible } = req.body || {}
      const reviewId = Number(id)
      if (!Number.isInteger(reviewId) || reviewId <= 0 || typeof visible !== 'boolean') {
        return res.status(400).json({ error: 'A valid review ID and visibility are required.' })
      }
      const review = await setVisibility(reviewId, visible)
      return review
        ? res.status(200).json(review)
        : res.status(404).json({ error: 'Review not found.' })
    }

    if (req.method === 'DELETE') {
      const reviewId = Number(req.body?.id)
      if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({ error: 'A valid review ID is required.' })
      }
      const review = await deleteReview(reviewId)
      return review
        ? res.status(200).json(review)
        : res.status(404).json({ error: 'Review not found.' })
    }

    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
    return res.status(405).json({ error: `Method ${req.method} not allowed.` })
  } catch (error) {
    console.error('admin reviews API error:', error)
    return res.status(502).json({ error: 'The review store could not be reached. Please try again.' })
  }
}
