-- Admin Todos Database Schema for Elevation AI CMS
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create todo_phase enum
CREATE TYPE todo_phase AS ENUM ('critical', 'high', 'medium', 'low');

-- Create todo_status enum
CREATE TYPE todo_status AS ENUM ('pending', 'in_progress', 'completed');

-- Create todo_priority enum
CREATE TYPE todo_priority AS ENUM ('urgent', 'high', 'medium', 'low');

-- Create todo_effort enum
CREATE TYPE todo_effort AS ENUM ('quick', 'medium', 'extensive');

-- Create admin_todos table
CREATE TABLE IF NOT EXISTS admin_todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  phase todo_phase NOT NULL DEFAULT 'medium',
  category VARCHAR(100) NOT NULL,
  status todo_status NOT NULL DEFAULT 'pending',
  priority todo_priority NOT NULL DEFAULT 'medium',
  estimated_effort todo_effort NOT NULL DEFAULT 'medium',
  tags TEXT[] DEFAULT '{}',
  dependencies UUID[] DEFAULT '{}',
  
  -- Metadata
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_todos_phase ON admin_todos(phase);
CREATE INDEX IF NOT EXISTS idx_admin_todos_status ON admin_todos(status);
CREATE INDEX IF NOT EXISTS idx_admin_todos_priority ON admin_todos(priority);
CREATE INDEX IF NOT EXISTS idx_admin_todos_category ON admin_todos(category);
CREATE INDEX IF NOT EXISTS idx_admin_todos_created_at ON admin_todos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_todos_assigned_to ON admin_todos(assigned_to);
CREATE INDEX IF NOT EXISTS idx_admin_todos_created_by ON admin_todos(created_by);

-- Enable Row Level Security
ALTER TABLE admin_todos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admin todos are viewable by authenticated users" ON admin_todos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin todos are manageable by authenticated users" ON admin_todos
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_todos_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    
    -- Set completed_at when status changes to completed
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        NEW.completed_at = NOW();
    END IF;
    
    -- Clear completed_at when status changes from completed
    IF NEW.status != 'completed' AND OLD.status = 'completed' THEN
        NEW.completed_at = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at and completed_at
DROP TRIGGER IF EXISTS update_admin_todos_updated_at ON admin_todos;
CREATE TRIGGER update_admin_todos_updated_at 
    BEFORE UPDATE ON admin_todos
    FOR EACH ROW EXECUTE FUNCTION update_admin_todos_updated_at();

-- Insert some default categories
INSERT INTO admin_todos (title, description, phase, category, status, priority, estimated_effort, tags) 
VALUES 
('Sample Todo Item', 'This is a sample todo item to demonstrate the system', 'medium', 'Sample Category', 'pending', 'medium', 'quick', ARRAY['sample', 'demo'])
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON admin_todos TO authenticated;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Admin todos database schema created successfully!';
    RAISE NOTICE 'Table: admin_todos with all necessary fields and constraints';
    RAISE NOTICE 'Enums: todo_phase, todo_status, todo_priority, todo_effort';
    RAISE NOTICE 'Ready for todo management!';
END $$;
