#!/bin/bash

# Script to populate 6 diverse architectural projects for DAS Design Studio

API_URL="http://localhost:1337"

echo "🏗️  Populating DAS Design Studio Projects..."
echo "=========================================="

# Function to create a project
create_project() {
    local title="$1"
    local category="$2"
    local description="$3"
    local location="$4"
    local size="$5"
    local year="$6"
    local status="$7"
    
    echo "Creating project: $title..."
    
    curl -X POST "$API_URL/api/projects" \
        -H "Content-Type: application/json" \
        -d "{
            \"data\": {
                \"title\": \"$title\",
                \"category\": \"$category\",
                \"description\": \"$description\",
                \"location\": \"$location\",
                \"size\": \"$size\",
                \"year\": $year,
                \"status\": \"$status\",
                \"publishedAt\": \"$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")\"
            }
        }" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✓ Created: $title"
    else
        echo "✗ Failed to create: $title"
    fi
}

# Delete existing projects
echo ""
echo "Cleaning up existing projects..."
curl -s "$API_URL/api/projects" | jq -r '.data[].documentId' | while read id; do
    curl -X DELETE "$API_URL/api/projects/$id" > /dev/null 2>&1
done
echo "✓ Cleanup complete"
echo ""

# Project 1: Luxury Penthouse
create_project \
    "Skyline Penthouse" \
    "Residential" \
    "A stunning 5-bedroom penthouse featuring floor-to-ceiling windows, minimalist design, and breathtaking city views. The open-plan living space seamlessly integrates indoor and outdoor areas with a wraparound terrace. Custom Italian marble, smart home technology, and bespoke furniture create an atmosphere of refined luxury." \
    "Manhattan, New York" \
    "4,500 sq ft" \
    2024 \
    "Completed"

# Project 2: Modern Hospital
create_project \
    "Healing Spaces Medical Center" \
    "Healthcare" \
    "A state-of-the-art 200-bed hospital designed with patient wellness at its core. Features include healing gardens, natural light-filled patient rooms, advanced medical facilities, and sustainable design elements. The architecture promotes a calming environment that aids in patient recovery while supporting efficient medical workflows." \
    "San Francisco, California" \
    "250,000 sq ft" \
    2023 \
    "Completed"

# Project 3: International School
create_project \
    "Future Academy" \
    "Education" \
    "An innovative K-12 school campus designed to inspire learning through architecture. Features flexible classrooms, collaborative learning spaces, STEM labs, performing arts center, and outdoor learning environments. Sustainable design includes solar panels, rainwater harvesting, and natural ventilation systems." \
    "Austin, Texas" \
    "180,000 sq ft" \
    2024 \
    "In Progress"

# Project 4: Urban Plaza
create_project \
    "Metropolitan Square" \
    "Public Space" \
    "A vibrant urban plaza that serves as the heart of downtown revitalization. Features include interactive water features, public art installations, amphitheater seating, green spaces, and flexible event areas. The design encourages community gathering while providing respite from the urban environment." \
    "Chicago, Illinois" \
    "75,000 sq ft" \
    2023 \
    "Completed"

# Project 5: Luxury Shopping Mall
create_project \
    "The Promenade" \
    "Retail" \
    "A next-generation retail destination combining luxury shopping with experiential spaces. Features high-end boutiques, gourmet dining, art galleries, and entertainment venues. The design incorporates natural materials, abundant greenery, and innovative lighting to create an immersive shopping experience." \
    "Dubai, UAE" \
    "500,000 sq ft" \
    2024 \
    "In Progress"

# Project 6: Corporate Headquarters
create_project \
    "Tech Innovation Hub" \
    "Commercial" \
    "A cutting-edge corporate campus for a leading technology company. Features include open-plan workspaces, collaboration zones, wellness facilities, rooftop gardens, and sustainable design achieving LEED Platinum certification. The architecture reflects the company's innovative culture while prioritizing employee wellbeing." \
    "Seattle, Washington" \
    "320,000 sq ft" \
    2023 \
    "Completed"

echo ""
echo "=========================================="
echo "✓ All projects created successfully!"
echo ""
echo "View projects at: http://localhost/portfolio"
echo "Or via Strapi admin: http://localhost:1337/admin"

# Made with Bob
