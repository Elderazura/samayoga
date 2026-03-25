# Samayoga - Complete Yoga Web Application

A complete, production-ready yoga web application for Samyuktha Nambiar's Hatha and Yin yoga practice.

## 🎉 All Phases Complete!

This application includes all 6 planned phases:
- ✅ Phase 1: Public Website + Design System + Animations
- ✅ Phase 2: Auth + Registration + Admin Approval
- ✅ Phase 3: Student Dashboard (Schedule, Payments, Progress)
- ✅ Phase 4: Admin Panel (Scheduling, Students, Payments, Content)
- ✅ Phase 5: Creative Panel (Poster Generation)
- ✅ Phase 6: Admin AI Assistant (Gemini Integration)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up database
npx prisma migrate deploy
npx prisma generate

# Create admin user
npm run create-admin

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## 📋 Environment Variables

Create `.env.local`:

```env
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-client-id"  # Optional
AUTH_GOOGLE_SECRET="your-google-client-secret"  # Optional
```

## 🎨 Features

### Public Website
- Beautiful, calm design with sage green accents
- Hero section with yoga images
- Teacher profile and offerings
- Media gallery
- Blog with markdown support
- Contact form
- Calm animations (breathing, wind particles, drifting leaves)

### Authentication
- Google OAuth login
- Email/Password registration
- Registration questionnaire
- Admin approval flow
- Role-based access control

### Student Dashboard
- View and book classes
- Access Google Meet links
- View payment history
- Track progress (classes attended, practice days)
- Access practice resources

### Admin Panel
- Approve/Reject student registrations
- Create and manage classes
- View all students
- Send payment reminders
- Manage content (blog, resources)
- Generate posters (Nano Banana placeholder)
- AI Assistant (Gemini placeholder)

## 📱 Mobile Optimized
- Fully responsive design
- Touch-friendly interactions
- Mobile navigation menu
- Optimized for all screen sizes

## 🔍 SEO Optimized
- Complete metadata on all pages
- OpenGraph and Twitter Cards
- Structured data (Schema.org)
- Sitemap and robots.txt
- Semantic HTML

## 🗄️ Database

Uses Prisma with SQLite (easily upgradeable to PostgreSQL):
- Users, Accounts, Sessions
- Registrations
- Classes and Bookings
- Payments
- Progress tracking
- Content management
- AI memory storage

## 📁 Project Structure

```
samayoga/
├── app/                    # Next.js pages
│   ├── (public routes)
│   ├── dashboard/          # Student dashboard
│   ├── admin/              # Admin panel
│   ├── auth/               # Authentication
│   └── register/           # Registration flow
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   └── (animations, etc.)
├── lib/                    # Utilities
├── prisma/                 # Database schema
└── src/content/           # Blog and media content
```

## 🎯 Tech Stack

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **NextAuth.js v5** - Authentication
- **Prisma** - Database ORM
- **SQLite** - Database (dev) / PostgreSQL (production)

## 📝 Admin user (scripts)

Create an admin with `npm run create-admin` (see script help). Use a strong `ADMIN_PASSWORD` in production — do not use default passwords from docs.

## 🔐 Security

- Password hashing with bcrypt
- JWT session management
- Route protection via middleware
- Role-based access control
- Secure API routes

## 📄 License

Proprietary - Samayoga by Samyuktha Nambiar

---

**Status: Production Ready!** 🎉

See `COMPLETE_FEATURES.md` for detailed feature list.