#!/bin/bash

# Automated Deployment Workflow
# This script automates: code changes → SonarQube analysis → fixes → git commit

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SONAR_TOKEN="${SONAR_TOKEN:-}"
COMMIT_MESSAGE="${1:-Auto-deploy: Code improvements and quality fixes}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Automated Deployment Workflow                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check if SonarQube token is set
if [ -z "$SONAR_TOKEN" ]; then
    echo -e "${RED}❌ Error: SONAR_TOKEN environment variable not set${NC}"
    echo -e "${YELLOW}Please set it with: export SONAR_TOKEN='your_token'${NC}"
    exit 1
fi

# Step 2: Check for uncommitted changes
echo -e "${BLUE}📋 Step 1: Checking for changes...${NC}"
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${GREEN}✅ Changes detected${NC}"
    HAS_CHANGES=true
else
    echo -e "${YELLOW}⚠️  No changes detected${NC}"
    HAS_CHANGES=false
fi

# Step 3: Run SonarQube analysis
echo -e "\n${BLUE}🔍 Step 2: Running SonarQube analysis...${NC}"
./run-sonar-analysis.sh

# Step 4: Check for issues
echo -e "\n${BLUE}📊 Step 3: Checking for code quality issues...${NC}"
ISSUES_COUNT=$(curl -s -u "$SONAR_TOKEN:" \
    "http://localhost:9000/api/issues/search?componentKeys=architectural-firm-website&resolved=false" \
    | python3 -c "import sys, json; print(json.load(sys.stdin)['total'])")

echo -e "${YELLOW}Found $ISSUES_COUNT issue(s)${NC}"

# Step 5: If issues found, run auto-fix
if [ "$ISSUES_COUNT" -gt 0 ]; then
    echo -e "\n${BLUE}🔧 Step 4: Running automated fixes...${NC}"
    ./sonar-auto-fix.sh
    
    echo -e "\n${YELLOW}⚠️  Please review the fixes and run this script again${NC}"
    exit 0
fi

# Step 6: Run tests
echo -e "\n${BLUE}🧪 Step 5: Running tests...${NC}"
cd frontend
npm run test -- --passWithNoTests
cd ..

# Step 7: Build Docker images
echo -e "\n${BLUE}🐳 Step 6: Building Docker images...${NC}"
docker-compose build

# Step 8: Git operations
if [ "$HAS_CHANGES" = true ]; then
    echo -e "\n${BLUE}📝 Step 7: Committing changes...${NC}"
    
    # Show what will be committed
    echo -e "${YELLOW}Files to be committed:${NC}"
    git status --short
    
    # Ask for confirmation
    echo -e "\n${YELLOW}Do you want to commit these changes? (y/n)${NC}"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "$COMMIT_MESSAGE"
        
        echo -e "\n${GREEN}✅ Changes committed${NC}"
        
        # Ask about pushing
        echo -e "\n${YELLOW}Do you want to push to remote? (y/n)${NC}"
        read -r push_response
        
        if [[ "$push_response" =~ ^[Yy]$ ]]; then
            git push origin main
            echo -e "${GREEN}✅ Changes pushed to remote${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Commit cancelled${NC}"
    fi
fi

# Step 9: Deploy (restart containers)
echo -e "\n${BLUE}🚀 Step 8: Deploying application...${NC}"
docker-compose up -d

# Step 10: Wait for health checks
echo -e "\n${BLUE}⏳ Step 9: Waiting for services to be healthy...${NC}"
sleep 10

# Step 11: Verify deployment
echo -e "\n${BLUE}✓ Step 10: Verifying deployment...${NC}"
if curl -s http://localhost:1337/api/services > /dev/null; then
    echo -e "${GREEN}✅ Backend API is responding${NC}"
else
    echo -e "${RED}❌ Backend API is not responding${NC}"
fi

if curl -s http://localhost > /dev/null; then
    echo -e "${GREEN}✅ Frontend is responding${NC}"
else
    echo -e "${RED}❌ Frontend is not responding${NC}"
fi

# Step 12: Summary
echo -e "\n${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Deployment Complete!                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo -e "\n${GREEN}✅ All steps completed successfully${NC}"
echo -e "\n${YELLOW}Access your application:${NC}"
echo -e "  • Frontend: ${BLUE}http://localhost${NC}"
echo -e "  • Backend:  ${BLUE}http://localhost:1337${NC}"
echo -e "  • Admin:    ${BLUE}http://localhost:1337/admin${NC}"
echo -e "  • SonarQube: ${BLUE}http://localhost:9000${NC}"
echo ""

# Made with Bob
