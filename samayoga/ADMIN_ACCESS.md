# Admin Dashboard Access

## Admin Dashboard URL
**http://localhost:3000/admin**

## Default Admin Credentials

After running `npm run create-admin`, you can sign in with:

- **Email**: `admin@samayoga.com`
- **Password**: `admin123`

## Admin Dashboard Features

The admin dashboard includes:

1. **Pending Registrations**
   - Review student registration questionnaires
   - Approve or reject registrations
   - View student details (experience, goals, injuries, preferences, availability)

2. **Admin Tools** (Quick Links):
   - **Schedule** - Manage classes
   - **Students** - View all students
   - **Payments** - Send payment reminders
   - **Content** - Manage blog posts and content
   - **Creative** - Generate posters and creative content
   - **AI Assistant** - Get help with admin tasks

## How to Access

1. **Create admin user** (if not already created):
   ```bash
   npm run create-admin
   ```

2. **Sign in**:
   - Go to http://localhost:3000/auth/signin
   - Use the admin credentials above

3. **Access dashboard**:
   - After signing in, go to http://localhost:3000/admin
   - Or you'll be redirected automatically if you have admin role

## Custom Admin Credentials

To create an admin with custom credentials, set environment variables:

```bash
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME="Your Name"
npm run create-admin
```

## Security Note

⚠️ **Change the default password** after first login for security!

The default password `admin123` is only for initial setup.
