# 🚀 Quick Start Guide - Your Website is Ready!

## ✅ Setup Complete!

Your architectural firm website has been successfully set up with:
- ✅ Strapi Backend (CMS)
- ✅ Next.js Frontend (Website)
- ✅ All dependencies installed
- ✅ Configuration files created
- ✅ Sample code ready

---

## 🎯 Start Your Website (2 Steps)

### Step 1: Start Backend Server

Open a terminal and run:

```bash
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/backend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run develop
```

**Wait for:** `Server started on http://localhost:1337`

**Then open:** http://localhost:1337/admin

**First time only:** Create your admin account
- Fill in the registration form
- Click "Let's start"
- You're in the admin panel!

---

### Step 2: Start Frontend Server

Open a **NEW terminal** (keep backend running) and run:

```bash
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/frontend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run dev
```

**Wait for:** `Ready on http://localhost:3000`

**Then open:** http://localhost:3000

---

## 🌐 Access Your Website

Once both servers are running:

| Service | URL | Purpose |
|---------|-----|---------|
| **Website** | http://localhost:3000 | Your public website |
| **Admin Panel** | http://localhost:1337/admin | Content management |
| **API** | http://localhost:1337/api | Backend API |

---

## 📝 Next Steps

### 1. Configure Content Types in Strapi

Go to http://localhost:1337/admin and:

1. Click **"Content-Type Builder"** (left sidebar)
2. Create these content types:
   - **Project** (for portfolio items)
   - **Service** (for your services)
   - **Team Member** (for your team)
   - **Consultation Request** (for contact forms)

**Detailed instructions:** See `local-setup-quickstart.md` Section 3

### 2. Set API Permissions

1. Go to **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Enable these permissions:
   - Project: `find`, `findOne`
   - Service: `find`, `findOne`
   - Team Member: `find`, `findOne`
   - Consultation Request: `create` only
3. Click **Save**

### 3. Add Sample Content

1. Go to **Content Manager** → **Project**
2. Click **"Create new entry"**
3. Fill in project details
4. Upload images
5. Click **Save** then **Publish**
6. Refresh http://localhost:3000 to see it!

---

## 🛠️ Useful Commands

### Stop Servers
Press `Ctrl + C` in each terminal

### Restart Backend
```bash
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/backend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run develop
```

### Restart Frontend
```bash
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/frontend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run dev
```

### Check if Ports are in Use
```bash
# Check backend port (1337)
lsof -ti:1337

# Check frontend port (3000)
lsof -ti:3000

# Kill process if needed
lsof -ti:1337 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

---

## 📁 Project Structure

```
architectural-firm-website/
├── backend/                    # Strapi CMS
│   ├── src/api/               # API endpoints
│   ├── config/                # Configuration
│   ├── database/              # SQLite database
│   └── public/                # Uploaded files
│
├── frontend/                   # Next.js Website
│   ├── src/
│   │   ├── app/               # Pages
│   │   │   └── page.tsx       # Homepage
│   │   └── lib/
│   │       └── api.ts         # API connection
│   └── public/                # Static files
│
├── README.md                   # Project overview
├── PROGRESS-STATUS.md          # Setup status
└── QUICK-START.md             # This file
```

---

## 🎨 What You Can Do Now

### 1. View Your Website
- Go to http://localhost:3000
- See the homepage with hero section, services, and projects

### 2. Manage Content
- Go to http://localhost:1337/admin
- Add projects, services, team members
- Upload images and files

### 3. Customize Design
- Edit `frontend/src/app/page.tsx`
- Change colors, fonts, layouts
- Add new sections

### 4. Add New Pages
```bash
# Create about page
mkdir -p frontend/src/app/about
touch frontend/src/app/about/page.tsx
```

### 5. Test API
Open these URLs to see your data:
- http://localhost:1337/api/projects?populate=*
- http://localhost:1337/api/services?populate=*

---

## ❓ Troubleshooting

### "Cannot connect to backend"
- Make sure backend is running on port 1337
- Check terminal for errors
- Restart backend server

### "Page shows no data"
- Add content in Strapi admin panel
- Make sure content is **Published** (not just saved)
- Check API permissions are set correctly

### "Port already in use"
```bash
# Kill the process
lsof -ti:1337 | xargs kill -9  # Backend
lsof -ti:3000 | xargs kill -9  # Frontend
```

### "Module not found"
```bash
# Reinstall dependencies
cd frontend  # or backend
rm -rf node_modules
npm install
```

---

## 📚 Documentation

For more detailed information, see:

- **QUICK-START.md** (this file) - Get started quickly
- **local-setup-quickstart.md** - Detailed 30-minute guide
- **implementation-roadmap.md** - Full development roadmap
- **architectural-website-guide.md** - Design best practices
- **SETUP-INSTRUCTIONS.md** - Complete setup instructions

---

## 🎉 You're All Set!

Your architectural firm website is ready to use!

**Start both servers and begin building your portfolio!**

```bash
# Terminal 1 - Backend
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/backend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run develop

# Terminal 2 - Frontend
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website/frontend
export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
npm run dev
```

**Then visit:**
- Website: http://localhost:3000
- Admin: http://localhost:1337/admin

Happy building! 🏗️✨