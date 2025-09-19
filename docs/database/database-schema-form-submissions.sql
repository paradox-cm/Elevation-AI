-- Form Submissions Database Schema for Elevation AI CMS
-- Run this in your Supabase SQL Editor

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL, -- contact, demo, consultation, newsletter, signup
  status VARCHAR(20) DEFAULT 'new', -- new, read, replied, archived
  priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high, urgent
  
  -- Contact Information
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  job_title VARCHAR(255),
  
  -- Form-specific data stored as JSONB
  form_data JSONB DEFAULT '{}',
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  referrer_url TEXT,
  page_url TEXT,
  
  -- Admin tracking
  assigned_to UUID REFERENCES auth.users(id),
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_priority ON form_submissions(priority);

-- Create or replace the update_updated_at_column function (in case it already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for form_submissions (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_form_submissions_updated_at') THEN
        CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON form_submissions
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for form_submissions (admin only)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'form_submissions' AND policyname = 'Authenticated users can view form submissions') THEN
        CREATE POLICY "Authenticated users can view form submissions" ON form_submissions
          FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'form_submissions' AND policyname = 'Authenticated users can update form submissions') THEN
        CREATE POLICY "Authenticated users can update form submissions" ON form_submissions
          FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'form_submissions' AND policyname = 'Authenticated users can insert form submissions') THEN
        CREATE POLICY "Authenticated users can insert form submissions" ON form_submissions
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'form_submissions' AND policyname = 'Authenticated users can delete form submissions') THEN
        CREATE POLICY "Authenticated users can delete form submissions" ON form_submissions
          FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Insert sample form submissions for testing (optional - remove in production)
INSERT INTO form_submissions (form_type, first_name, last_name, email, company, job_title, form_data, status, priority) VALUES
  ('contact', 'John', 'Doe', 'john.doe@example.com', 'Acme Corp', 'CEO', 
   '{"industry": "Technology", "companySize": "50-200", "inquiryType": "Partnership", "message": "Interested in exploring partnership opportunities", "newsletter": true}', 
   'new', 'high'),
  
  ('demo', 'Jane', 'Smith', 'jane.smith@techcorp.com', 'TechCorp', 'CTO', 
   '{"companySize": "200-500", "industry": "Finance", "useCase": "Looking to automate our financial reporting processes", "timeline": "3-6 months"}', 
   'read', 'medium'),
  
  ('consultation', 'Mike', 'Johnson', 'mike.j@familyoffice.com', 'Johnson Family Office', 'Managing Director', 
   '{"industry": "Family Office", "teamSize": [25], "operatingEntities": [5], "nonOperatingEntities": [15], "supportLevel": "Premium", "planType": "Enterprise"}', 
   'new', 'urgent'),
  
  ('newsletter', 'Sarah', 'Wilson', 'sarah.wilson@email.com', NULL, NULL, 
   '{"source": "footer", "interests": ["AI", "automation"]}', 
   'new', 'low')
ON CONFLICT DO NOTHING;
