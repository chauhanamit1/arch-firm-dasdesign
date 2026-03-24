#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SonarQube Automated Analysis & Fix Workflow         ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if SONAR_TOKEN is set
if [ -z "$SONAR_TOKEN" ]; then
    echo -e "${RED}❌ Error: SONAR_TOKEN environment variable is not set${NC}"
    echo -e "${YELLOW}Please set your token: export SONAR_TOKEN='your_token'${NC}"
    exit 1
fi

# Step 1: Run SonarQube Analysis
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Step 1: Running SonarQube Analysis${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=${SONAR_TOKEN} \
  > /tmp/sonar-analysis.log 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Analysis failed!${NC}"
    cat /tmp/sonar-analysis.log
    exit 1
fi

echo -e "${GREEN}✅ Analysis complete!${NC}"
echo ""

# Step 2: Fetch Issues from SonarQube API
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔍 Step 2: Fetching Issues from SonarQube${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Fetch issues using SonarQube API
ISSUES_JSON=$(curl -s -u "${SONAR_TOKEN}:" \
  "http://localhost:9000/api/issues/search?componentKeys=architectural-firm-website&resolved=false&ps=100")

# Parse and display issues
TOTAL_ISSUES=$(echo "$ISSUES_JSON" | grep -o '"total":[0-9]*' | head -1 | grep -o '[0-9]*')

if [ -z "$TOTAL_ISSUES" ] || [ "$TOTAL_ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✅ No issues found! Code quality is excellent.${NC}"
    echo ""
    echo -e "${BLUE}View dashboard: ${GREEN}http://localhost:9000/dashboard?id=architectural-firm-website${NC}"
    exit 0
fi

echo -e "${YELLOW}Found ${TOTAL_ISSUES} issue(s)${NC}"
echo ""

# Save issues to file for analysis
echo "$ISSUES_JSON" > /tmp/sonar-issues.json

# Parse and categorize issues
BUGS=$(echo "$ISSUES_JSON" | grep -o '"type":"BUG"' | wc -l | tr -d ' ')
VULNERABILITIES=$(echo "$ISSUES_JSON" | grep -o '"type":"VULNERABILITY"' | wc -l | tr -d ' ')
CODE_SMELLS=$(echo "$ISSUES_JSON" | grep -o '"type":"CODE_SMELL"' | wc -l | tr -d ' ')
SECURITY_HOTSPOTS=$(echo "$ISSUES_JSON" | grep -o '"type":"SECURITY_HOTSPOT"' | wc -l | tr -d ' ')

echo -e "${CYAN}Issue Breakdown:${NC}"
echo -e "  🐛 Bugs: ${RED}${BUGS}${NC}"
echo -e "  🔒 Vulnerabilities: ${RED}${VULNERABILITIES}${NC}"
echo -e "  💡 Code Smells: ${YELLOW}${CODE_SMELLS}${NC}"
echo -e "  🔐 Security Hotspots: ${YELLOW}${SECURITY_HOTSPOTS}${NC}"
echo ""

# Step 3: Generate Fix Report
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📝 Step 3: Generating Fix Report${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Create detailed report
REPORT_FILE="sonar-issues-report-$(date +%Y%m%d-%H%M%S).md"

cat > "$REPORT_FILE" << EOF
# SonarQube Issues Report
**Generated**: $(date)
**Project**: Architectural Firm Website
**Total Issues**: ${TOTAL_ISSUES}

## Summary
- 🐛 **Bugs**: ${BUGS}
- 🔒 **Vulnerabilities**: ${VULNERABILITIES}
- 💡 **Code Smells**: ${CODE_SMELLS}
- 🔐 **Security Hotspots**: ${SECURITY_HOTSPOTS}

## Detailed Issues

EOF

# Parse and add detailed issues to report
echo "$ISSUES_JSON" | python3 -c "
import json
import sys

try:
    data = json.load(sys.stdin)
    issues = data.get('issues', [])
    
    for i, issue in enumerate(issues[:20], 1):  # Limit to first 20 issues
        severity = issue.get('severity', 'UNKNOWN')
        issue_type = issue.get('type', 'UNKNOWN')
        message = issue.get('message', 'No message')
        component = issue.get('component', '').split(':')[-1]
        line = issue.get('line', 'N/A')
        rule = issue.get('rule', 'N/A')
        
        print(f'### Issue {i}: {severity} - {issue_type}')
        print(f'**File**: \`{component}\`')
        print(f'**Line**: {line}')
        print(f'**Rule**: {rule}')
        print(f'**Message**: {message}')
        print()
        
except Exception as e:
    print(f'Error parsing issues: {e}', file=sys.stderr)
" >> "$REPORT_FILE" 2>/dev/null || echo "Could not parse detailed issues" >> "$REPORT_FILE"

echo -e "${GREEN}✅ Report generated: ${REPORT_FILE}${NC}"
echo ""

# Display top 5 issues
echo -e "${YELLOW}Top 5 Issues:${NC}"
head -n 50 "$REPORT_FILE" | tail -n 40
echo ""

# Step 4: Ask for confirmation before fixing
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🔧 Step 4: Fix Recommendations${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}Review the issues above and the detailed report: ${REPORT_FILE}${NC}"
echo ""
echo -e "${CYAN}Recommended Actions:${NC}"
echo "1. Review the full report file"
echo "2. View issues in SonarQube dashboard: http://localhost:9000"
echo "3. Prioritize fixes: Bugs > Vulnerabilities > Code Smells"
echo "4. Run automated fixes for safe issues (if available)"
echo ""

read -p "$(echo -e ${YELLOW}Would you like to see suggested fixes? [y/N]:${NC} )" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}Generating fix suggestions...${NC}"
    echo ""
    
    # Create fix suggestions file
    FIX_FILE="sonar-fix-suggestions-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$FIX_FILE" << 'FIXEOF'
# SonarQube Fix Suggestions

## Common Fixes

### 1. TypeScript Strict Mode Issues
**Problem**: Missing type annotations
**Fix**: Add explicit types to function parameters and return values
```typescript
// Before
function getData(id) {
  return fetch(`/api/${id}`);
}

// After
function getData(id: string): Promise<Response> {
  return fetch(`/api/${id}`);
}
```

### 2. Unused Variables
**Problem**: Variables declared but never used
**Fix**: Remove unused variables or prefix with underscore if intentionally unused
```typescript
// Before
const unusedVar = 'test';

// After - Remove it or:
const _unusedVar = 'test'; // Intentionally unused
```

### 3. Console Statements
**Problem**: console.log in production code
**Fix**: Use proper logging library or remove
```typescript
// Before
console.log('Debug info');

// After
// Remove or use proper logger
logger.debug('Debug info');
```

### 4. Missing Error Handling
**Problem**: Promises without catch handlers
**Fix**: Add proper error handling
```typescript
// Before
fetch('/api/data').then(res => res.json());

// After
fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error('Error:', err));
```

### 5. Cognitive Complexity
**Problem**: Functions too complex
**Fix**: Break down into smaller functions
```typescript
// Before: Complex function with many conditions

// After: Split into smaller, focused functions
function validateInput(input: string): boolean {
  return isNotEmpty(input) && isValidFormat(input);
}
```

## Next Steps

1. **Review Each Issue**: Check the SonarQube dashboard for specific line numbers
2. **Prioritize**: Fix bugs and vulnerabilities first
3. **Test**: Run tests after each fix
4. **Commit**: Commit fixes incrementally with clear messages
5. **Re-analyze**: Run SonarQube analysis again to verify fixes

## Automated Fix Commands

```bash
# Run ESLint auto-fix (for JavaScript/TypeScript issues)
cd frontend && npx eslint --fix src/
cd backend && npx eslint --fix src/

# Run Prettier (for formatting issues)
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"

# Re-run SonarQube analysis
export SONAR_TOKEN="your_token"
./run-sonar-analysis.sh
```

FIXEOF
    
    echo -e "${GREEN}✅ Fix suggestions saved to: ${FIX_FILE}${NC}"
    echo ""
    cat "$FIX_FILE"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Workflow Complete!${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📊 View Dashboard:${NC}"
echo -e "  ${GREEN}http://localhost:9000/dashboard?id=architectural-firm-website${NC}"
echo ""
echo -e "${BLUE}📝 Reports Generated:${NC}"
echo -e "  - ${YELLOW}${REPORT_FILE}${NC}"
if [ -f "$FIX_FILE" ]; then
    echo -e "  - ${YELLOW}${FIX_FILE}${NC}"
fi
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Review the reports above"
echo "2. Check the SonarQube dashboard for detailed information"
echo "3. Apply fixes manually or use suggested automated commands"
echo "4. Re-run this script to verify fixes"
echo ""

# Made with Bob
