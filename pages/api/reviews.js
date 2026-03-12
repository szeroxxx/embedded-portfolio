import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get all visible reviews
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('visible', true)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    // Create new review
    const { project_name, client_name, rating, review_text, project_id } = req.body

    if (!project_name || !client_name || !rating || !review_text) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          project_name,
          client_name,
          rating: parseInt(rating),
          review_text,
          project_id: project_id || null,
          visible: true
        }
      ])
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(201).json(data[0])
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}