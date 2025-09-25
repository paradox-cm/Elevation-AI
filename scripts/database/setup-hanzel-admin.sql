-- Setup Admin Profile for hanzel@elevationai.com
-- Run this in your Supabase SQL Editor

-- First, let's check if the user exists in auth.users
-- You'll need to replace 'USER_ID_HERE' with the actual user ID from auth.users table
-- To find the user ID, run: SELECT id, email FROM auth.users WHERE email = 'hanzel@elevationai.com';

-- Create admin profile for hanzel@elevationai.com
-- Replace 'USER_ID_HERE' with the actual user ID from the query above
INSERT INTO admin_profiles (
  user_id,
  display_name,
  first_name,
  last_name,
  preferences
) VALUES (
  'd35336e7-b613-4d4b-b11a-f8360c9a121f', -- Replace with actual user ID
  'Hanzsel',
  'Hanzel',
  'Corella',
  '{"theme": "system", "notifications": true}'::jsonb
) ON CONFLICT (user_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  updated_at = NOW();

-- Verify the profile was created/updated
SELECT 
  ap.id,
  ap.display_name,
  ap.first_name,
  ap.last_name,
  au.email,
  ap.created_at,
  ap.updated_at
FROM admin_profiles ap
JOIN auth.users au ON ap.user_id = au.id
WHERE au.email = 'hanzel@elevationai.com';

-- Instructions for manual setup if needed:
-- 1. Go to Supabase Dashboard → Authentication → Users
-- 2. Find hanzel@elevationai.com and copy the user ID
-- 3. Replace 'USER_ID_HERE' in this script with the actual user ID
-- 4. Run the script again
