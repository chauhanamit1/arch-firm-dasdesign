#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     SonarQube Analysis - Architectural Firm Website   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
    echo -e "${RED}❌ Error: SONAR_TOKEN environment variable is not set${NC}"
    echo ""
    echo -e "${YELLOW}Please set your SonarQube token:${NC}"
    echo -e "  ${GREEN}export SONAR_TOKEN='your_token_here'${NC}"
    echo ""
    echo -e "${YELLOW}To get a token:${NC}"
    echo "  1. Go to http://localhost:9000"
    echo "  2. Login (default: admin/admin)"
    echo "  3. Click profile icon > My Account > Security"
    echo "  4. Generate new token"
    echo ""
    exit 1
fi

# Check if SonarQube is running
echo -e "${BLUE}🔍 Checking SonarQube availability...${NC}"
if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:9000 | grep -q "200"; then
    echo -e "${RED}❌ SonarQube is not accessible at http://localhost:9000${NC}"
    echo -e "${YELLOW}Please start Docker containers:${NC}"
    echo -e "  ${GREEN}docker-compose up -d${NC}"
    exit 1
fi
echo -e "${GREEN}✅ SonarQube is running${NC}"
echo ""

# Optional: Run tests with coverage
read -p "$(echo -e ${YELLOW}Run tests with coverage first? [y/N]:${NC} )" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🧪 Running backend tests with coverage...${NC}"
    cd backend
    npm run test -- --coverage --passWithNoTests 2>/dev/null || echo "No backend tests found"
    cd ..
    
    echo -e "${BLUE}🧪 Running frontend tests with coverage...${NC}"
    cd frontend
    npm run test -- --coverage --passWithNoTests 2>/dev/null || echo "No frontend tests found"
    cd ..
    echo ""
fi

# Run SonarQube analysis
echo -e "${BLUE}📊 Running SonarQube analysis...${NC}"
echo -e "${YELLOW}This may take a few minutes...${NC}"
echo ""

npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=${SONAR_TOKEN}

# Check if analysis was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              ✅ Analysis Complete!                     ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}📈 View results at:${NC}"
    echo -e "  ${GREEN}http://localhost:9000/dashboard?id=architectural-firm-website${NC}"
    echo ""
    echo -e "${YELLOW}Key Metrics to Review:${NC}"
    echo "  • Bugs and Vulnerabilities"
    echo "  • Code Smells"
    echo "  • Test Coverage"
    echo "  • Code Duplications"
    echo "  • Security Hotspots"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Analysis failed!${NC}"
    echo -e "${YELLOW}Check the error messages above for details.${NC}"
    exit 1
fi

# Made with Bob
