# Activity Tracking Setup Guide

This guide will help you set up comprehensive activity tracking for your Elevation AI CMS admin dashboard.

## 🎯 **What's Included**

The activity tracking system automatically logs and displays:
- **Page Management**: Create, update, delete, publish/unpublish pages
- **Blog Management**: Create, update, delete, publish/unpublish blog posts
- **FAQ Management**: Create, update, delete FAQ categories and questions
- **Media Management**: File uploads and deletions
- **User Activity**: Login and logout events
- **Site Settings**: Configuration changes
- **Page Sections**: Individual section updates

## 🚀 **Setup Instructions**

### **Step 1: Database Setup**

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Copy and run the contents of `docs/database/database-schema-activity-logs.sql`
4. This creates:
   - `activity_logs` table for storing all activities
   - Database triggers for automatic logging
   - Helper functions for manual logging
   - Proper indexes for performance

### **Step 2: Verify Setup**

After running the SQL script, verify the setup:

1. **Check Tables**: Go to **Table Editor** and confirm `activity_logs` table exists
2. **Check Triggers**: Go to **Database** → **Triggers** and verify these triggers exist:
   - `trigger_log_page_activity`
   - `trigger_log_blog_post_activity`
   - `trigger_log_faq_activity`
   - `trigger_log_faq_category_activity`
   - `trigger_log_media_activity`

### **Step 3: Test the System**

1. **Login to Admin**: Go to `/admin/login` and sign in
2. **Check Activity**: Go to `/admin` dashboard and verify the "Recent Activity" section shows your login
3. **Create Content**: Create a new page, blog post, or FAQ
4. **Verify Logging**: Check that the activity appears in the dashboard

## 📊 **Activity Types Tracked**

### **Automatic Tracking (via Database Triggers)**
- ✅ Page creation, updates, deletion, publish/unpublish
- ✅ Blog post creation, updates, deletion, publish/unpublish  
- ✅ FAQ creation, updates, deletion
- ✅ FAQ category creation, updates, deletion
- ✅ Media file uploads and deletions

### **Manual Tracking (via Service Functions)**
- ✅ User login/logout events
- ✅ Page section updates
- ✅ Site setting changes
- ✅ Custom activities via `activityService.logActivity()`

## 🎨 **Dashboard Features**

The admin dashboard now includes:

### **Recent Activity Section**
- **Real-time Activity Feed**: Shows the latest 10 activities by default
- **Filter Options**: Filter by action type (All, Created, Updated)
- **Rich Information**: Shows user, timestamp, entity type, and description
- **Visual Indicators**: Color-coded badges for different action types
- **Entity Icons**: Visual icons for different content types

### **Activity Details**
Each activity log includes:
- **Action Type**: create, update, delete, publish, unpublish, login, logout
- **Entity Information**: Type, ID, and title of affected content
- **User Information**: Who performed the action
- **Timestamp**: When the action occurred
- **Description**: Human-readable description of what happened
- **Additional Data**: Structured metadata about the changes

## 🔧 **Customization Options**

### **Activity Service Functions**

```typescript
// Get recent activities
const activities = await activityService.getRecent(20)

// Get activities by entity type
const pageActivities = await activityService.getByEntityType('page')

// Get activities by user
const userActivities = await activityService.getByUser(userId)

// Get activity statistics
const stats = await activityService.getStats()

// Manually log an activity
await activityService.logActivity('custom_action', 'custom_entity', entityId, 'Custom description')
```

### **RecentActivity Component Props**

```typescript
<RecentActivity 
  limit={10}           // Number of activities to show
  showFilters={true}   // Show filter buttons
  className="custom"   // Custom CSS classes
/>
```

## 📈 **Activity Statistics**

The system tracks comprehensive statistics:
- **Total Activities**: All-time activity count
- **Daily/Weekly/Monthly**: Activity counts by time period
- **Top Actions**: Most common action types
- **Top Entity Types**: Most frequently modified content types
- **Top Users**: Most active users

## 🔒 **Security & Permissions**

- **Row Level Security**: Enabled on activity_logs table
- **User Isolation**: Users can only see activities from authenticated sessions
- **System Logging**: System activities are logged with appropriate permissions
- **Data Retention**: Activities are stored indefinitely (consider cleanup policies for production)

## 🚨 **Troubleshooting**

### **Activities Not Appearing**
1. Check that database triggers are installed correctly
2. Verify user authentication is working
3. Check browser console for JavaScript errors
4. Ensure Supabase connection is working

### **Performance Issues**
1. Check database indexes are created
2. Consider limiting activity history for large datasets
3. Monitor database query performance

### **Missing Activity Types**
1. Add custom logging calls in your application code
2. Create additional database triggers for new tables
3. Use `activityService.logActivity()` for manual tracking

## 📝 **Next Steps**

1. **Monitor Activity**: Check the dashboard regularly to see content management patterns
2. **Custom Logging**: Add activity logging to any custom features you build
3. **Analytics**: Use the activity data to understand content management workflows
4. **Notifications**: Consider building notifications based on activity patterns

## 🎉 **You're All Set!**

Your Elevation AI CMS now has comprehensive activity tracking. Every content management action will be automatically logged and displayed in the admin dashboard, giving you complete visibility into your content management activities.
