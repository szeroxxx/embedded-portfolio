import { createReview, getReviews } from '../../lib/db'

const clean = (value) => typeof value === 'string' ? value.trim() : ''

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  try {
    if (req.method === 'GET') return res.status(200).json(await getReviews())

    if (req.method === 'POST') {
      const projectName = clean(req.body?.project_name)
      const clientName = clean(req.body?.client_name)
      const reviewText = clean(req.body?.review_text)
      const rating = Number(req.body?.rating)

      if (!projectName || !clientName || !reviewText || !Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Complete every field and choose a rating from 1 to 5.' })
      }
      if (projectName.length > 120 || clientName.length > 80 || reviewText.length > 2000) {
        return res.status(400).json({ error: 'One or more fields are too long.' })
      }

      const review = await createReview({
        project_name: projectName,
        client_name: clientName,
        rating,
        review_text: reviewText,
        project_id: req.body?.project_id || null,
      })
      return res.status(201).json(review)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed.` })
  } catch (error) {
    console.error('reviews API error:', error)
    return res.status(502).json({ error: 'The review store could not be reached. Please try again.' })
  }
}
