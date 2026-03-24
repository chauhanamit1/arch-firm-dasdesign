#!/bin/bash

echo "🔍 DAS Design Studio - Website Validation"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected=$3
    
    echo -n "Testing $name... "
    
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$STATUS" = "$expected" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $STATUS)"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $STATUS, expected $expected)"
        ((FAIL++))
        return 1
    fi
}

# Function to test content
test_content() {
    local name=$1
    local url=$2
    local search_term=$3
    
    echo -n "Testing $name content... "
    
    CONTENT=$(curl -s "$url" | grep -o "$search_term" | head -1)
    
    if [ -n "$CONTENT" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Found: $search_term)"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (Not found: $search_term)"
        ((FAIL++))
        return 1
    fi
}

# Function to test API data
test_api_data() {
    local name=$1
    local url=$2
    local min_count=$3
    
    echo -n "Testing $name API... "
    
    COUNT=$(curl -s "$url" | jq '.data | length' 2>/dev/null)
    
    if [ -n "$COUNT" ] && [ "$COUNT" -ge "$min_count" ]; then
        echo -e "${GREEN}✓ PASS${NC} ($COUNT items, expected >= $min_count)"
        ((PASS++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} ($COUNT items, expected >= $min_count)"
        ((FAIL++))
        return 1
    fi
}

echo "1. BASIC CONNECTIVITY"
echo "---------------------"
test_endpoint "Homepage" "http://localhost/" "200"
test_endpoint "Portfolio Page" "http://localhost/portfolio" "200"
test_endpoint "Favicon" "http://localhost/favicon.svg" "200"
test_endpoint "Backend API" "http://localhost:1337/api/projects" "200"
echo ""

echo "2. HOMEPAGE CONTENT"
echo "-------------------"
test_content "Site Title" "http://localhost/" "DAS Design Studio"
test_content "Hero Tagline" "http://localhost/" "Transforming Spaces"
test_content "Services Section" "http://localhost/" "Our Services"
test_content "Projects Section" "http://localhost/" "Featured Projects"
echo ""

echo "3. BACKEND DATA"
echo "---------------"
test_api_data "Projects" "http://localhost:1337/api/projects" "6"
test_api_data "Services" "http://localhost:1337/api/services" "1"
echo ""

echo "4. PROJECT LINKS"
echo "----------------"
# Get first 3 project IDs and test their pages
PROJECT_IDS=$(curl -s http://localhost:1337/api/projects | jq -r '.data[0:3][].documentId' 2>/dev/null)

if [ -n "$PROJECT_IDS" ]; then
    for ID in $PROJECT_IDS; do
        test_endpoint "Project $ID" "http://localhost/projects/$ID" "200"
    done
else
    echo -e "${RED}✗ FAIL${NC} (No project IDs found)"
    ((FAIL++))
fi
echo ""

echo "5. SERVICE LINKS"
echo "----------------"
# Get first 3 service IDs and test their pages
SERVICE_IDS=$(curl -s http://localhost:1337/api/services | jq -r '.data[0:3][].documentId' 2>/dev/null)

if [ -n "$SERVICE_IDS" ]; then
    for ID in $SERVICE_IDS; do
        test_endpoint "Service $ID" "http://localhost/services/$ID" "200"
    done
else
    echo -e "${RED}✗ FAIL${NC} (No service IDs found)"
    ((FAIL++))
fi
echo ""

echo "6. PORTFOLIO PAGE"
echo "-----------------"
test_endpoint "Portfolio Page" "http://localhost/portfolio" "200"
# Portfolio is client-side rendered, so we check the JS bundle
PORTFOLIO_JS=$(docker exec arch-firm-frontend find /app/.next -name "*.js" -type f -exec grep -l "Skyline Penthouse" {} \; 2>/dev/null | head -1)
if [ -n "$PORTFOLIO_JS" ]; then
    echo -e "Testing Portfolio Content... ${GREEN}✓ PASS${NC} (Found project data in build)"
    ((PASS++))
else
    echo -e "Testing Portfolio Content... ${RED}✗ FAIL${NC} (Project data not in build)"
    ((FAIL++))
fi
echo ""

echo "7. CONTAINER STATUS"
echo "-------------------"
CONTAINERS=$(docker ps --filter "name=arch-firm" --format "{{.Names}}" | wc -l)
if [ "$CONTAINERS" -ge "4" ]; then
    echo -e "Container Count... ${GREEN}✓ PASS${NC} ($CONTAINERS/4+ running)"
    ((PASS++))
else
    echo -e "Container Count... ${RED}✗ FAIL${NC} ($CONTAINERS/4 running)"
    ((FAIL++))
fi

FRONTEND_HEALTH=$(docker ps --filter "name=arch-firm-frontend" --format "{{.Status}}" | grep -o "healthy\|starting" | head -1)
if [ "$FRONTEND_HEALTH" = "healthy" ] || [ "$FRONTEND_HEALTH" = "starting" ]; then
    echo -e "Frontend Health... ${GREEN}✓ PASS${NC} ($FRONTEND_HEALTH)"
    ((PASS++))
else
    echo -e "Frontend Health... ${YELLOW}⚠ WARNING${NC} (Check: docker ps)"
fi
echo ""

echo "=========================================="
echo "SUMMARY"
echo "=========================================="
TOTAL=$((PASS + FAIL))
PERCENTAGE=$((PASS * 100 / TOTAL))

echo -e "Total Tests: $TOTAL"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo -e "Success Rate: $PERCENTAGE%"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    echo ""
    echo "🌐 Your website is fully functional:"
    echo "   - Homepage: http://localhost/"
    echo "   - Portfolio: http://localhost/portfolio"
    echo "   - Admin: http://localhost:1337/admin"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Check container logs: docker logs arch-firm-frontend"
    echo "   2. Verify backend: curl http://localhost:1337/api/projects"
    echo "   3. Restart containers: cd architectural-firm-website && docker-compose restart"
    exit 1
fi

# Made with Bob
