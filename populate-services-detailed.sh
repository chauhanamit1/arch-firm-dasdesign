#!/bin/bash

# Populate services with comprehensive details
echo "Populating services with detailed information..."

# Service 1: Interior Design
curl -X PUT http://localhost:1337/api/services/zsbxy1zhbng03jxiwth4yp54 \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "title": "Interior Design",
      "description": "Transform your space with our comprehensive interior design services. We create functional, beautiful environments that reflect your style and enhance your daily life.",
      "category": "Both",
      "icon": "🏠",
      "features": [
        "Space Planning & Layout Design",
        "Color Scheme & Material Selection",
        "3D Visualization & Renderings",
        "Furniture & Fixture Selection",
        "Lighting Design",
        "Custom Millwork Design"
      ],
      "process": [
        "Initial Consultation & Site Visit",
        "Concept Development & Mood Boards",
        "Design Development & 3D Renderings",
        "Material & Furniture Selection",
        "Construction Documentation",
        "Installation & Styling"
      ],
      "pricing": "Starting from $5,000 for residential projects",
      "benefits": [
        "Maximize space functionality",
        "Increase property value",
        "Personalized design solutions",
        "Professional project management",
        "Access to trade-only resources"
      ],
      "timeline": "6-12 weeks depending on project scope",
      "deliverables": [
        "Detailed floor plans",
        "3D renderings",
        "Material & finish schedules",
        "Furniture layouts",
        "Lighting plans",
        "Installation supervision"
      ]
    }
  }'

echo ""

# Service 2: Space Planning
curl -X PUT http://localhost:1337/api/services/hkotebprwrg1s8f8r83ielt6 \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "title": "Space Planning",
      "description": "Optimize your space with strategic planning that balances functionality, flow, and aesthetics. Perfect for renovations, new builds, or office reconfigurations.",
      "category": "Both",
      "icon": "📐",
      "features": [
        "Functional Layout Analysis",
        "Traffic Flow Optimization",
        "Furniture Placement Planning",
        "Storage Solutions Design",
        "Multi-functional Space Design",
        "Accessibility Compliance"
      ],
      "process": [
        "Space Assessment & Measurements",
        "Needs Analysis & Programming",
        "Concept Layouts (3-5 options)",
        "Client Review & Refinement",
        "Final Layout Documentation",
        "Implementation Support"
      ],
      "pricing": "Starting from $3,000",
      "benefits": [
        "Maximize usable space",
        "Improve workflow efficiency",
        "Reduce renovation costs",
        "Future-proof design",
        "ADA compliance guidance"
      ],
      "timeline": "3-6 weeks",
      "deliverables": [
        "Scaled floor plans",
        "Furniture layouts",
        "Circulation diagrams",
        "Space utilization analysis",
        "Implementation guidelines"
      ]
    }
  }'

echo ""

# Service 3: Construction Management
curl -X PUT http://localhost:1337/api/services/fz04twvoyv3bu1gz1j3j5arz \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "title": "Construction Management",
      "description": "Expert oversight of your construction project from start to finish. We ensure quality, timeline, and budget adherence while managing all contractor relationships.",
      "category": "Both",
      "icon": "🏗️",
      "features": [
        "Contractor Selection & Vetting",
        "Budget Management & Cost Control",
        "Schedule Coordination",
        "Quality Control Inspections",
        "Change Order Management",
        "Final Walkthrough & Punch List"
      ],
      "process": [
        "Pre-construction Planning",
        "Contractor Bidding & Selection",
        "Construction Phase Management",
        "Regular Site Inspections",
        "Progress Reporting",
        "Project Closeout"
      ],
      "pricing": "10-15% of construction costs",
      "benefits": [
        "Single point of contact",
        "Cost savings through oversight",
        "Quality assurance",
        "Timeline adherence",
        "Stress-free construction",
        "Professional documentation"
      ],
      "timeline": "Duration of construction project",
      "deliverables": [
        "Weekly progress reports",
        "Budget tracking",
        "Site inspection reports",
        "Change order documentation",
        "Final project documentation",
        "Warranty information"
      ]
    }
  }'

echo ""

# Service 4: Residential Design
curl -X PUT http://localhost:1337/api/services/nhbwx6o1rnt3fn7yasbx71ze \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "title": "Residential Design",
      "description": "Complete architectural design services for your dream home. From concept to construction, we create living spaces that perfectly match your lifestyle and aspirations.",
      "category": "Residential",
      "icon": "🏡",
      "features": [
        "Custom Home Design",
        "Renovation & Addition Planning",
        "Kitchen & Bathroom Design",
        "Outdoor Living Spaces",
        "Sustainable Design Solutions",
        "Smart Home Integration"
      ],
      "process": [
        "Discovery & Site Analysis",
        "Schematic Design",
        "Design Development",
        "Construction Documents",
        "Permit Assistance",
        "Construction Administration"
      ],
      "pricing": "Starting from $15,000 for full home design",
      "benefits": [
        "Personalized design solutions",
        "Increased home value",
        "Energy efficiency",
        "Optimized natural light",
        "Future-proof design",
        "Permit-ready drawings"
      ],
      "timeline": "3-6 months for design phase",
      "deliverables": [
        "Architectural drawings",
        "3D renderings & walkthroughs",
        "Material specifications",
        "Structural plans",
        "MEP coordination",
        "Permit application support"
      ]
    }
  }'

echo ""
echo "✅ Services populated with detailed information!"

# Made with Bob
