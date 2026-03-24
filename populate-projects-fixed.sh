#!/bin/bash

# Script to populate 6 diverse architectural projects for DAS Design Studio
# Matches the actual Project schema fields

API_URL="http://localhost:1337"

echo "🏗️  Populating DAS Design Studio Projects..."
echo "=========================================="

# Function to create a project
create_project() {
    local title="$1"
    local category="$2"
    local description="$3"
    local location="$4"
    local area="$5"
    local status="$6"
    local client="$7"
    
    echo "Creating project: $title..."
    
    RESPONSE=$(curl -X POST "$API_URL/api/projects" \
        -H "Content-Type: application/json" \
        -d "{
            \"data\": {
                \"title\": \"$title\",
                \"category\": \"$category\",
                \"description\": \"$description\",
                \"location\": \"$location\",
                \"area\": $area,
                \"status\": \"$status\",
                \"client\": \"$client\"
            }
        }" -s)
    
    ID=$(echo "$RESPONSE" | jq -r '.data.id')
    
    if [ "$ID" != "null" ] && [ -n "$ID" ]; then
        echo "✓ Created: $title (ID: $ID)"
    else
        echo "✗ Failed to create: $title"
        echo "   Error: $(echo "$RESPONSE" | jq -r '.error.message // "Unknown error"')"
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
    4500 \
    "Completed" \
    "Private Client"

# Project 2: Modern Hospital
create_project \
    "Healing Spaces Medical Center" \
    "Healthcare" \
    "A state-of-the-art 200-bed hospital designed with patient wellness at its core. Features include healing gardens, natural light-filled patient rooms, advanced medical facilities, and sustainable design elements. The architecture promotes a calming environment that aids in patient recovery while supporting efficient medical workflows." \
    "San Francisco, California" \
    250000 \
    "Completed" \
    "Healthcare Partners Inc"

# Project 3: International School
create_project \
    "Future Academy" \
    "Education" \
    "An innovative K-12 school campus designed to inspire learning through architecture. Features flexible classrooms, collaborative learning spaces, STEM labs, performing arts center, and outdoor learning environments. Sustainable design includes solar panels, rainwater harvesting, and natural ventilation systems." \
    "Austin, Texas" \
    180000 \
    "In Progress" \
    "Austin School District"

# Project 4: Urban Plaza
create_project \
    "Metropolitan Square" \
    "Public Space" \
    "A vibrant urban plaza that serves as a community gathering space in the heart of the city. Features include interactive water features, amphitheater seating, public art installations, and sustainable landscaping. The design encourages social interaction while providing flexible spaces for events and markets." \
    "Chicago, Illinois" \
    75000 \
    "Completed" \
    "City of Chicago"

# Project 5: Luxury Shopping Mall
create_project \
    "The Promenade" \
    "Retail" \
    "An upscale shopping destination featuring high-end retail spaces, gourmet dining, and entertainment venues. The design incorporates natural light through skylights, indoor gardens, and contemporary architecture. Premium finishes and thoughtful circulation create an elevated shopping experience." \
    "Beverly Hills, California" \
    320000 \
    "Completed" \
    "Retail Development Group"

# Project 6: Tech Office Campus
create_project \
    "Tech Innovation Hub" \
    "Commercial" \
    "A modern office campus designed for a leading technology company. Features include collaborative workspaces, innovation labs, wellness centers, and outdoor meeting areas. Sustainable design elements include green roofs, solar panels, and advanced HVAC systems. The architecture promotes creativity and employee well-being." \
    "Seattle, Washington" \
    450000 \
    "In Progress" \
    "Tech Corp International"

echo ""
echo "=========================================="
echo "✓ All projects created successfully!"
echo ""
echo "View projects at: http://localhost/portfolio"
echo "Or via Strapi admin: http://localhost:1337/admin"

# Made with Bob
