# Admin Dashboard Access

## ✅ Admin User Created!

An admin user has been created in your Supabase database.

## Login Credentials

- **Email**: `admin@samayoga.com`
- **Password**: `admin123`

⚠️ **Important**: Change this password after your first login for security!

## Access the Admin Dashboard

1. **Sign in**:
   - Go to http://localhost:3000/auth/signin
   - Enter the credentials above

2. **Access dashboard**:
   - After signing in, you'll be redirected to `/dashboard`
   - Navigate to http://localhost:3000/admin
   - Or click on admin links if available in the navbar

## Admin Dashboard Features

### 1. Pending Registrations
- View all student registration questionnaires
- Approve or reject registrations
- See student details:
  - Experience level
  - Goals
  - Injuries/limitations
  - Preferences (Hatha/Yin/Both)
  - Availability
  - Additional information

### 2. Admin Tools (Quick Links)

- **Schedule** (`/admin/schedule`)
  - Manage yoga classes
  - Create/edit class schedules
  - Set class types (Hatha/Yin/Both)

- **Students** (`/admin/students`)
  - View all registered students
  - See student profiles and status

- **Payments** (`/admin/payments`)
  - View payment records
  - Send payment reminders
  - Track payment status

- **Content** (`/admin/content`)
  - Manage blog posts
  - Create/edit content
  - Publish/unpublish content

- **Creative** (`/admin/creative`)
  - Generate posters and creative content
  - AI-powered content creation

- **AI Assistant** (`/admin/ai`)
  - Get help with admin tasks
  - AI-powered assistance

## Security Notes

1. **Change the default password** immediately after first login
2. The admin account has full access to all student data and system settings
3. Keep admin credentials secure

## Creating Additional Admin Users

To create more admin users, you can:

1. **Use the script**:
   ```bash
   ADMIN_EMAIL=another@example.com ADMIN_PASSWORD=securepass npm run create-admin
   ```

2. **Or manually promote a user**:
   - Sign in as admin
   - Go to Students page
   - Update user role to ADMIN (if that feature exists)

## Troubleshooting

If you can't access the admin dashboard:

1. **Check you're signed in**: Go to http://localhost:3000/auth/signin
2. **Verify your role**: Make sure your user has `role: 'ADMIN'` in the database
3. **Check browser console**: Look for any JavaScript errors (F12)
4. **Verify database connection**: The admin page queries the database for registrations

The admin dashboard is now ready to use! 🎉
