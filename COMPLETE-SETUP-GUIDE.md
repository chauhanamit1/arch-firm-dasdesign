# Complete Setup Guide - Fully Navigable Sample Project

This guide will walk you through setting up a complete, fully navigable construction project with all features working.

## 🎯 What You'll Get

After following this guide, you'll have:
- ✅ A complete construction project: "Modern Office Interior Redesign"
- ✅ 5 construction milestones (2 completed, 1 in progress, 2 pending)
- ✅ Client information (TechCorp Solutions Inc.)
- ✅ 3 invoices (2 paid, 1 pending)
- ✅ 4 services (Interior Design, Space Planning, etc.)
- ✅ Full project navigation and tracking
- ✅ Working frontend displaying all data

**Time Required:** 20-30 minutes

---

## 📋 Prerequisites

Before starting, ensure:
- ✅ Backend is running: http://localhost:1337
- ✅ Frontend is running: http://localhost:3000
- ✅ You have access to both terminals

---

## 🚀 Step-by-Step Setup

### Step 1: Create Strapi Admin Account (5 minutes)

1. **Open Strapi Admin Panel:**
   ```
   http://localhost:1337/admin
   ```

2. **Create Your Admin Account:**
   - First Name: `Admin`
   - Last Name: `User`
   - Email: `admin@example.com` (or your email)
   - Password: Choose a strong password (min 8 characters)
   - Confirm Password: Same as above

3. **Click "Let's start"**

4. **You'll see the Strapi Dashboard** - Welcome screen

---

### Step 2: Create Content Types (10 minutes)

#### A. Create "Project" Content Type

1. Click **"Content-Type Builder"** in the left sidebar (puzzle icon)

2. Click **"Create new collection type"**

3. **Display name:** `Project`
   - Click **"Continue"**

4. **Add Fields** - Click each field type and configure:

   **Text Fields:**
   - Click "Text" → Short text
     - Name: `title`
     - Type: Short text
     - ✅ Required field
     - Click "Finish"
   
   - Click "Add another field" → Text → Long text
     - Name: `description`
     - Type: Long text
     - Click "Finish"
   
   - Click "Add another field" → Text → Short text
     - Name: `category`
     - Click "Finish"
   
   - Click "Add another field" → Text → Short text
     - Name: `location`
     - Click "Finish"
   
   - Click "Add another field" → Text → Short text
     - Name: `status`
     - Click "Finish"
   
   - Click "Add another field" → Text → Short text
     - Name: `client`
     - Click "Finish"

   **Number Fields:**
   - Click "Add another field" → Number → Decimal
     - Name: `area`
     - Click "Finish"
   
   - Click "Add another field" → Number → Decimal
     - Name: `budget`
     - Click "Finish"

   **Date Fields:**
   - Click "Add another field" → Date → Date
     - Name: `startDate`
     - Click "Finish"
   
   - Click "Add another field" → Date → Date
     - Name: `completionDate`
     - Click "Finish"

   **Media Fields:**
   - Click "Add another field" → Media → Multiple media
     - Name: `images`
     - Click "Finish"

5. **Click "Save"** (top right corner)

6. **Wait for Strapi to restart** (you'll see a loading screen)

---

#### B. Create "Service" Content Type

1. Click **"Create new collection type"**

2. **Display name:** `Service`
   - Click **"Continue"**

3. **Add Fields:**

   - Text → Short text
     - Name: `title`
     - ✅ Required field
     - Click "Finish"
   
   - Add another field → Text → Long text
     - Name: `description`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `category`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `icon`
     - Click "Finish"

4. **Click "Save"**

5. **Wait for restart**

---

#### C. Create "Client" Content Type

1. Click **"Create new collection type"**

2. **Display name:** `Client`
   - Click **"Continue"**

3. **Add Fields:**

   - Text → Short text
     - Name: `name`
     - ✅ Required field
     - Click "Finish"
   
   - Add another field → Email
     - Name: `email`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `phone`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `company`
     - Click "Finish"
   
   - Add another field → Text → Long text
     - Name: `address`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `type`
     - Click "Finish"

4. **Click "Save"**

5. **Wait for restart**

---

#### D. Create "Project Milestone" Content Type

1. Click **"Create new collection type"**

2. **Display name:** `Project Milestone`
   - Click **"Continue"**

3. **Add Fields:**

   - Text → Short text
     - Name: `name`
     - ✅ Required field
     - Click "Finish"
   
   - Add another field → Text → Long text
     - Name: `description`
     - Click "Finish"
   
   - Add another field → Number → Integer
     - Name: `phase`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `keyOutput`
     - Click "Finish"
   
   - Add another field → JSON
     - Name: `deliverables`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `status`
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `dueDate`
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `completionDate`
     - Click "Finish"
   
   - Add another field → Boolean
     - Name: `signOffRequired`
     - Default value: true
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `signOffDate`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `signOffBy`
     - Click "Finish"
   
   - Add another field → Text → Long text
     - Name: `notes`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `projectId`
     - Click "Finish"

4. **Click "Save"**

5. **Wait for restart**

---

#### E. Create "Invoice" Content Type

1. Click **"Create new collection type"**

2. **Display name:** `Invoice`
   - Click **"Continue"**

3. **Add Fields:**

   - Text → Short text
     - Name: `invoiceNumber`
     - ✅ Required field
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `projectId`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `milestoneId`
     - Click "Finish"
   
   - Add another field → Number → Decimal
     - Name: `amount`
     - Click "Finish"
   
   - Add another field → Number → Decimal
     - Name: `tax`
     - Click "Finish"
   
   - Add another field → Number → Decimal
     - Name: `total`
     - Click "Finish"
   
   - Add another field → Text → Short text
     - Name: `status`
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `issueDate`
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `dueDate`
     - Click "Finish"
   
   - Add another field → Date → Date
     - Name: `paidDate`
     - Click "Finish"
   
   - Add another field → Text → Long text
     - Name: `description`
     - Click "Finish"

4. **Click "Save"**

5. **Wait for restart**

---

### Step 3: Configure API Permissions (3 minutes)

1. Click **"Settings"** in the left sidebar (gear icon)

2. Under "USERS & PERMISSIONS PLUGIN", click **"Roles"**

3. Click on **"Public"** role

4. Scroll down to find your content types

5. **For each content type** (Project, Service, Client, Project Milestone, Invoice):
   - Expand the section
   - Check these permissions:
     - ✅ `find`
     - ✅ `findOne`

6. **Click "Save"** (top right)

---

### Step 4: Add Sample Data (10 minutes)

#### A. Add Client

1. Click **"Content Manager"** in the left sidebar

2. Click **"Client"** under "Collection Types"

3. Click **"Create new entry"** (top right)

4. **Fill in the form:**
   ```
   Name: TechCorp Solutions Inc.
   Email: contact@techcorp.com
   Phone: +1 (555) 123-4567
   Company: TechCorp Solutions Inc.
   Address: 123 Business Ave, Chicago, IL 60601
   Type: Commercial
   ```

5. **Click "Save"** (top right)

6. **Click "Publish"** (top right)

---

#### B. Add Services

1. Click **"Service"** under "Collection Types"

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

#### C. Add Project

1. Click **"Project"** under "Collection Types"

2. Click **"Create new entry"**

3. **Fill in the form:**
   ```
   Title: Modern Office Interior Redesign
   Description: Complete interior redesign of a 5,000 sq ft office space with open floor plan, collaborative workspaces, and modern amenities. Project includes full construction management with 5-phase milestone tracking.
   Category: Commercial
   Location: Chicago, IL
   Status: In Progress
   Area: 5000
   Budget: 250000
   Start Date: 2026-01-15
   Completion Date: 2026-06-30
   Client: TechCorp Solutions Inc.
   ```

4. **Click "Save"**

5. **Note the Project ID** (you'll see it in the URL: `/content-manager/collection-types/api::project.project/1`)
   - The ID is the last number (usually `1`)

6. **Click "Publish"**

---

#### D. Add Project Milestones

**Milestone 1: Site Ready (Completed)**

1. Click **"Project Milestone"** under "Collection Types"

2. Click **"Create new entry"**

3. **Fill in:**
   ```
   Name: Site Ready
   Description: Site preparation and initial surveys completed
   Phase: 1
   Key Output: Survey & Soil Report
   Deliverables: ["Topographic Survey", "Geotechnical Report", "Site Clearance Certificate", "Utility Connection Approvals"]
   Status: Completed
   Due Date: 2026-02-01
   Completion Date: 2026-01-28
   Sign Off Required: true (toggle ON)
   Sign Off Date: 2026-01-29
   Sign Off By: John Smith, TechCorp
   Notes: All site preparations completed ahead of schedule
   Project Id: 1
   ```

4. **Click "Save" → "Publish"**

**Milestone 2: Design Freeze (Completed)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Name: Design Freeze
   Description: All design documents finalized and approved
   Phase: 2
   Key Output: Full CAD Set (Arch/Elec/AC)
   Deliverables: ["Architectural Drawings", "Electrical Drawings", "HVAC Drawings", "Plumbing Drawings", "Structural Drawings", "Interior Design Specifications"]
   Status: Completed
   Due Date: 2026-02-28
   Completion Date: 2026-02-25
   Sign Off Required: true
   Sign Off Date: 2026-02-26
   Sign Off By: John Smith, TechCorp
   Notes: Design approved. All changes after this require change orders.
   Project Id: 1
   ```

3. **Click "Save" → "Publish"**

**Milestone 3: Mechanical/Electrical (In Progress)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Name: Mechanical/Electrical
   Description: All concealed MEP work completed and inspected
   Phase: 3
   Key Output: Concealed conduits & ducts inspected
   Deliverables: ["Electrical Conduit Installation", "HVAC Duct Installation", "Plumbing Rough-in", "Fire Safety Systems", "Inspection Report", "As-Built Drawings (MEP)"]
   Status: In Progress
   Due Date: 2026-04-15
   Completion Date: (leave empty)
   Sign Off Required: true
   Sign Off Date: (leave empty)
   Sign Off By: (leave empty)
   Notes: Critical phase - no access to concealed work after sign-off
   Project Id: 1
   ```

3. **Click "Save" → "Publish"**

**Milestone 4: The Skin (Pending)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Name: The Skin
   Description: All visible finishes and fixtures installed
   Phase: 4
   Key Output: Flooring & Ceiling complete
   Deliverables: ["Flooring Installation", "Ceiling Installation", "Wall Finishes", "Door & Window Installation", "Fixture Installation", "Painting & Finishing"]
   Status: Pending
   Due Date: 2026-05-30
   Completion Date: (leave empty)
   Sign Off Required: true
   Sign Off Date: (leave empty)
   Sign Off By: (leave empty)
   Notes: Awaiting completion of MEP phase
   Project Id: 1
   ```

3. **Click "Save" → "Publish"**

**Milestone 5: Handover (Pending)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Name: Handover
   Description: Project completion and client handover
   Phase: 5
   Key Output: Ready for Move-in
   Deliverables: ["Final Cleaning", "Punch List Completion", "Systems Testing & Commissioning", "Occupancy Certificate", "As-Built Documentation", "Warranty Documents", "Operation & Maintenance Manuals", "Key Handover"]
   Status: Pending
   Due Date: 2026-06-30
   Completion Date: (leave empty)
   Sign Off Required: true
   Sign Off Date: (leave empty)
   Sign Off By: (leave empty)
   Notes: Final phase - complete project handover
   Project Id: 1
   ```

3. **Click "Save" → "Publish"**

---

#### E. Add Invoices

**Invoice 1: Site Ready (Paid)**

1. Click **"Invoice"** under "Collection Types"

2. Click **"Create new entry"**

3. **Fill in:**
   ```
   Invoice Number: INV-2026-001
   Project Id: 1
   Milestone Id: 1
   Amount: 50000
   Tax: 5000
   Total: 55000
   Status: Paid
   Issue Date: 2026-01-29
   Due Date: 2026-02-12
   Paid Date: 2026-02-08
   Description: Payment for Milestone 1: Site Ready
   ```

4. **Click "Save" → "Publish"**

**Invoice 2: Design Freeze (Paid)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Invoice Number: INV-2026-002
   Project Id: 1
   Milestone Id: 2
   Amount: 75000
   Tax: 7500
   Total: 82500
   Status: Paid
   Issue Date: 2026-02-26
   Due Date: 2026-03-12
   Paid Date: 2026-03-10
   Description: Payment for Milestone 2: Design Freeze
   ```

3. **Click "Save" → "Publish"**

**Invoice 3: Mechanical/Electrical (Pending)**

1. Click **"Create new entry"**

2. **Fill in:**
   ```
   Invoice Number: INV-2026-003
   Project Id: 1
   Milestone Id: 3
   Amount: 60000
   Tax: 6000
   Total: 66000
   Status: Pending
   Issue Date: 2026-03-20
   Due Date: 2026-04-20
   Paid Date: (leave empty)
   Description: Payment for Milestone 3: Mechanical/Electrical (Due upon completion)
   ```

3. **Click "Save" → "Publish"**

---

### Step 5: Verify Everything Works (2 minutes)

1. **Open Frontend:**
   ```
   http://localhost:3000
   ```

2. **You should see:**
   - ✅ No 404 errors in browser console
   - ✅ "Featured Projects" section with "Modern Office Interior Redesign"
   - ✅ "Our Services" section with 4 services
   - ✅ Project details (location, budget, status)

3. **Check Browser Console (F12):**
   - Should show no errors
   - Should see successful API calls

4. **Test API Directly:**
   - Open: http://localhost:1337/api/projects
   - Should return JSON with your project
   - Open: http://localhost:1337/api/services
   - Should return JSON with 4 services

---

## ✅ Success Checklist

Verify you have:

- [ ] Strapi admin account created
- [ ] 5 content types created (Project, Service, Client, Project Milestone, Invoice)
- [ ] API permissions configured for Public role
- [ ] 1 client added and published
- [ ] 4 services added and published
- [ ] 1 project added and published
- [ ] 5 milestones added and published
- [ ] 3 invoices added and published
- [ ] Frontend displays data without errors
- [ ] API endpoints return data

---

## 🎯 What You Can Now Do

### Navigate Your Sample Project:

1. **View Project Overview:**
   - See project details, budget, timeline
   - View client information
   - Check project status

2. **Track Milestones:**
   - Phase 1 (Site Ready): ✅ Completed & Signed Off
   - Phase 2 (Design Freeze): ✅ Completed & Signed Off
   - Phase 3 (Mechanical/Electrical): 🔄 In Progress
   - Phase 4 (The Skin): ⏳ Pending
   - Phase 5 (Handover): ⏳ Pending

3. **Review Invoices:**
   - INV-2026-001: $55,000 (Paid)
   - INV-2026-002: $82,500 (Paid)
   - INV-2026-003: $66,000 (Pending)

4. **Explore Services:**
   - Interior Design
   - Space Planning
   - Construction Management
   - Residential Design

---

## 🚀 Next Steps

### Customize Your Project:

1. **Add More Projects:**
   - Create residential projects (2-7 bedroom apartments)
   - Add hospital or school projects
   - Upload project images

2. **Extend Functionality:**
   - Create project detail pages
   - Add client portal
   - Implement milestone approval workflow
   - Add document upload for contracts

3. **Enhance UI:**
   - Customize colors and branding
   - Add animations
   - Create dashboard views
   - Add charts for project progress

4. **Add Advanced Features:**
   - Email notifications
   - PDF generation for invoices
   - Change order management
   - Meeting scheduling

---

## 🆘 Troubleshooting

### Still seeing 404 errors?

1. **Check content is published:**
   - Go to Content Manager
   - Ensure all entries show "Published" status
   - If "Draft", click entry and click "Publish"

2. **Verify permissions:**
   - Settings → Roles → Public
   - Ensure `find` and `findOne` are checked

3. **Restart servers:**
   ```bash
   # Stop both terminals (Ctrl+C)
   # Restart backend
   cd architectural-firm-website/backend && npm run develop
   # Restart frontend
   cd architectural-firm-website/frontend && npm run dev
   ```

4. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)

---

## 📚 Related Documentation

- **TROUBLESHOOTING.md** - Common issues and fixes
- **PROJECT-MANAGEMENT-COMPLETE.md** - Advanced features
- **API-DOCUMENTATION.md** - API reference
- **QUICK-START.md** - Daily operations

---

## 🎉 Congratulations!

You now have a fully functional architectural firm website with:
- ✅ Complete construction project tracking
- ✅ 5-phase milestone system
- ✅ Client management
- ✅ Invoice tracking
- ✅ Service catalog
- ✅ Working frontend and backend

**Your sample project is ready to explore!** 🏗️✨