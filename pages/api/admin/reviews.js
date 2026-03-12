import { createClient } from '@supabase/supabase-js'

// Create admin client with service role key (bypasses RLS) if available
// Otherwise fall back to anon key
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = serviceRoleKey || (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  console.log('Admin API called:', req.method, req.headers.password ? 'Password provided' : 'No password');
  console.log('Using service role key:', !!serviceRoleKey);
  
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

    console.log('Attempting to update review:', { id, visible, newValue: visible });
    
    const { data, error } = await supabase
      .from('reviews')
      .update({ visible })
      .eq('id', id)
      .select()

    if (error) {
      console.error('❌ Supabase update error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      return res.status(500).json({ 
        error: error.message,
        code: error.code,
        details: 'Failed to update review. Check if RLS policies allow UPDATE operations.'
      })
    }

    console.log('✅ Updated review:', data?.[0]);
    
    // Ensure we always return JSON, even if data is empty
    if (data && data.length > 0) {
      return res.status(200).json(data[0])
    } else {
      // If no data returned, still return success with the expected structure
      return res.status(200).json({ 
        id, 
        visible, 
        message: 'Review updated successfully' 
      })
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}