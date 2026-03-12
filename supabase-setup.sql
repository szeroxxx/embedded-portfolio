-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  project_id TEXT,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to visible reviews
CREATE POLICY "Allow public read access to visible reviews" ON reviews
  FOR SELECT USING (visible = true);

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON reviews
  FOR INSERT WITH CHECK (true);

-- Insert some sample reviews (optional - you can delete these later)
INSERT INTO reviews (project_name, client_name, rating, review_text) VALUES
('CRM System', 'John Smith', 5, 'Excellent work on the PCB design. The motor control system works flawlessly and the communication integration is seamless. Highly recommended!'),
('Bottle Sorter Robot', 'Sarah Johnson', 5, 'Outstanding embedded systems expertise. Delivered exactly what we needed on time and within budget. The automation works perfectly.'),
('Triggering Unit PCB', 'Mike Chen', 4, 'Great technical skills and attention to detail. The dual voltage system performs as expected. Professional communication throughout the project.');