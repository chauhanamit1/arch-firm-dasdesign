# How to View Your Enhanced Service Pages

## Quick Access Links

### 🏠 Homepage
**URL**: http://localhost

The homepage displays all 4 services. Click on any service card to view the enhanced detail page.

### 🎨 Service Detail Pages (Direct Links)

1. **Interior Design**
   - URL: http://localhost/services/bnfl5k1s4tq7xk5bo3kei2it
   - Features: Space planning, color consultation, furniture selection, lighting design
   - Timeline: 8-12 weeks
   - Investment: $5,000 - $50,000

2. **Space Planning**
   - URL: http://localhost/services/nsvl2lmohfec7b6ds4ib2sew
   - Features: Flow analysis, functional zoning, furniture layouts, storage solutions
   - Timeline: 4-8 weeks
   - Investment: $3,000 - $25,000

3. **Construction Management**
   - URL: http://localhost/services/s82bwoaghpv3ytifdi597ibx
   - Features: Project scheduling, budget management, quality control, contractor coordination
   - Timeline: 6-18 months (project-dependent)
   - Investment: 8-12% of construction cost

4. **Residential Design**
   - URL: http://localhost/services/bk370lyuabgaz5fpjwa75cpw
   - Features: Custom floor plans, exterior design, structural engineering, energy efficiency
   - Timeline: 12-20 weeks
   - Investment: $15,000 - $100,000+

## What You'll See on Each Page

### 1. Hero Section
- Large gradient header with service icon
- Service title and description
- Timeline indicator

### 2. Benefits Section
- 3-column grid showcasing key benefits
- Icons and descriptions

### 3. Key Features
- 6 features per service
- Checkmark icons with detailed descriptions

### 4. Our Process
- Step-by-step timeline
- Numbered steps with durations
- Detailed descriptions

### 5. Deliverables
- Checklist of what clients receive
- Green checkmarks for each item

### 6. Pricing Information
- Investment ranges
- Package options
- Formatted pricing details

### 7. Client Testimonials
- 2 testimonials per service
- 5-star ratings
- Client names and companies

### 8. FAQ Section
- Interactive accordion
- 4-6 questions per service
- Click to expand/collapse

### 9. Related Projects
- Links to related project pages
- Project cards with descriptions

### 10. Project Request Form
- Full contact form
- Budget and timeline selectors
- **8 Milestone Checkboxes**:
  - Initial Consultation
  - Site Analysis
  - Concept Design
  - Design Development
  - Permit & Approval
  - Construction Documents
  - Construction Administration
  - Final Walkthrough
- Submit button

## Testing the Form

1. Scroll to the bottom of any service page
2. Fill out the "Start Your Project" form
3. Select milestones you're interested in
4. Click "Submit Project Request"
5. You'll see a success message
6. Check Strapi admin to see the submission:
   - Go to: http://localhost:1337/admin
   - Navigate to: Content Manager → Project Requests
   - View your submission with selected milestones

## Troubleshooting

### If pages don't load:
```bash
cd architectural-firm-website
docker-compose restart frontend
```

### If services don't appear on homepage:
```bash
cd architectural-firm-website
./populate-services.sh
docker-compose restart frontend
```

### Check if services are published:
```bash
curl -s "http://localhost:1337/api/services" | jq '.data[] | {id, title, publishedAt}'
```

### View all container status:
```bash
cd architectural-firm-website
docker-compose ps
```

## Admin Access

### Strapi Admin Panel
- **URL**: http://localhost:1337/admin
- **Username**: admin@example.com
- **Password**: Admin123!

### What to do in Strapi:
1. Go to Content Manager → Services
2. You should see 4 published services
3. Click on any service to view/edit content
4. Go to Content Manager → Project Requests to see form submissions

### SonarQube
- **URL**: http://localhost:9000
- **Username**: admin
- **Password**: admin123

## Next Steps

1. ✅ View all 4 enhanced service pages
2. ✅ Test the project request form
3. ✅ Check form submissions in Strapi admin
4. 📸 Add images to services (optional):
   - Upload images to Strapi Media Library
   - Edit services and attach to heroImage/gallery fields
5. ✏️ Customize content to match your brand
6. 🚀 Deploy to production when ready

---

**Made with Bob** 🤖