# Troubleshooting Guide

## Common Issues and Solutions

### ❌ Error: "Request failed with status code 404"

**Error Message:**
```
AxiosError: Request failed with status code 404
at async getProjects (src/lib/api.ts:14:22)
at async getServices (src/lib/api.ts:28:22)
```

**Cause:** Content types haven't been created in Strapi yet.

**Solution:** Follow these steps to create the required content types:

---

## 🔧 Step-by-Step Fix

### Step 1: Access Strapi Admin Panel

1. Open your browser and go to: **http://localhost:1337/admin**
2. If this is your first time:
   - Create an admin account (email, password, name)
   - Click "Let's start"

### Step 2: Create Content Types

#### A. Create "Project" Content Type

1. In Strapi admin, click **"Content-Type Builder"** in the left sidebar
2. Click **"Create new collection type"**
3. Enter display name: `Project`
4. Click **"Continue"**
5. Add the following fields:

**Text Fields:**
- `title` (Short text, Required)
- `description` (Long text)
- `category` (Short text) - e.g., "Residential", "Commercial"
- `location` (Short text)
- `status` (Short text) - e.g., "Completed", "In Progress"

**Number Fields:**
- `area` (Number, Decimal)
- `budget` (Number, Decimal)

**Date Fields:**
- `startDate` (Date)
- `completionDate` (Date)

**Media Fields:**
- `images` (Media, Multiple files)
- `thumbnail` (Media, Single file)

6. Click **"Finish"**
7. Click **"Save"** (top right)

#### B. Create "Service" Content Type

1. Click **"Create new collection type"**
2. Enter display name: `Service`
3. Click **"Continue"**
4. Add the following fields:

**Text Fields:**
- `title` (Short text, Required)
- `description` (Long text)
- `category` (Short text) - e.g., "Residential", "Commercial"

**Media Fields:**
- `icon` (Media, Single file)
- `image` (Media, Single file)

5. Click **"Finish"**
6. Click **"Save"**

### Step 3: Configure API Permissions

1. Go to **"Settings"** in the left sidebar
2. Under "Users & Permissions Plugin", click **"Roles"**
3. Click on **"Public"** role
4. Scroll down to find your content types
5. For **Project**, check:
   - ✅ `find`
   - ✅ `findOne`
6. For **Service**, check:
   - ✅ `find`
   - ✅ `findOne`
7. Click **"Save"** (top right)

### Step 4: Add Sample Data

#### Add a Sample Project:

1. Click **"Content Manager"** in the left sidebar
2. Click **"Project"** under "Collection Types"
3. Click **"Create new entry"**
4. Fill in the fields:
   ```
   Title: Modern Office Redesign
   Description: Complete interior redesign of a 5,000 sq ft office space
   Category: Commercial
   Location: Chicago, IL
   Status: Completed
   Area: 5000
   Budget: 250000
   Start Date: 2025-01-15
   Completion Date: 2025-06-30
   ```
5. Upload images (optional)
6. Click **"Save"** and then **"Publish"**

#### Add a Sample Service:

1. Click **"Service"** under "Collection Types"
2. Click **"Create new entry"**
3. Fill in the fields:
   ```
   Title: Interior Design
   Description: Complete interior design services for residential and commercial spaces
   Category: Both
   ```
4. Upload icon/image (optional)
5. Click **"Save"** and then **"Publish"**

### Step 5: Verify the Fix

1. Go back to your frontend: **http://localhost:3000**
2. Refresh the page
3. You should now see:
   - ✅ No more 404 errors in the console
   - ✅ Your sample project displayed
   - ✅ Your sample service displayed

---

## 🎯 Quick Verification Checklist

Before refreshing the frontend, verify:

- [ ] Strapi admin is accessible at http://localhost:1337/admin
- [ ] "Project" content type is created with all fields
- [ ] "Service" content type is created with all fields
- [ ] Public role has `find` and `findOne` permissions for both content types
- [ ] At least one project is created and **published**
- [ ] At least one service is created and **published**

**Important:** Content must be **published**, not just saved as draft!

---

## 🔍 Additional Debugging

### Check if Strapi is Running:
```bash
# Should return JSON data
curl http://localhost:1337/api/projects
```

### Check API Response:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for requests to `/api/projects` and `/api/services`
5. Check the response status and data

### Common Mistakes:

❌ **Content saved as draft** → Must click "Publish"
❌ **Permissions not set** → Public role needs `find` and `findOne`
❌ **Wrong field names** → Must match exactly (case-sensitive)
❌ **Strapi not running** → Check Terminal 2 for errors

---

## 📚 Next Steps After Fixing

Once the 404 errors are resolved:

1. **Add More Content:**
   - Create 3-5 sample projects
   - Create 4-6 services
   - Upload real images

2. **Create Advanced Content Types:**
   - Follow **PROJECT-MANAGEMENT-COMPLETE.md** to add:
     - Interior Project (with milestones)
     - Client
     - Project Milestone
     - Invoice
     - Contract Document

3. **Customize the Frontend:**
   - Update styling in `frontend/src/app/page.tsx`
   - Add more pages (About, Contact, Portfolio)
   - Implement project detail pages

4. **Test the Complete Workflow:**
   - Create a construction project
   - Add 5 standard milestones
   - Test client sign-off process
   - Generate invoices

---

## 🆘 Still Having Issues?

### Error Persists After Creating Content Types:

1. **Restart Strapi:**
   - Stop Terminal 2 (Ctrl+C)
   - Run: `cd architectural-firm-website/backend && npm run develop`

2. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

3. **Check Strapi Logs:**
   - Look at Terminal 2 for any error messages
   - Common issues: Database locked, port conflicts

4. **Verify Database:**
   ```bash
   # Check if database file exists
   ls -la architectural-firm-website/backend/.tmp/data.db
   ```

### Frontend Not Updating:

1. **Restart Next.js:**
   - Stop Terminal 3 (Ctrl+C)
   - Run: `cd architectural-firm-website/frontend && npm run dev`

2. **Check Environment Variables:**
   ```bash
   # In frontend directory
   cat .env.local
   # Should contain: NEXT_PUBLIC_API_URL=http://localhost:1337
   ```

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ No 404 errors in browser console
2. ✅ Frontend displays "Featured Projects" section with your sample project
3. ✅ Frontend displays "Our Services" section with your sample service
4. ✅ Strapi admin shows published content
5. ✅ API endpoints return data: http://localhost:1337/api/projects

---

## 📖 Related Documentation

- **QUICK-START.md** - Daily operations guide
- **API-DOCUMENTATION.md** - Complete API reference
- **PROJECT-MANAGEMENT-COMPLETE.md** - Advanced content types
- **START-HERE.md** - Getting started guide

---

**Remember:** The 404 errors are **expected** until you create the content types in Strapi. This is not a bug - it's the normal setup process! 🚀