-- Add new section types for detailed solutions cards
-- Run this in your Supabase SQL Editor

-- First, add the new section types to the enum
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'industry_solutions_detailed';
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'stage_solutions_detailed';
ALTER TYPE section_type ADD VALUE IF NOT EXISTS 'solutions_carousel';

-- Note: PostgreSQL doesn't support removing enum values easily, so we keep the existing ones
-- The new types will be available for use in the CMS
