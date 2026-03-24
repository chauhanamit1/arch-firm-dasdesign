# SonarQube Setup & Configuration Guide

## 🎯 Overview
This guide will help you configure SonarQube to monitor and analyze the Architectural Firm Website project for code quality, security vulnerabilities, and technical debt.

## 📋 Prerequisites
- Docker containers running (SonarQube accessible at http://localhost:9000)
- Node.js and npm installed
- Project source code available

## 🔐 Step 1: Initial SonarQube Login

1. **Access SonarQube**
   - Open browser: http://localhost:9000
   - Default credentials:
     - Username: `admin`
     - Password: `admin`

2. **Change Default Password**
   - On first login, you'll be prompted to change the password
   - Choose a strong password and save it securely

## 🔑 Step 2: Generate Authentication Token

1. **Navigate to User Settings**
   - Click on your profile icon (top right)
   - Select "My Account"
   - Go to "Security" tab

2. **Create New Token**
   - Token Name: `architectural-firm-scanner`
   - Type: `Project Analysis Token` (or `Global Analysis Token`)
   - Click "Generate"
   - **IMPORTANT**: Copy the token immediately (you won't see it again)
   - Example token format: `squ_1234567890abcdef1234567890abcdef12345678`

3. **Save Token Securely**
   ```bash
   # Create .env file in project root (if not exists)
   echo "SONAR_TOKEN=your_token_here" >> .env
   ```

## 📊 Step 3: Create Project in SonarQube

### Option A: Manual Project Creation (Recommended for first time)

1. **Create New Project**
   - Click "Create Project" button
   - Choose "Manually"
   - Project key: `architectural-firm-website`
   - Display name: `Architectural Firm Website`
   - Click "Set Up"

2. **Configure Analysis Method**
   - Choose "Locally"
   - Select "Use existing token" or create new one
   - Choose "Other" for CI
   - Select "macOS" or your OS

### Option B: Automatic Project Creation (via scanner)
The project will be created automatically when you run the scanner for the first time.

## 🚀 Step 4: Run Code Analysis

### Method 1: Using npx (Recommended)

```bash
# Navigate to project directory
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website

# Run SonarQube scanner
npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=YOUR_TOKEN_HERE
```

### Method 2: Using Docker

```bash
docker run --rm \
  --network=architectural-firm-website_arch-firm-network \
  -e SONAR_HOST_URL="http://sonarqube:9000" \
  -e SONAR_TOKEN="YOUR_TOKEN_HERE" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli
```

### Method 3: Install sonar-scanner globally

```bash
# Install sonar-scanner
npm install -g sonarqube-scanner

# Run analysis
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website
sonar-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=YOUR_TOKEN_HERE
```

## 📈 Step 5: Run Tests with Coverage (Optional but Recommended)

To get code coverage metrics in SonarQube:

```bash
# Backend tests with coverage
cd backend
npm run test -- --coverage

# Frontend tests with coverage
cd ../frontend
npm run test -- --coverage

# Return to project root
cd ..

# Now run SonarQube analysis
npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=YOUR_TOKEN_HERE
```

## 🔍 Step 6: View Analysis Results

1. **Access Project Dashboard**
   - Go to http://localhost:9000
   - Click on "Projects"
   - Select "Architectural Firm Website"

2. **Review Metrics**
   - **Bugs**: Critical issues that need immediate attention
   - **Vulnerabilities**: Security issues
   - **Code Smells**: Maintainability issues
   - **Coverage**: Test coverage percentage
   - **Duplications**: Duplicate code blocks
   - **Security Hotspots**: Potential security risks

## 🛠️ Step 7: Configure Quality Gates

1. **Navigate to Quality Gates**
   - Click "Quality Gates" in top menu
   - Select "Sonar way" (default) or create custom

2. **Customize Quality Gate (Optional)**
   - Click "Create"
   - Name: `Architectural Firm Standards`
   - Add conditions:
     - Coverage > 80%
     - Duplicated Lines < 3%
     - Maintainability Rating = A
     - Reliability Rating = A
     - Security Rating = A

3. **Assign to Project**
   - Go to Project Settings > Quality Gate
   - Select your custom quality gate

## 🔄 Step 8: Automate Analysis (CI/CD Integration)

### Create Analysis Script

```bash
# Create run-sonar.sh
cat > run-sonar.sh << 'EOF'
#!/bin/bash
set -e

echo "🧪 Running tests with coverage..."
cd backend && npm run test -- --coverage && cd ..
cd frontend && npm run test -- --coverage && cd ..

echo "📊 Running SonarQube analysis..."
npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=${SONAR_TOKEN}

echo "✅ Analysis complete! View results at http://localhost:9000"
EOF

chmod +x run-sonar.sh
```

### Run Analysis

```bash
# Set your token
export SONAR_TOKEN="your_token_here"

# Run analysis
./run-sonar.sh
```

## 📝 Configuration Files

### sonar-project.properties (Already configured)
Located at project root with the following key settings:
- Project key: `architectural-firm-website`
- Source directories: `backend/src`, `frontend/src`
- Test directories: `backend/tests`, `frontend/__tests__`, `frontend/cypress`
- Coverage reports: LCOV format
- Exclusions: node_modules, build artifacts, test files

## 🎯 Quality Metrics to Monitor

### Critical Metrics
1. **Reliability Rating**: Should be A (no bugs)
2. **Security Rating**: Should be A (no vulnerabilities)
3. **Maintainability Rating**: Should be A or B
4. **Coverage**: Target > 80%
5. **Duplications**: Keep < 3%

### Regular Review Schedule
- **Daily**: Check for new issues
- **Weekly**: Review code smells and technical debt
- **Monthly**: Analyze trends and set improvement goals

## 🔧 Troubleshooting

### Issue: "Unauthorized" Error
**Solution**: Verify your token is correct and has proper permissions

### Issue: "Project not found"
**Solution**: Ensure project key in sonar-project.properties matches SonarQube

### Issue: No coverage data
**Solution**: Run tests with coverage before analysis:
```bash
npm run test -- --coverage
```

### Issue: Scanner not found
**Solution**: Install sonarqube-scanner:
```bash
npm install -g sonarqube-scanner
```

## 📚 Additional Resources

- **SonarQube Documentation**: https://docs.sonarqube.org/
- **Quality Gates**: http://localhost:9000/quality_gates
- **Project Dashboard**: http://localhost:9000/dashboard?id=architectural-firm-website
- **Rules**: http://localhost:9000/coding_rules

## 🎉 Quick Start Command

For a quick analysis run:

```bash
# Set your token (replace with actual token)
export SONAR_TOKEN="squ_your_token_here"

# Run analysis
cd /Users/aa/localai_models/Personal_AI/architectural-firm-website && \
npx sonarqube-scanner \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=${SONAR_TOKEN}
```

## ✅ Success Checklist

- [ ] Logged into SonarQube (http://localhost:9000)
- [ ] Changed default password
- [ ] Generated authentication token
- [ ] Created project in SonarQube
- [ ] Ran first code analysis
- [ ] Reviewed analysis results
- [ ] Configured quality gates
- [ ] Set up automated analysis script
- [ ] Reviewed and addressed critical issues

---

**Made with Bob** 🏗️