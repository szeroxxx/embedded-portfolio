-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to visible reviews" ON reviews;
DROP POLICY IF EXISTS "Allow public insert" ON reviews;

-- Create more permissive policies for testing
CREATE POLICY "Allow public read access to visible reviews" ON reviews
  FOR SELECT USING (visible = true);

CREATE POLICY "Allow public insert" ON reviews
  FOR INSERT WITH CHECK (true);

-- Add policy for updates (this might be missing)
CREATE POLICY "Allow all updates" ON reviews
  FOR UPDATE USING (true) WITH CHECK (true);

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'reviews' AND table_schema = 'public';