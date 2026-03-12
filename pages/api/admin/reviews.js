import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  // Check admin password
  const { password } = req.headers
  if (password !== process.env.ADMIN_PASSWORD && password !== 'Loq@2202') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    // Get all reviews (including hidden ones)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  if (req.method === 'PATCH') {
    // Toggle review visibility
    const { id, visible } = req.body

    const { data, error } = await supabase
      .from('reviews')
      .update({ visible })
      .eq('id', id)
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data[0])
  }

  res.setHeader('Allow', ['GET', 'PATCH'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}