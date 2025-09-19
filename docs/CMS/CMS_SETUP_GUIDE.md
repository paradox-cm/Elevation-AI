# Elevation AI CMS Setup Guide

## 🚀 Quick Start

### 1. Supabase Project Setup

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in with: simplemedia@gmail.com
   - Find your "Elevation AI" project

2. **Get Your Project Credentials**
   - Go to Settings → API
   - Copy your Project URL and anon key
   - Update your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

3. **Run the Database Schema**
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `database-schema.sql`
   - Paste and run the SQL script
   - This will create all necessary tables and initial data

4. **Set up Storage Bucket**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called "media"
   - Set it to public
   - This will store uploaded images and files

### 2. Environment Configuration

Create a `.env.local` file in your project root with your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Install Dependencies

The required packages are already installed, but if you need to reinstall:

```bash
npm install @supabase/supabase-js @supabase/ssr @supabase/auth-ui-react @supabase/auth-ui-shared
```

### 4. Create Admin User

1. **Go to Authentication in Supabase Dashboard**
2. **Add a new user manually:**
   - Email: admin@elevationai.com (or your preferred email)
   - Password: Create a strong password
   - Confirm the user

3. **Update the database schema** to use your admin user ID:
   - Go to SQL Editor
   - Run this query to update the created_by fields:

```sql
-- Replace 'your-admin-user-id' with the actual user ID from the auth.users table
UPDATE pages SET created_by = 'your-admin-user-id' WHERE created_by IS NULL;
UPDATE site_settings SET updated_by = 'your-admin-user-id' WHERE updated_by IS NULL;
```

## 🎯 What's Been Created

### Admin Interface (`/admin`)
- **Dashboard**: Overview of content statistics
- **Pages**: Manage website pages and sections
- **FAQs**: Manage FAQ categories and questions
- **Blog**: Manage blog posts and categories
- **Media**: Upload and manage images/files

### Database Schema
- **pages**: Website pages (home, platform, about, etc.)
- **page_sections**: Individual content sections per page
- **faq_categories**: FAQ category management
- **faqs**: Individual FAQ items
- **blog_posts**: Blog post content
- **blog_categories**: Blog categorization
- **media**: File uploads and metadata
- **site_settings**: Global site configuration

### TypeScript Types
- Complete type definitions in `src/types/cms.ts`
- Database types with proper relationships
- Helper types for easier development

## 🔧 Next Steps

### Phase 1: Test the Admin Interface
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/admin`
3. Login with your admin credentials
4. Test creating, editing, and deleting content

### Phase 2: Connect Frontend to CMS
1. Create dynamic content components
2. Refactor existing pages to use CMS data
3. Implement real-time updates

### Phase 3: Advanced Features
1. Image upload for blog posts
2. Content validation and error handling
3. SEO optimization for dynamic content

## 📁 File Structure

```
src/
├── app/admin/                 # Admin interface
│   ├── layout.tsx            # Admin layout with auth
│   ├── login/page.tsx        # Login page
│   ├── page.tsx              # Dashboard
│   ├── pages/page.tsx        # Pages management
│   ├── faqs/page.tsx         # FAQ management
│   ├── blog/page.tsx         # Blog management
│   └── media/page.tsx        # Media management
├── components/admin/          # Admin components
│   ├── admin-sidebar.tsx     # Navigation sidebar
│   ├── admin-header.tsx      # Top header
│   └── admin-loading-spinner.tsx
├── lib/supabase/             # Supabase configuration
│   ├── client.ts             # Client-side Supabase
│   ├── server.ts             # Server-side Supabase
│   └── middleware.ts         # Auth middleware
├── types/cms.ts              # TypeScript types
└── middleware.ts             # Next.js middleware
```

## 🚨 Important Notes

1. **Authentication**: The admin interface requires authentication. Make sure to create an admin user in Supabase.

2. **Row Level Security**: All tables have RLS enabled. Public users can only read published content, while authenticated users have full access.

3. **File Uploads**: Media files are stored in Supabase Storage. Make sure the "media" bucket is created and set to public.

4. **Environment Variables**: Never commit your `.env.local` file. The example shows the structure you need.

5. **Database Schema**: The initial schema includes sample data for all pages and FAQ categories based on your current website.

## 🔍 Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Check your `.env.local` file has the correct Supabase URL and keys
   - Make sure there are no extra spaces or quotes

2. **"User not found" error**
   - Create an admin user in Supabase Authentication
   - Update the database records to use your admin user ID

3. **"Bucket not found" error**
   - Create a "media" bucket in Supabase Storage
   - Set it to public access

4. **Database connection issues**
   - Verify your Supabase project is active
   - Check that the database schema was run successfully

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase project settings
3. Ensure all environment variables are set correctly
4. Check that the database schema was applied successfully

The CMS is now ready for content management! 🎉
