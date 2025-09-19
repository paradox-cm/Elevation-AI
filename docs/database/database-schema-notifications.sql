-- Notifications Database Schema for Elevation AI CMS
-- Run this in your Supabase SQL Editor

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- form_submission, system, alert, info
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}', -- Additional data for the notification
  
  -- Notification status
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high, urgent
  
  -- Related entities
  related_type VARCHAR(50), -- form_submission, page, blog_post, etc.
  related_id UUID, -- ID of the related entity
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);

-- Create or replace the update_updated_at_column function (in case it already exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for notifications (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_notifications_updated_at') THEN
        CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications (users can only see their own notifications)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can view their own notifications') THEN
        CREATE POLICY "Users can view their own notifications" ON notifications
          FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can update their own notifications') THEN
        CREATE POLICY "Users can update their own notifications" ON notifications
          FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'System can insert notifications') THEN
        CREATE POLICY "System can insert notifications" ON notifications
          FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'notifications' AND policyname = 'Users can delete their own notifications') THEN
        CREATE POLICY "Users can delete their own notifications" ON notifications
          FOR DELETE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Function to create form submission notifications
CREATE OR REPLACE FUNCTION create_form_submission_notification()
RETURNS TRIGGER AS $$
BEGIN
    -- Create notification for all admin users when a new form submission is created
    INSERT INTO notifications (user_id, type, title, message, data, priority, related_type, related_id)
    SELECT 
        u.id,
        'form_submission',
        'New ' || NEW.form_type || ' submission',
        CASE 
            WHEN NEW.form_type = 'contact' THEN 'New contact form submission from ' || COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
            WHEN NEW.form_type = 'demo' THEN 'New demo request from ' || COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
            WHEN NEW.form_type = 'consultation' THEN 'New consultation request from ' || COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
            WHEN NEW.form_type = 'newsletter' THEN 'New newsletter signup from ' || NEW.email
            WHEN NEW.form_type = 'signup' THEN 'New user signup from ' || COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
            ELSE 'New ' || NEW.form_type || ' submission from ' || COALESCE(NEW.first_name || ' ' || NEW.last_name, NEW.email)
        END,
        jsonb_build_object(
            'form_type', NEW.form_type,
            'submission_id', NEW.id,
            'email', NEW.email,
            'company', NEW.company,
            'priority', NEW.priority
        ),
        CASE 
            WHEN NEW.priority = 'urgent' THEN 'urgent'
            WHEN NEW.priority = 'high' THEN 'high'
            ELSE 'medium'
        END,
        'form_submission',
        NEW.id
    FROM auth.users u
    WHERE u.id IS NOT NULL; -- All authenticated users (admins)
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create notifications for form submissions
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_form_submission_notification') THEN
        CREATE TRIGGER trigger_form_submission_notification
            AFTER INSERT ON form_submissions
            FOR EACH ROW
            EXECUTE FUNCTION create_form_submission_notification();
    END IF;
END $$;

-- Insert sample notifications for testing (optional - remove in production)
INSERT INTO notifications (user_id, type, title, message, data, priority, related_type, related_id) 
SELECT 
    u.id,
    'form_submission',
    'New contact submission',
    'New contact form submission from John Doe (john.doe@example.com)',
    '{"form_type": "contact", "email": "john.doe@example.com", "company": "Acme Corp", "priority": "high"}',
    'high',
    'form_submission',
    '00000000-0000-0000-0000-000000000001'::uuid
FROM auth.users u
WHERE u.id IS NOT NULL
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO notifications (user_id, type, title, message, data, priority, related_type, related_id) 
SELECT 
    u.id,
    'form_submission',
    'New demo request',
    'New demo request from Jane Smith (jane.smith@techcorp.com)',
    '{"form_type": "demo", "email": "jane.smith@techcorp.com", "company": "TechCorp", "priority": "medium"}',
    'medium',
    'form_submission',
    '00000000-0000-0000-0000-000000000002'::uuid
FROM auth.users u
WHERE u.id IS NOT NULL
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO notifications (user_id, type, title, message, data, priority, related_type, related_id) 
SELECT 
    u.id,
    'system',
    'System Update',
    'The CMS has been updated with new features including form submissions management.',
    '{"version": "1.2.0", "features": ["form_submissions", "notifications"]}',
    'low',
    'system',
    NULL
FROM auth.users u
WHERE u.id IS NOT NULL
LIMIT 1
ON CONFLICT DO NOTHING;
