import { supabase } from '../../../lib/supabase'

export default async function handler(req, res) {
  console.log('Admin API called:', req.method, req.headers.password ? 'Password provided' : 'No password');
  
  // Check admin password
  const { password } = req.headers
  if (password !== process.env.ADMIN_PASSWORD && password !== 'Loq@2202') {
    console.log('Unauthorized access attempt');
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    console.log('Getting all reviews...');
    // Get all reviews (including hidden ones)
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message })
    }

    console.log('Found reviews:', data?.length || 0);
    return res.status(200).json(data)
  }

  if (req.method === 'PATCH') {
    console.log('Updating review visibility:', req.body);
    // Toggle review visibility
    const { id, visible } = req.body

    if (!id || typeof visible !== 'boolean') {
      console.log('Invalid request body:', req.body);
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const { data, error } = await supabase
      .from('reviews')
      .update({ visible })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).json({ error: error.message })
    }

    console.log('Updated review:', data?.[0]);
    return res.status(200).json(data[0])
  }

  res.setHeader('Allow', ['GET', 'PATCH'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}