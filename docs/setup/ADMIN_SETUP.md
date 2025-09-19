# Admin Profile & Settings Setup

This guide will help you set up the admin profile and settings functionality for the Elevation AI CMS.

## 🚀 Quick Setup

### 1. Database Setup

Run the database schema to create the necessary tables:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema-admin-profiles.sql`
4. Execute the script

This will create:
- `admin_profiles` table for user profile information
- `site_settings` table for site configuration
- Default site settings

### 2. Features Added

#### Admin Profile Page (`/admin/profile`)
- **Display Name**: Set a personalized name that appears in the dashboard welcome message
- **First/Last Name**: Optional personal information
- **Avatar URL**: Optional profile picture URL
- **Auto-creation**: Profile is automatically created on first visit

#### Admin Settings Page (`/admin/settings`)
- **General Settings**: Site name and description
- **Admin Settings**: Primary admin email
- **System Settings**: Maintenance mode and upload limits
- **Real-time Updates**: Changes are saved immediately

#### Enhanced Navigation
- **Profile Icon**: Click the user icon in the top navigation to access your profile
- **Settings Link**: Access settings via the sidebar navigation
- **Personalized Dashboard**: Welcome message shows your display name

### 3. Database Schema

The setup creates two main tables:

#### `admin_profiles`
```sql
- id (UUID, Primary Key)
- user_id (UUID, References auth.users)
- display_name (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- avatar_url (TEXT)
- preferences (JSONB)
- created_at, updated_at (Timestamps)
```

#### `site_settings`
```sql
- id (UUID, Primary Key)
- key (VARCHAR, Unique)
- value (TEXT)
- description (TEXT)
- type (VARCHAR: string, boolean, number, json)
- created_at, updated_at (Timestamps)
```

### 4. Security

- **Row Level Security (RLS)** enabled on both tables
- **User Isolation**: Users can only access their own profile
- **Admin Access**: Authenticated users can manage site settings
- **Automatic Cleanup**: Profiles are deleted when users are removed

### 5. Usage

1. **First Login**: Your profile is automatically created
2. **Set Display Name**: Visit `/admin/profile` to set your name
3. **Configure Site**: Visit `/admin/settings` to manage site settings
4. **Personalized Experience**: Dashboard shows your name in the welcome message

## 🔧 Technical Details

### Components Created
- `src/app/admin/profile/page.tsx` - Profile management page
- `src/app/admin/settings/page.tsx` - Site settings page
- `database-schema-admin-profiles.sql` - Database schema

### Components Modified
- `src/components/admin/admin-header.tsx` - Added profile link
- `src/app/admin/page.tsx` - Added personalized welcome message

### Dependencies
- Uses existing Supabase client
- Leverages existing UI components (Card, Button, Input, etc.)
- No additional packages required

## 🎯 Next Steps

After setup, you can:
1. Customize the profile page with additional fields
2. Add more site settings as needed
3. Implement user roles and permissions
4. Add profile picture upload functionality
5. Create user management features

## 📝 Notes

- The system is designed to be simple and focused on essential functionality
- All changes are automatically saved to the database
- The profile system integrates seamlessly with Supabase Auth
- Settings are stored as key-value pairs for flexibility
