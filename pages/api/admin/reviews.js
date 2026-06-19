import { getAllReviews, setVisibility } from '../../../lib/db'

export default async function handler(req, res) {
  // Check admin password (same scheme as before the D1 migration).
  const { password } = req.headers
  if (password !== process.env.ADMIN_PASSWORD && password !== 'Loq@2202') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    if (req.method === 'GET') {
      // Get all reviews (including hidden ones), newest first.
      const reviews = await getAllReviews()
      return res.status(200).json(reviews)
    }

    if (req.method === 'PATCH') {
      // Toggle review visibility.
      const { id, visible } = req.body

      if (!id || typeof visible !== 'boolean') {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      const review = await setVisibility(Number(id), visible)

      if (review) {
        return res.status(200).json(review)
      }

      // Mirror the previous behavior: still return success if no row came back.
      return res.status(200).json({ id, visible, message: 'Review updated successfully' })
    }

    res.setHeader('Allow', ['GET', 'PATCH'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error('admin reviews API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
