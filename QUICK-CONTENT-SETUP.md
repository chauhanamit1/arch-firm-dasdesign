# Quick Content Setup - See Sample Project in 10 Minutes!

You're logged into Strapi. Follow these steps to see your sample project immediately.

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Create "Project" Content Type (3 minutes)

1. **In Strapi Dashboard:**
   - Look at the left sidebar
   - Click **"Content-Type Builder"** (puzzle piece icon)

2. **Create Collection Type:**
   - Click blue button **"Create new collection type"**
   - Display name: `Project`
   - Click **"Continue"**

3. **Add These Fields (click "Add another field" after each):**

   **Field 1:** Text → Short text
   - Name: `title`
   - ✅ Check "Required field"
   - Click "Finish"

   **Field 2:** Text → Long text
   - Name: `description`
   - Click "Finish"

   **Field 3:** Text → Short text
   - Name: `category`
   - Click "Finish"

   **Field 4:** Text → Short text
   - Name: `location`
   - Click "Finish"

   **Field 5:** Text → Short text
   - Name: `status`
   - Click "Finish"

   **Field 6:** Text → Short text
   - Name: `client`
   - Click "Finish"

   **Field 7:** Number → Decimal
   - Name: `area`
   - Click "Finish"

   **Field 8:** Number → Decimal
   - Name: `budget`
   - Click "Finish"

   **Field 9:** Date → Date
   - Name: `startDate`
   - Click "Finish"

   **Field 10:** Date → Date
   - Name: `completionDate`
   - Click "Finish"

   **Field 11:** Media → Multiple media
   - Name: `images`
   - Click "Finish"

4. **Click "Save"** (top right)
   - Wait for Strapi to restart (loading screen)

---

### Step 2: Create "Service" Content Type (1 minute)

1. **Click "Create new collection type"**
   - Display name: `Service`
   - Click "Continue"

2. **Add Fields:**

   **Field 1:** Text → Short text
   - Name: `title`
   - ✅ Required field
   - Click "Finish"

   **Field 2:** Text → Long text
   - Name: `description`
   - Click "Finish"

   **Field 3:** Text → Short text
   - Name: `category`
   - Click "Finish"

   **Field 4:** Text → Short text
   - Name: `icon`
   - Click "Finish"

3. **Click "Save"**
   - Wait for restart

---

### Step 3: Set Permissions (1 minute)

1. **Click "Settings"** (gear icon in left sidebar)

2. **Under "USERS & PERMISSIONS PLUGIN":**
   - Click **"Roles"**

3. **Click "Public"** role

4. **Scroll down to find:**
   - **Project** section
     - ✅ Check `find`
     - ✅ Check `findOne`
   
   - **Service** section
     - ✅ Check `find`
     - ✅ Check `findOne`

5. **Click "Save"** (top right)

---

### Step 4: Add Sample Project (2 minutes)

1. **Click "Content Manager"** (left sidebar)

2. **Click "Project"** under "Collection Types"

3. **Click "Create new entry"** (blue button, top right)

4. **Fill in the form:**
   ```
   Title: Modern Office Interior Redesign
   
   Description: Complete interior redesign of a 5,000 sq ft office space with open floor plan, collaborative workspaces, and modern amenities. Project includes full construction management with 5-phase milestone tracking.
   
   Category: Commercial
   
   Location: Chicago, IL
   
   Status: In Progress
   
   Client: TechCorp Solutions Inc.
   
   Area: 5000
   
   Budget: 250000
   
   Start Date: 2026-01-15
   
   Completion Date: 2026-06-30
   ```

5. **Click "Save"** (top right)

6. **Click "Publish"** (top right) ← **IMPORTANT!**

---

### Step 5: Add Sample Services (3 minutes)

1. **Click "Service"** under "Collection Types"

2. **Create Service 1:**
   - Click "Create new entry"
   - Title: `Interior Design`
   - Description: `Complete interior design services for residential and commercial spaces, including space planning, material selection, and 3D visualization.`
   - Category: `Both`
   - Icon: `🏠`
   - Click "Save" → "Publish"

3. **Create Service 2:**
   - Click "Create new entry"
   - Title: `Space Planning`
   - Description: `Optimize your space with professional layout planning and furniture arrangement for maximum functionality.`
   - Category: `Both`
   - Icon: `📐`
   - Click "Save" → "Publish"

4. **Create Service 3:**
   - Click "Create new entry"
   - Title: `Construction Management`
   - Description: `End-to-end construction project management with milestone tracking and quality control.`
   - Category: `Commercial`
   - Icon: `🏗️`
   - Click "Save" → "Publish"

5. **Create Service 4:**
   - Click "Create new entry"
   - Title: `Residential Design`
   - Description: `Custom home design services for 2-7 bedroom apartments with modern aesthetics.`
   - Category: `Residential`
   - Icon: `🏡`
   - Click "Save" → "Publish"

---

## ✅ Verify It Works!

1. **Open your frontend:**
   ```
   http://localhost:3000
   ```

2. **Refresh the page (Cmd+R or Ctrl+R)**

3. **You should now see:**
   - ✅ No 404 errors in console
   - ✅ "Featured Projects" section with "Modern Office Interior Redesign"
   - ✅ "Our Services" section with 4 services
   - ✅ Project details: $250,000 budget, 5,000 sq ft, Chicago, IL

---

## 🎉 Success!

Your sample project is now live and navigable!

### What You Have:
- ✅ 1 Complete Project (Modern Office Interior Redesign)
- ✅ 4 Services (Interior Design, Space Planning, etc.)
- ✅ Working frontend displaying all data
- ✅ No more 404 errors

### Next Steps:
- Add more projects
- Upload project images
- Create additional content types (Client, Milestone, Invoice)
- Follow COMPLETE-SETUP-GUIDE.md for full construction project management

---

## 🆘 Troubleshooting

### Still seeing 404 errors?

**Check 1: Content is Published**
- Go to Content Manager → Project
- Make sure status shows "Published" (not "Draft")
- If "Draft", click entry and click "Publish"

**Check 2: Permissions are Set**
- Settings → Roles → Public
- Verify `find` and `findOne` are checked for Project and Service

**Check 3: Refresh Browser**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear cache if needed

**Check 4: Restart Servers**
- Stop both terminals (Ctrl+C)
- Restart backend: `cd backend && npm run develop`
- Restart frontend: `cd frontend && npm run dev`

---

## 📖 What's Next?

Once you see your sample project working:

1. **Add More Content:**
   - Create 2-3 more projects
   - Upload project images
   - Add client testimonials

2. **Add Advanced Features:**
   - Follow COMPLETE-SETUP-GUIDE.md to add:
     - Client content type
     - Project Milestone content type
     - Invoice content type
   - Get full construction project management

3. **Customize Design:**
   - Edit `frontend/src/app/page.tsx`
   - Update colors and styling
   - Add your branding

---

## ⏱️ Time Breakdown

- Step 1 (Project content type): 3 minutes
- Step 2 (Service content type): 1 minute
- Step 3 (Permissions): 1 minute
- Step 4 (Sample project): 2 minutes
- Step 5 (Sample services): 3 minutes

**Total: 10 minutes to see your sample project!**

---

**Follow these steps and you'll see your sample project in 10 minutes!** 🚀