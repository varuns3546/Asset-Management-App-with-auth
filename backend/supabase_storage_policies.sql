-- Supabase Storage RLS Policies for Asset Management App
-- Run this in your Supabase SQL Editor

-- Enable RLS on the storage.objects table (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to upload files to their own folder
CREATE POLICY "Users can upload files to their own folder" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'uploads' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to view files in their own folder
CREATE POLICY "Users can view files in their own folder" ON storage.objects
FOR SELECT USING (
  bucket_id = 'uploads' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to update files in their own folder
CREATE POLICY "Users can update files in their own folder" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'uploads' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy to allow users to delete files in their own folder
CREATE POLICY "Users can delete files in their own folder" ON storage.objects
FOR DELETE USING (
  bucket_id = 'uploads' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Optional: Policy to allow public read access to uploaded files (if you want files to be publicly accessible)
-- CREATE POLICY "Public read access to uploaded files" ON storage.objects
-- FOR SELECT USING (bucket_id = 'uploads');

-- Note: Make sure you have created a storage bucket named 'uploads' in your Supabase dashboard
-- Go to Storage > Create a new bucket > Name it 'uploads' > Set it to private; 