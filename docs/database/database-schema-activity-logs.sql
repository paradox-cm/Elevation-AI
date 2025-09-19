-- Activity Logs Database Schema for Elevation AI CMS
-- Run this in your Supabase SQL Editor

-- Create activity_logs table to track all CMS activities
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Activity details
  action VARCHAR(50) NOT NULL, -- create, update, delete, publish, unpublish, login, logout
  entity_type VARCHAR(50) NOT NULL, -- page, page_section, blog_post, blog_category, faq, faq_category, media, site_setting, user
  entity_id UUID, -- ID of the affected entity (nullable for some actions like login)
  entity_title VARCHAR(255), -- Human-readable title/name of the entity
  
  -- User information
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name VARCHAR(255), -- Cached user name for display
  
  -- Activity description
  description TEXT NOT NULL, -- Human-readable description of what happened
  details JSONB DEFAULT '{}', -- Additional structured data about the activity
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_id ON activity_logs(entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- Create a function to log activities
CREATE OR REPLACE FUNCTION log_activity(
  p_action VARCHAR(50),
  p_entity_type VARCHAR(50),
  p_entity_id UUID DEFAULT NULL,
  p_entity_title VARCHAR(255) DEFAULT NULL,
  p_description TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  v_user_id UUID;
  v_user_name VARCHAR(255);
  v_activity_id UUID;
BEGIN
  -- Get current user
  v_user_id := auth.uid();
  
  -- Get user name from admin_profiles if available
  SELECT display_name INTO v_user_name
  FROM admin_profiles
  WHERE user_id = v_user_id;
  
  -- If no display name, use email from auth.users
  IF v_user_name IS NULL THEN
    SELECT email INTO v_user_name
    FROM auth.users
    WHERE id = v_user_id;
  END IF;
  
  -- Insert activity log
  INSERT INTO activity_logs (
    action,
    entity_type,
    entity_id,
    entity_title,
    user_id,
    user_name,
    description,
    details
  ) VALUES (
    p_action,
    p_entity_type,
    p_entity_id,
    p_entity_title,
    v_user_id,
    v_user_name,
    COALESCE(p_description, p_action || ' ' || p_entity_type || CASE WHEN p_entity_title IS NOT NULL THEN ': ' || p_entity_title ELSE '' END),
    p_details
  ) RETURNING id INTO v_activity_id;
  
  RETURN v_activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to automatically log activities for key tables

-- Pages table triggers
CREATE OR REPLACE FUNCTION log_page_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_activity(
      'create',
      'page',
      NEW.id,
      NEW.title,
      'Created new page: ' || NEW.title,
      jsonb_build_object('slug', NEW.slug, 'is_published', NEW.is_published)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    -- Log significant changes
    IF OLD.title != NEW.title THEN
      PERFORM log_activity(
        'update',
        'page',
        NEW.id,
        NEW.title,
        'Updated page title from "' || OLD.title || '" to "' || NEW.title || '"',
        jsonb_build_object('old_title', OLD.title, 'new_title', NEW.title)
      );
    END IF;
    
    IF OLD.is_published != NEW.is_published THEN
      PERFORM log_activity(
        CASE WHEN NEW.is_published THEN 'publish' ELSE 'unpublish' END,
        'page',
        NEW.id,
        NEW.title,
        CASE WHEN NEW.is_published THEN 'Published page: ' || NEW.title ELSE 'Unpublished page: ' || NEW.title END,
        jsonb_build_object('slug', NEW.slug)
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_activity(
      'delete',
      'page',
      OLD.id,
      OLD.title,
      'Deleted page: ' || OLD.title,
      jsonb_build_object('slug', OLD.slug)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for pages
DROP TRIGGER IF EXISTS trigger_log_page_activity ON pages;
CREATE TRIGGER trigger_log_page_activity
  AFTER INSERT OR UPDATE OR DELETE ON pages
  FOR EACH ROW EXECUTE FUNCTION log_page_activity();

-- Blog posts table triggers
CREATE OR REPLACE FUNCTION log_blog_post_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_activity(
      'create',
      'blog_post',
      NEW.id,
      NEW.title,
      'Created new blog post: ' || NEW.title,
      jsonb_build_object('slug', NEW.slug, 'is_published', NEW.is_published)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.title != NEW.title THEN
      PERFORM log_activity(
        'update',
        'blog_post',
        NEW.id,
        NEW.title,
        'Updated blog post title from "' || OLD.title || '" to "' || NEW.title || '"',
        jsonb_build_object('old_title', OLD.title, 'new_title', NEW.title)
      );
    END IF;
    
    IF OLD.is_published != NEW.is_published THEN
      PERFORM log_activity(
        CASE WHEN NEW.is_published THEN 'publish' ELSE 'unpublish' END,
        'blog_post',
        NEW.id,
        NEW.title,
        CASE WHEN NEW.is_published THEN 'Published blog post: ' || NEW.title ELSE 'Unpublished blog post: ' || NEW.title END,
        jsonb_build_object('slug', NEW.slug)
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_activity(
      'delete',
      'blog_post',
      OLD.id,
      OLD.title,
      'Deleted blog post: ' || OLD.title,
      jsonb_build_object('slug', OLD.slug)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for blog_posts
DROP TRIGGER IF EXISTS trigger_log_blog_post_activity ON blog_posts;
CREATE TRIGGER trigger_log_blog_post_activity
  AFTER INSERT OR UPDATE OR DELETE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION log_blog_post_activity();

-- FAQs table triggers
CREATE OR REPLACE FUNCTION log_faq_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_activity(
      'create',
      'faq',
      NEW.id,
      NEW.question,
      'Created new FAQ: ' || LEFT(NEW.question, 50) || '...',
      jsonb_build_object('category_id', NEW.category_id, 'is_published', NEW.is_published)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.question != NEW.question THEN
      PERFORM log_activity(
        'update',
        'faq',
        NEW.id,
        NEW.question,
        'Updated FAQ question',
        jsonb_build_object('old_question', OLD.question, 'new_question', NEW.question)
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_activity(
      'delete',
      'faq',
      OLD.id,
      OLD.question,
      'Deleted FAQ: ' || LEFT(OLD.question, 50) || '...',
      jsonb_build_object('category_id', OLD.category_id)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for faqs
DROP TRIGGER IF EXISTS trigger_log_faq_activity ON faqs;
CREATE TRIGGER trigger_log_faq_activity
  AFTER INSERT OR UPDATE OR DELETE ON faqs
  FOR EACH ROW EXECUTE FUNCTION log_faq_activity();

-- FAQ Categories table triggers
CREATE OR REPLACE FUNCTION log_faq_category_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_activity(
      'create',
      'faq_category',
      NEW.id,
      NEW.title,
      'Created new FAQ category: ' || NEW.title,
      jsonb_build_object('icon', NEW.icon, 'is_published', NEW.is_published)
    );
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.title != NEW.title THEN
      PERFORM log_activity(
        'update',
        'faq_category',
        NEW.id,
        NEW.title,
        'Updated FAQ category title from "' || OLD.title || '" to "' || NEW.title || '"',
        jsonb_build_object('old_title', OLD.title, 'new_title', NEW.title)
      );
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_activity(
      'delete',
      'faq_category',
      OLD.id,
      OLD.title,
      'Deleted FAQ category: ' || OLD.title,
      jsonb_build_object('icon', OLD.icon)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for faq_categories
DROP TRIGGER IF EXISTS trigger_log_faq_category_activity ON faq_categories;
CREATE TRIGGER trigger_log_faq_category_activity
  AFTER INSERT OR UPDATE OR DELETE ON faq_categories
  FOR EACH ROW EXECUTE FUNCTION log_faq_category_activity();

-- Media table triggers
CREATE OR REPLACE FUNCTION log_media_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM log_activity(
      'create',
      'media',
      NEW.id,
      NEW.original_filename,
      'Uploaded new file: ' || NEW.original_filename,
      jsonb_build_object('mime_type', NEW.mime_type, 'size', NEW.size)
    );
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM log_activity(
      'delete',
      'media',
      OLD.id,
      OLD.original_filename,
      'Deleted file: ' || OLD.original_filename,
      jsonb_build_object('mime_type', OLD.mime_type, 'size', OLD.size)
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for media
DROP TRIGGER IF EXISTS trigger_log_media_activity ON media;
CREATE TRIGGER trigger_log_media_activity
  AFTER INSERT OR DELETE ON media
  FOR EACH ROW EXECUTE FUNCTION log_media_activity();

-- Enable Row Level Security
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view activity logs" ON activity_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert activity logs" ON activity_logs
  FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT ON activity_logs TO authenticated;
GRANT INSERT ON activity_logs TO authenticated;
