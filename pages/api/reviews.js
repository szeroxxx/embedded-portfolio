import { getReviews, createReview } from '../../lib/db'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Get all visible reviews (newest first).
      const reviews = await getReviews()
      return res.status(200).json(reviews)
    }

    if (req.method === 'POST') {
      // Create new review.
      const { project_name, client_name, rating, review_text, project_id } = req.body || {}

      if (!project_name || !client_name || !rating || !review_text) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const review = await createReview({
        project_name,
        client_name,
        rating: parseInt(rating),
        review_text,
        project_id: project_id || null,
      })

      return res.status(201).json(review)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error('reviews API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
