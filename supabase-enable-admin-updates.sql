-- This script enables UPDATE operations on the reviews table
-- Run this in your Supabase SQL editor to fix the visibility toggle issue

-- Drop existing UPDATE policy if it exists
DROP POLICY IF EXISTS "Allow updates to reviews" ON reviews;
DROP POLICY IF EXISTS "Allow all updates" ON reviews;

-- Create a new UPDATE policy that allows updates
-- This policy allows any authenticated request to update reviews
-- (Your admin password in the API acts as the real authentication)
CREATE POLICY "Allow updates to reviews" ON reviews
  FOR UPDATE USING (true) WITH CHECK (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check 
FROM pg_policies 
WHERE tablename = 'reviews';
