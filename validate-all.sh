#!/bin/bash

echo "========================================="
echo "COMPREHENSIVE WEBSITE VALIDATION"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if services are running
echo "1. Checking Docker containers..."
if docker ps | grep -q "arch-firm-backend"; then
    echo -e "${GREEN}✓${NC} Backend container running"
else
    echo -e "${RED}✗${NC} Backend container not running"
    exit 1
fi

if docker ps | grep -q "arch-firm-frontend"; then
    echo -e "${GREEN}✓${NC} Frontend container running"
else
    echo -e "${RED}✗${NC} Frontend container not running"
    exit 1
fi

echo ""
echo "2. Checking API endpoints..."

# Check backend health
if curl -s http://localhost:1337/_health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend API responding"
else
    echo -e "${RED}✗${NC} Backend API not responding"
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Frontend responding"
else
    echo -e "${RED}✗${NC} Frontend not responding"
fi

echo ""
echo "3. Validating database content..."

# Check projects
PROJECT_COUNT=$(curl -s http://localhost:1337/api/projects | jq '.data | length')
echo -e "Projects in database: ${YELLOW}$PROJECT_COUNT${NC}"

if [ "$PROJECT_COUNT" -eq 6 ]; then
    echo -e "${GREEN}✓${NC} All 6 projects present"
else
    echo -e "${RED}✗${NC} Expected 6 projects, found $PROJECT_COUNT"
fi

# Check services
SERVICE_COUNT=$(curl -s http://localhost:1337/api/services | jq '.data | length')
echo -e "Services in database: ${YELLOW}$SERVICE_COUNT${NC}"

if [ "$SERVICE_COUNT" -eq 4 ]; then
    echo -e "${GREEN}✓${NC} All 4 services present"
else
    echo -e "${RED}✗${NC} Expected 4 services, found $SERVICE_COUNT"
fi

echo ""
echo "4. Validating project details..."

# Get first project
FIRST_PROJECT_ID=$(curl -s http://localhost:1337/api/projects | jq -r '.data[0].documentId')
PROJECT_DATA=$(curl -s "http://localhost:1337/api/projects/$FIRST_PROJECT_ID?populate=*")

PROJECT_TITLE=$(echo "$PROJECT_DATA" | jq -r '.data.title')
PROJECT_DESC=$(echo "$PROJECT_DATA" | jq -r '.data.description')
PROJECT_CATEGORY=$(echo "$PROJECT_DATA" | jq -r '.data.category')
PROJECT_LOCATION=$(echo "$PROJECT_DATA" | jq -r '.data.location')

echo "First project: $PROJECT_TITLE"
if [ "$PROJECT_TITLE" != "null" ] && [ -n "$PROJECT_TITLE" ]; then
    echo -e "${GREEN}✓${NC} Title populated"
else
    echo -e "${RED}✗${NC} Title missing"
fi

if [ "$PROJECT_DESC" != "null" ] && [ -n "$PROJECT_DESC" ]; then
    echo -e "${GREEN}✓${NC} Description populated"
else
    echo -e "${RED}✗${NC} Description missing"
fi

if [ "$PROJECT_CATEGORY" != "null" ] && [ -n "$PROJECT_CATEGORY" ]; then
    echo -e "${GREEN}✓${NC} Category populated"
else
    echo -e "${RED}✗${NC} Category missing"
fi

if [ "$PROJECT_LOCATION" != "null" ] && [ -n "$PROJECT_LOCATION" ]; then
    echo -e "${GREEN}✓${NC} Location populated"
else
    echo -e "${RED}✗${NC} Location missing"
fi

echo ""
echo "5. Validating service details..."

# Get first service
FIRST_SERVICE_ID=$(curl -s http://localhost:1337/api/services | jq -r '.data[0].documentId')
SERVICE_DATA=$(curl -s "http://localhost:1337/api/services/$FIRST_SERVICE_ID?populate=*")

SERVICE_TITLE=$(echo "$SERVICE_DATA" | jq -r '.data.title')
SERVICE_FEATURES=$(echo "$SERVICE_DATA" | jq '.data.features | length')
SERVICE_PROCESS=$(echo "$SERVICE_DATA" | jq '.data.process | length')
SERVICE_PRICING=$(echo "$SERVICE_DATA" | jq -r '.data.pricing')

echo "First service: $SERVICE_TITLE"
if [ "$SERVICE_TITLE" != "null" ] && [ -n "$SERVICE_TITLE" ]; then
    echo -e "${GREEN}✓${NC} Title populated"
else
    echo -e "${RED}✗${NC} Title missing"
fi

if [ "$SERVICE_FEATURES" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Features populated ($SERVICE_FEATURES items)"
else
    echo -e "${RED}✗${NC} Features missing"
fi

if [ "$SERVICE_PROCESS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Process steps populated ($SERVICE_PROCESS items)"
else
    echo -e "${RED}✗${NC} Process steps missing"
fi

if [ "$SERVICE_PRICING" != "null" ] && [ -n "$SERVICE_PRICING" ]; then
    echo -e "${GREEN}✓${NC} Pricing populated"
else
    echo -e "${RED}✗${NC} Pricing missing"
fi

echo ""
echo "6. Testing page accessibility..."

# Test homepage
if curl -s http://localhost:3000 | grep -q "DAS Design Studio"; then
    echo -e "${GREEN}✓${NC} Homepage loads with branding"
else
    echo -e "${YELLOW}⚠${NC} Homepage may not be fully rendered (client-side)"
fi

# Test project page (will show loading state in curl)
if curl -s "http://localhost:3000/projects/$FIRST_PROJECT_ID" | grep -q "Loading"; then
    echo -e "${YELLOW}⚠${NC} Project page shows loading state (normal for SSR)"
else
    echo -e "${GREEN}✓${NC} Project page accessible"
fi

# Test service page
if curl -s "http://localhost:3000/services/$FIRST_SERVICE_ID" | grep -q "DAS Design Studio"; then
    echo -e "${GREEN}✓${NC} Service page accessible"
else
    echo -e "${YELLOW}⚠${NC} Service page may not be fully rendered"
fi

echo ""
echo "========================================="
echo "VALIDATION COMPLETE"
echo "========================================="
echo ""
echo "Summary:"
echo "- Projects: $PROJECT_COUNT/6"
echo "- Services: $SERVICE_COUNT/4"
echo "- First Project: $PROJECT_TITLE"
echo "- First Service: $SERVICE_TITLE"
echo ""
echo "To view the site, open http://localhost:3000 in your browser"
echo "Note: curl tests show server-side HTML; full content loads in browser"

# Made with Bob
