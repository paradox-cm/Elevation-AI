-- Admin Profiles Table for Elevation AI CMS
-- Run this in your Supabase SQL Editor

-- Create admin_profiles table
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  display_name VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create or replace the update_updated_at_column function (in case it already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for admin_profiles (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_profiles_updated_at') THEN
        CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON admin_profiles
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_profiles (only if they don't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_profiles' AND policyname = 'Users can view their own profile') THEN
        CREATE POLICY "Users can view their own profile" ON admin_profiles
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_profiles' AND policyname = 'Users can update their own profile') THEN
        CREATE POLICY "Users can update their own profile" ON admin_profiles
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'admin_profiles' AND policyname = 'Users can insert their own profile') THEN
        CREATE POLICY "Users can insert their own profile" ON admin_profiles
          FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Create site_settings table for basic CMS settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  type VARCHAR(50) DEFAULT 'string', -- string, boolean, number, json
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add type column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'site_settings' AND column_name = 'type') THEN
        ALTER TABLE site_settings ADD COLUMN type VARCHAR(50) DEFAULT 'string';
    END IF;
END $$;

-- Create trigger for site_settings (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_site_settings_updated_at') THEN
        CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable Row Level Security for site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for site_settings (admin only) - only if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Authenticated users can view site settings') THEN
        CREATE POLICY "Authenticated users can view site settings" ON site_settings
          FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Authenticated users can update site settings') THEN
        CREATE POLICY "Authenticated users can update site settings" ON site_settings
          FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Authenticated users can insert site settings') THEN
        CREATE POLICY "Authenticated users can insert site settings" ON site_settings
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
END $$;

-- Insert default site settings
INSERT INTO site_settings (key, value, description, type) VALUES
  ('site_name', 'Elevation AI', 'The name of the website', 'string'),
  ('site_description', 'Elevation AI - Intelligent Business Solutions', 'The description of the website', 'string'),
  ('admin_email', 'admin@elevationai.com', 'Primary admin email address', 'string'),
  ('maintenance_mode', 'false', 'Enable maintenance mode', 'boolean'),
  ('max_upload_size', '10485760', 'Maximum file upload size in bytes (10MB)', 'number')
ON CONFLICT (key) DO NOTHING;
