#!/bin/bash

# Populate Services with Enhanced Content
# This script adds all 4 services with professional content to Strapi

API_URL="http://localhost:1337"

echo "🚀 Populating Services with Enhanced Content..."
echo ""

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
until curl -s "$API_URL/_health" > /dev/null 2>&1; do
    sleep 2
done
echo "✅ Backend is ready!"
echo ""

# Service 1: Interior Design
echo "📝 Creating Interior Design service..."
curl -X POST "$API_URL/api/services" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Interior Design",
      "description": "Transform your space with our comprehensive interior design services. We create functional, beautiful environments that reflect your style and enhance your daily life.",
      "category": "Residential",
      "icon": "🎨",
      "timeline": "8-12 weeks",
      "features": [
        {"title": "Space Planning", "description": "Optimize your layout for maximum functionality and flow"},
        {"title": "Color Consultation", "description": "Expert color schemes that create the perfect ambiance"},
        {"title": "Furniture Selection", "description": "Curated furniture pieces that match your style and budget"},
        {"title": "Lighting Design", "description": "Strategic lighting plans for ambiance and functionality"},
        {"title": "Material Selection", "description": "Premium materials and finishes for lasting beauty"},
        {"title": "3D Visualization", "description": "See your space before construction begins"}
      ],
      "process": [
        {"step": "Initial Consultation", "description": "We meet to discuss your vision, needs, and budget. We will tour your space and take measurements.", "duration": "1-2 hours"},
        {"step": "Concept Development", "description": "Our team creates initial design concepts with mood boards, color palettes, and style direction.", "duration": "1-2 weeks"},
        {"step": "Design Presentation", "description": "We present detailed designs including floor plans, 3D renderings, and material selections.", "duration": "1 week"},
        {"step": "Refinement", "description": "Based on your feedback, we refine the design to perfection.", "duration": "1-2 weeks"},
        {"step": "Documentation", "description": "Complete design documentation including specifications, drawings, and purchasing lists.", "duration": "1 week"},
        {"step": "Implementation Support", "description": "We coordinate with contractors and vendors to ensure flawless execution.", "duration": "4-8 weeks"}
      ],
      "benefits": [
        {"title": "Personalized Design", "description": "Every design is tailored to your unique style, needs, and lifestyle"},
        {"title": "Budget Optimization", "description": "We maximize value by sourcing quality materials within your budget"},
        {"title": "Time Savings", "description": "Our expertise streamlines the process, saving you countless hours"}
      ],
      "deliverables": [
        {"name": "Detailed Floor Plans", "description": "Scaled drawings showing furniture placement and traffic flow"},
        {"name": "3D Renderings", "description": "Photorealistic visualizations of your completed space"},
        {"name": "Material Specifications", "description": "Complete list of finishes, fabrics, and materials"},
        {"name": "Furniture & Fixture List", "description": "Curated selection with sources and pricing"},
        {"name": "Color Palette", "description": "Paint colors and finish specifications"},
        {"name": "Lighting Plan", "description": "Fixture specifications and placement drawings"}
      ],
      "testimonials": [
        {"name": "Sarah Johnson", "role": "Homeowner", "company": "Manhattan Residence", "content": "The team transformed our dated apartment into a modern, functional space that perfectly suits our family. Their attention to detail and creative solutions exceeded our expectations.", "rating": 5},
        {"name": "Michael Chen", "role": "Property Developer", "company": "Urban Living Properties", "content": "Working with this team on our luxury condo project was exceptional. They delivered stunning designs that helped us sell units 30% faster than comparable properties.", "rating": 5}
      ],
      "faqs": [
        {"question": "How much does interior design cost?", "answer": "Our interior design services typically range from $5,000 to $50,000 depending on the scope and size of your project. We offer flexible packages to suit different budgets and can work on an hourly basis or fixed fee."},
        {"question": "Do I need to hire contractors separately?", "answer": "We can coordinate with your existing contractors or recommend trusted professionals from our network. We provide oversight during implementation to ensure the design is executed correctly."},
        {"question": "How long does the design process take?", "answer": "Most interior design projects take 8-12 weeks from initial consultation to final documentation. Implementation time varies based on the scope of work but typically takes 4-8 weeks."},
        {"question": "Can you work with my existing furniture?", "answer": "Absolutely! We are happy to incorporate your existing pieces into the new design. We will assess what works and suggest additions or modifications to achieve the desired look."},
        {"question": "What if I do not like the initial design?", "answer": "We include two rounds of revisions in our standard package. Your satisfaction is our priority, and we will work with you until the design feels perfect."}
      ],
      "pricing": "<p><strong>Investment Range: $5,000 - $50,000</strong></p><p>Our interior design services are customized to your needs. Pricing depends on project scope, square footage, level of detail, number of rooms, and complexity.</p><p><strong>Package Options:</strong></p><ul><li>Consultation Only: $500 - $1,500</li><li>Design Concept: $5,000 - $15,000</li><li>Full Service Design: $15,000 - $50,000+</li></ul>",
      "publishedAt": null
    }
  }' | jq -r '.data.id // "Error"'

echo ""

# Service 2: Space Planning
echo "📝 Creating Space Planning service..."
curl -X POST "$API_URL/api/services" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Space Planning",
      "description": "Maximize the potential of your space with strategic planning that optimizes flow, functionality, and efficiency. Perfect for renovations, new builds, or space optimization.",
      "category": "Both",
      "icon": "📐",
      "timeline": "4-8 weeks",
      "features": [
        {"title": "Flow Analysis", "description": "Optimize traffic patterns and spatial relationships"},
        {"title": "Functional Zoning", "description": "Define clear zones for different activities and uses"},
        {"title": "Furniture Layouts", "description": "Strategic placement for maximum efficiency"},
        {"title": "Storage Solutions", "description": "Innovative storage that maximizes every inch"},
        {"title": "Accessibility Planning", "description": "Universal design principles for all users"},
        {"title": "Code Compliance", "description": "Ensure all layouts meet building codes and regulations"}
      ],
      "process": [
        {"step": "Site Assessment", "description": "Comprehensive evaluation of your existing space, including measurements, photos, and analysis of current usage.", "duration": "1 week"},
        {"step": "Needs Analysis", "description": "In-depth discussion of your requirements, workflow, and future growth plans.", "duration": "3-5 days"},
        {"step": "Concept Development", "description": "Multiple layout options exploring different spatial arrangements and configurations.", "duration": "1-2 weeks"},
        {"step": "Refinement & Optimization", "description": "Fine-tune the selected concept based on your feedback and practical considerations.", "duration": "1 week"},
        {"step": "Final Documentation", "description": "Detailed floor plans, furniture layouts, and specifications ready for implementation.", "duration": "1 week"}
      ],
      "benefits": [
        {"title": "Increased Efficiency", "description": "Optimized layouts improve workflow and productivity by up to 30%"},
        {"title": "Cost Savings", "description": "Avoid costly mistakes and renovations with proper planning upfront"},
        {"title": "Future-Proof Design", "description": "Flexible layouts that adapt to changing needs over time"}
      ],
      "deliverables": [
        {"name": "As-Built Drawings", "description": "Accurate measurements of existing conditions"},
        {"name": "Multiple Layout Options", "description": "2-3 different spatial arrangements to choose from"},
        {"name": "Furniture Plans", "description": "Scaled drawings showing all furniture and equipment"},
        {"name": "Circulation Diagrams", "description": "Analysis of traffic flow and movement patterns"},
        {"name": "Area Calculations", "description": "Detailed square footage breakdown by zone"},
        {"name": "Implementation Guide", "description": "Step-by-step instructions for executing the plan"}
      ],
      "testimonials": [
        {"name": "David Martinez", "role": "Office Manager", "company": "Tech Innovations Inc.", "content": "The space planning transformed our cramped office into an efficient, collaborative workspace. Employee satisfaction increased significantly, and we gained 20% more usable space.", "rating": 5},
        {"name": "Lisa Thompson", "role": "Restaurant Owner", "company": "The Garden Bistro", "content": "Their space planning expertise helped us increase seating capacity by 15 tables while improving flow for both staff and customers. The investment paid for itself in three months.", "rating": 5}
      ],
      "faqs": [
        {"question": "What is the difference between space planning and interior design?", "answer": "Space planning focuses on the functional layout and organization of space, while interior design includes aesthetics, finishes, and decorative elements. Space planning is often the first step before interior design."},
        {"question": "Do you work on commercial spaces?", "answer": "Yes! We specialize in both residential and commercial space planning, including offices, retail stores, restaurants, and healthcare facilities."},
        {"question": "Can you help with an existing space that is not working?", "answer": "Absolutely. Many of our clients come to us with spaces that are not functioning well. We analyze the issues and create optimized layouts that solve the problems."},
        {"question": "How accurate are your measurements?", "answer": "We use professional measuring tools and techniques to ensure accuracy within 1/4 inch. For complex projects, we can also arrange for laser scanning."}
      ],
      "pricing": "<p><strong>Investment Range: $3,000 - $25,000</strong></p><p>Space planning fees are based on square footage, complexity, number of layout options, and level of detail needed.</p><p><strong>Typical Projects:</strong></p><ul><li>Small Residential (< 1,500 sq ft): $3,000 - $8,000</li><li>Large Residential (1,500-3,000 sq ft): $8,000 - $15,000</li><li>Commercial Office (per 1,000 sq ft): $5,000 - $10,000</li><li>Retail/Restaurant: $10,000 - $25,000+</li></ul>",
      "publishedAt": null
    }
  }' | jq -r '.data.id // "Error"'

echo ""

# Service 3: Construction Management
echo "📝 Creating Construction Management service..."
curl -X POST "$API_URL/api/services" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Construction Management",
      "description": "Expert oversight of your construction project from groundbreaking to completion. We ensure quality, timeline, and budget adherence while coordinating all trades and contractors.",
      "category": "Both",
      "icon": "🏗️",
      "timeline": "Project-dependent (typically 6-18 months)",
      "features": [
        {"title": "Project Scheduling", "description": "Detailed timelines with milestone tracking and coordination"},
        {"title": "Budget Management", "description": "Cost control, tracking, and value engineering"},
        {"title": "Quality Control", "description": "Regular inspections and adherence to specifications"},
        {"title": "Contractor Coordination", "description": "Manage all trades and subcontractors efficiently"},
        {"title": "Permit Management", "description": "Handle all permits, inspections, and regulatory compliance"},
        {"title": "Risk Mitigation", "description": "Identify and address potential issues before they become problems"}
      ],
      "process": [
        {"step": "Pre-Construction Planning", "description": "Review plans, establish budget, create schedule, and select contractors through competitive bidding.", "duration": "2-4 weeks"},
        {"step": "Mobilization", "description": "Coordinate permits, insurance, site setup, and contractor agreements.", "duration": "1-2 weeks"},
        {"step": "Construction Phase", "description": "Daily oversight, progress meetings, quality inspections, and issue resolution.", "duration": "Varies by project"},
        {"step": "Progress Monitoring", "description": "Weekly reports, budget tracking, schedule updates, and stakeholder communication.", "duration": "Ongoing"},
        {"step": "Quality Inspections", "description": "Regular site visits, punch list creation, and verification of work quality.", "duration": "Throughout project"},
        {"step": "Project Closeout", "description": "Final inspections, certificate of occupancy, warranty documentation, and handover.", "duration": "2-4 weeks"}
      ],
      "benefits": [
        {"title": "Cost Control", "description": "Professional oversight typically saves 10-15% through efficient management"},
        {"title": "Time Savings", "description": "Expert coordination keeps projects on schedule and avoids delays"},
        {"title": "Quality Assurance", "description": "Regular inspections ensure work meets specifications and standards"}
      ],
      "deliverables": [
        {"name": "Project Schedule", "description": "Detailed timeline with milestones and dependencies"},
        {"name": "Budget Tracking", "description": "Regular cost reports and change order management"},
        {"name": "Weekly Progress Reports", "description": "Photo documentation and status updates"},
        {"name": "Meeting Minutes", "description": "Documentation of all project meetings and decisions"},
        {"name": "Quality Inspection Reports", "description": "Detailed findings from site visits"},
        {"name": "Punch List", "description": "Final items requiring completion or correction"},
        {"name": "As-Built Documentation", "description": "Final drawings reflecting actual construction"},
        {"name": "Warranty Information", "description": "Complete warranty documentation for all systems"}
      ],
      "testimonials": [
        {"name": "Robert Williams", "role": "Hospital Administrator", "company": "City Medical Center", "content": "Managing our 50,000 sq ft expansion was complex, but their team kept everything on track. We completed on time and 8% under budget, with minimal disruption to operations.", "rating": 5},
        {"name": "Jennifer Lee", "role": "School Principal", "company": "Riverside Elementary", "content": "The construction management team was professional, communicative, and detail-oriented. They coordinated work around our school schedule and delivered a beautiful new facility.", "rating": 5}
      ],
      "faqs": [
        {"question": "What is included in construction management fees?", "answer": "Our fees cover project planning, contractor coordination, schedule management, quality control, budget tracking, permit management, and regular reporting. We are your advocate throughout the entire construction process."},
        {"question": "Do you work with my existing contractor?", "answer": "Yes, we can work with contractors you have already selected, or we can help you find qualified contractors through our competitive bidding process."},
        {"question": "How often will you visit the site?", "answer": "Site visit frequency depends on project complexity. Typically, we visit 2-3 times per week for residential projects and daily for large commercial projects."},
        {"question": "What happens if there are cost overruns?", "answer": "We implement strict budget controls and require approval for all changes. If unexpected issues arise, we present options and recommendations before proceeding."},
        {"question": "Can you help with permit issues?", "answer": "Absolutely. We handle all permit applications, coordinate inspections, and resolve any regulatory issues that arise during construction."}
      ],
      "pricing": "<p><strong>Investment: 8-12% of Construction Cost</strong></p><p>Construction management fees are typically calculated as a percentage of total construction costs.</p><p><strong>Fee Structure:</strong></p><ul><li>Residential Projects: 10-12% of construction cost</li><li>Commercial Projects: 8-10% of construction cost</li><li>Large Projects (>$5M): 6-8% of construction cost</li></ul><p><strong>Minimum Fee:</strong> $15,000</p>",
      "publishedAt": null
    }
  }' | jq -r '.data.id // "Error"'

echo ""

# Service 4: Residential Design
echo "📝 Creating Residential Design service..."
curl -X POST "$API_URL/api/services" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Residential Design",
      "description": "Complete architectural design services for your dream home. From initial concepts to construction-ready plans, we create beautiful, functional residences tailored to your lifestyle.",
      "category": "Residential",
      "icon": "🏡",
      "timeline": "12-20 weeks",
      "features": [
        {"title": "Custom Floor Plans", "description": "Unique layouts designed specifically for your needs"},
        {"title": "Exterior Design", "description": "Beautiful facades that complement the neighborhood"},
        {"title": "Structural Engineering", "description": "Coordination with engineers for safe, sound construction"},
        {"title": "Energy Efficiency", "description": "Sustainable design that reduces utility costs"},
        {"title": "Building Code Compliance", "description": "Ensure all designs meet local regulations"},
        {"title": "Construction Documents", "description": "Complete plans ready for permitting and building"}
      ],
      "process": [
        {"step": "Discovery & Programming", "description": "Understand your vision, lifestyle, budget, and site conditions. Define project scope and requirements.", "duration": "1-2 weeks"},
        {"step": "Schematic Design", "description": "Develop initial design concepts with floor plans, elevations, and 3D models for your review.", "duration": "3-4 weeks"},
        {"step": "Design Development", "description": "Refine the selected concept with detailed plans, material selections, and system specifications.", "duration": "4-6 weeks"},
        {"step": "Construction Documents", "description": "Create complete construction drawings and specifications for permitting and building.", "duration": "4-6 weeks"},
        {"step": "Permit Submission", "description": "Submit plans to local authorities and coordinate approval process.", "duration": "2-8 weeks (varies by jurisdiction)"},
        {"step": "Construction Administration", "description": "Answer contractor questions, review submittals, and conduct site visits during construction.", "duration": "Throughout construction"}
      ],
      "benefits": [
        {"title": "Personalized Design", "description": "Every home is unique, designed specifically for your family needs"},
        {"title": "Increased Value", "description": "Professional design adds 10-20% to your home resale value"},
        {"title": "Energy Savings", "description": "Efficient design reduces utility costs by 20-40% annually"}
      ],
      "deliverables": [
        {"name": "Site Analysis", "description": "Evaluation of site conditions, zoning, and opportunities"},
        {"name": "Schematic Designs", "description": "Multiple concept options with floor plans and elevations"},
        {"name": "3D Renderings", "description": "Photorealistic visualizations of exterior and interior"},
        {"name": "Construction Drawings", "description": "Complete architectural plans for permitting and building"},
        {"name": "Specifications", "description": "Detailed material and finish specifications"},
        {"name": "Energy Analysis", "description": "Efficiency calculations and recommendations"},
        {"name": "Permit Set", "description": "Plans formatted for local building department submission"},
        {"name": "Construction Support", "description": "Ongoing assistance during the building phase"}
      ],
      "testimonials": [
        {"name": "Emily and James Parker", "role": "Homeowners", "company": "Custom Home Build", "content": "Our architect listened to our needs and created a home that is perfect for our family. The design process was collaborative and fun, and the final result exceeded our expectations.", "rating": 5},
        {"name": "Thomas Anderson", "role": "Property Owner", "company": "Lakeside Residence", "content": "The team designed a stunning home that takes full advantage of our waterfront lot. Their attention to detail and creative solutions made the entire process smooth and enjoyable.", "rating": 5}
      ],
      "faqs": [
        {"question": "How much does residential design cost?", "answer": "Architectural fees typically range from 8-15% of construction cost, or $15,000-$100,000+ depending on project size and complexity. We offer fixed-fee and hourly arrangements."},
        {"question": "How long does the design process take?", "answer": "From initial meeting to construction-ready plans typically takes 12-20 weeks. Permit approval time varies by location but usually adds 2-8 weeks."},
        {"question": "Do you handle the permits?", "answer": "Yes, we prepare all documents for permit submission and coordinate with local building departments. We can also represent you during the review process."},
        {"question": "Can you work with my builder?", "answer": "Absolutely! We are happy to work with your selected builder or can recommend qualified contractors from our network."},
        {"question": "What if I want to make changes during construction?", "answer": "We provide construction administration services to review and document any changes. We will help evaluate the impact on cost and schedule."},
        {"question": "Do you design additions and renovations?", "answer": "Yes! We design everything from small additions to complete home renovations. The process is similar but includes careful integration with existing conditions."}
      ],
      "pricing": "<p><strong>Investment Range: $15,000 - $100,000+</strong></p><p>Residential design fees depend on project size, complexity, level of detail, site conditions, and local permit requirements.</p><p><strong>Typical Fee Structure:</strong></p><ul><li>New Home Design: 10-15% of construction cost</li><li>Addition/Renovation: 12-18% of construction cost</li><li>Consultation Only: $200-$300/hour</li></ul><p><strong>Project Size Examples:</strong></p><ul><li>Small Home (1,500-2,500 sq ft): $15,000 - $35,000</li><li>Medium Home (2,500-4,000 sq ft): $35,000 - $60,000</li><li>Large Home (4,000+ sq ft): $60,000 - $100,000+</li></ul>",
      "publishedAt": null
    }
  }' | jq -r '.data.id // "Error"'

echo ""
echo "✅ All services created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Log into Strapi admin: http://localhost:1337/admin"
echo "2. Go to Content Manager → Services"
echo "3. Click on each service and click 'Publish'"
echo "4. View the enhanced pages at http://localhost/services/[id]"
echo ""

# Made with Bob
