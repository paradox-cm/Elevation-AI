# Notifications System Setup

This guide covers the complete notifications system for the Elevation AI CMS admin panel.

## 🚀 Quick Setup

### 1. Database Setup

Run the database schema to create the notifications system:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `database-schema-notifications.sql`
4. Execute the script

This will create:
- `notifications` table for storing all notifications
- Automatic triggers for form submission notifications
- Row Level Security (RLS) policies
- Sample notifications for testing

### 2. Features Overview

#### Notifications Dropdown (`/admin` header)
- **Real-time Badge**: Shows unread notification count
- **Quick Preview**: See recent notifications without leaving the page
- **Mark as Read**: Click to mark individual notifications as read
- **Quick Actions**: Direct links to related content
- **Mark All Read**: Bulk action for all notifications

#### Notifications Page (`/admin/notifications`)
- **Complete View**: All notifications in one place
- **Advanced Filtering**: Filter by status, type, priority, and search
- **Status Management**: Mark as read, archive, or delete
- **Detailed Information**: Full notification content and metadata
- **Bulk Actions**: Mark all as read, archive multiple notifications

#### Automatic Notifications
- **Form Submissions**: Automatically created when forms are submitted
- **System Updates**: Manual system notifications
- **Priority Levels**: Low, Medium, High, Urgent
- **User-Specific**: Each admin user sees their own notifications

## 📊 Database Schema

### `notifications` Table Structure

```sql
- id (UUID, Primary Key)
- user_id (UUID, References auth.users)
- type (VARCHAR) - form_submission, system, alert, info
- title (VARCHAR) - Notification title
- message (TEXT) - Notification content
- data (JSONB) - Additional notification data

-- Status & Priority
- is_read (BOOLEAN) - Read status
- is_archived (BOOLEAN) - Archive status
- priority (VARCHAR) - low, medium, high, urgent

-- Related Entities
- related_type (VARCHAR) - form_submission, page, blog_post, etc.
- related_id (UUID) - ID of the related entity

-- Timestamps
- created_at, updated_at (TIMESTAMP)
- read_at (TIMESTAMP, Optional)
```

### Automatic Triggers

The system includes a PostgreSQL trigger that automatically creates notifications when form submissions are received:

```sql
-- Trigger function creates notifications for all admin users
-- when new form submissions are inserted
CREATE TRIGGER trigger_form_submission_notification
    AFTER INSERT ON form_submissions
    FOR EACH ROW
    EXECUTE FUNCTION create_form_submission_notification();
```

## 🔔 Notification Types

### Form Submission Notifications
- **Contact Form**: "New contact form submission from [Name] ([Email])"
- **Demo Request**: "New demo request from [Name] ([Email])"
- **Consultation**: "New consultation request from [Name] ([Email])"
- **Newsletter**: "New newsletter signup from [Email]"
- **Sign Up**: "New user signup from [Name] ([Email])"

### System Notifications
- **Updates**: System updates and new features
- **Alerts**: Important system alerts
- **Information**: General information and announcements

## 🎯 Admin Interface Features

### Notifications Dropdown
- **Badge Count**: Red badge showing unread count (max 9+)
- **Recent Notifications**: Shows last 10 notifications
- **Quick Actions**: Mark as read, view related content
- **Time Display**: Relative time (e.g., "2h ago", "1d ago")
- **Priority Indicators**: Color-coded priority badges
- **Click Outside**: Closes dropdown when clicking elsewhere

### Notifications Page
- **Comprehensive List**: All notifications with full details
- **Advanced Filters**: 
  - Status: All, Unread, Read, Archived
  - Type: All, Form Submission, System, Alert, Information
  - Priority: All, Low, Medium, High, Urgent
  - Search: By title or message content
- **Bulk Actions**: Mark all as read
- **Individual Actions**: Mark as read, archive, delete, view related content

### Status Workflow
- **Unread**: New notifications (highlighted with blue background)
- **Read**: Notifications that have been viewed
- **Archived**: Notifications that are no longer needed
- **Deleted**: Permanently removed notifications

## 🔒 Security Features

- **Row Level Security (RLS)**: Users can only see their own notifications
- **User Isolation**: Each admin user has their own notification stream
- **Secure Triggers**: Automatic notification creation is handled at database level
- **Input Validation**: All notification data is properly validated

## 📈 Performance Optimizations

- **Database Indexes**: Optimized queries for common filters
- **Pagination Ready**: Structure supports large notification datasets
- **Efficient Filtering**: Client-side filtering for responsive UI
- **Lazy Loading**: Notifications loaded on demand
- **Real-time Updates**: Local state updates for immediate feedback

## 🚀 Integration with Form Submissions

The notifications system is automatically integrated with the form submissions system:

1. **Automatic Creation**: When a form is submitted, notifications are automatically created for all admin users
2. **Priority Assignment**: Notifications inherit priority from form submissions
3. **Direct Links**: Clicking notifications takes you to the relevant form submission
4. **Rich Data**: Notifications include form type, contact info, and submission details

## 🎨 UI/UX Features

### Visual Indicators
- **Unread Badge**: Red badge with count on bell icon
- **Priority Colors**: 
  - Low: Gray
  - Medium: Blue
  - High: Orange
  - Urgent: Red
- **Type Icons**: Different icons for different notification types
- **Status Indicators**: Clear visual distinction between read/unread/archived

### Responsive Design
- **Mobile Friendly**: Dropdown and page work on all screen sizes
- **Touch Optimized**: Large touch targets for mobile devices
- **Consistent Styling**: Matches existing admin interface design

## 🔧 Customization Options

### Adding New Notification Types
1. Add new type to the database enum
2. Update type labels and icons in the components
3. Create appropriate notification creation logic

### Custom Triggers
You can create custom triggers for other events:
- Page updates
- Blog post publications
- User registrations
- System maintenance

### Notification Templates
The system supports rich notification data through the JSONB `data` field:
- Custom fields
- Related entity information
- User preferences
- Action buttons

## 📝 Usage Examples

### Manual Notification Creation
```sql
-- Create a system notification for all users
INSERT INTO notifications (user_id, type, title, message, data, priority)
SELECT 
    u.id,
    'system',
    'System Maintenance',
    'Scheduled maintenance will occur tonight from 2-4 AM EST.',
    '{"maintenance_window": "2-4 AM EST", "affected_services": ["CMS", "API"]}',
    'medium'
FROM auth.users u;
```

### Custom Notification Types
```javascript
// In your application code
const createNotification = async (userId, type, title, message, data = {}) => {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type,
      title,
      message,
      data,
      priority: 'medium'
    })
  
  if (error) throw error
}
```

## 🎉 Ready to Use

The notifications system is now fully functional! You can:

1. ✅ See notification badges in the admin header
2. ✅ Click the bell icon to see recent notifications
3. ✅ Visit `/admin/notifications` for complete notification management
4. ✅ Automatically receive notifications when forms are submitted
5. ✅ Filter, search, and manage all notifications
6. ✅ Mark notifications as read, archive, or delete them

The system provides a complete notification management experience that will keep you informed of all important activities in your CMS!
