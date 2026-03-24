# Code Review & Quality Assurance Guide
## Automated Code Review, Linting, and Best Practices

---

## Table of Contents
1. [Code Review Tools](#code-review-tools)
2. [Automated Code Review](#automated-code-review)
3. [Linting & Formatting](#linting--formatting)
4. [Pre-commit Hooks](#pre-commit-hooks)
5. [CI/CD Integration](#cicd-integration)
6. [Code Review Checklist](#code-review-checklist)
7. [Best Practices](#best-practices)

---

## Code Review Tools

### 1. GitHub Code Review Features

#### Pull Request Template

```markdown
# .github/pull_request_template.md

## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No new warnings

## Screenshots (if applicable)

## Related Issues
Closes #(issue number)
```

### 2. Automated Code Review Tools

#### SonarQube Setup

```bash
# Install SonarQube scanner
npm install --save-dev sonarqube-scanner

# Create sonar-project.properties
cat > sonar-project.properties << EOF
sonar.projectKey=architectural-firm-website
sonar.projectName=Architectural Firm Website
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=tests
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info
EOF
```

#### CodeClimate Configuration

```yaml
# .codeclimate.yml
version: "2"
checks:
  argument-count:
    config:
      threshold: 4
  complex-logic:
    config:
      threshold: 4
  file-lines:
    config:
      threshold: 250
  method-complexity:
    config:
      threshold: 5
  method-count:
    config:
      threshold: 20
  method-lines:
    config:
      threshold: 25
  nested-control-flow:
    config:
      threshold: 4
  return-statements:
    config:
      threshold: 4

plugins:
  eslint:
    enabled: true
    channel: "eslint-8"
  duplication:
    enabled: true
    config:
      languages:
        - javascript
        - typescript

exclude_patterns:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/node_modules/"
  - "**/.next/"
  - "**/dist/"
  - "**/build/"
```

---

## Automated Code Review

### 1. ESLint Configuration

#### Backend (Strapi)

```javascript
// backend/.eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'node'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
```

#### Frontend (Next.js)

```javascript
// frontend/.eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### 2. Prettier Configuration

```javascript
// .prettierrc.js (root level)
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
};
```

```
# .prettierignore
node_modules
.next
dist
build
coverage
*.min.js
package-lock.json
```

### 3. TypeScript Configuration

#### Strict TypeScript Config

```json
// tsconfig.json (frontend)
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

## Linting & Formatting

### Install Dependencies

```bash
# Backend
cd backend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-plugin-node prettier eslint-config-prettier

# Frontend
cd frontend
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks prettier eslint-config-prettier
```

### NPM Scripts

```json
// package.json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Pre-commit Hooks

### Husky Setup

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

### Lint-Staged Configuration

```javascript
// .lintstagedrc.js
module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  '*.{js,jsx}': [
    'eslint --fix',
    'prettier --write',
    'git add',
  ],
  '*.{json,md}': [
    'prettier --write',
    'git add',
  ],
};
```

### Commit Message Linting

```bash
# Install commitlint
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# Create commitlint config
cat > .commitlintrc.js << EOF
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code restructuring
        'test',     // Tests
        'chore',    // Maintenance
      ],
    ],
  },
};
EOF

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

**Commit Message Format:**
```
type(scope): subject

body

footer
```

**Examples:**
```
feat(projects): add filtering by category
fix(api): resolve CORS issue
docs(readme): update installation instructions
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/code-quality.yml
name: Code Quality

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint-and-format:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies (Backend)
        run: |
          cd backend
          npm ci
      
      - name: Lint Backend
        run: |
          cd backend
          npm run lint
      
      - name: Type Check Backend
        run: |
          cd backend
          npm run type-check
      
      - name: Install dependencies (Frontend)
        run: |
          cd frontend
          npm ci
      
      - name: Lint Frontend
        run: |
          cd frontend
          npm run lint
      
      - name: Type Check Frontend
        run: |
          cd frontend
          npm run type-check
      
      - name: Format Check
        run: |
          npm run format:check

  security-scan:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run npm audit
        run: |
          cd backend && npm audit --audit-level=moderate
          cd ../frontend && npm audit --audit-level=moderate
      
      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  code-coverage:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install and Test
        run: |
          cd frontend
          npm ci
          npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info
          flags: frontend
```

---

## Code Review Checklist

### General

- [ ] Code follows project style guide
- [ ] No commented-out code
- [ ] No console.log statements (except in error handling)
- [ ] Meaningful variable and function names
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Complex logic is commented
- [ ] No magic numbers or strings

### TypeScript/JavaScript

- [ ] Proper type annotations
- [ ] No `any` types (or justified)
- [ ] Async/await used correctly
- [ ] Error handling implemented
- [ ] Promises handled properly
- [ ] No unused imports
- [ ] Destructuring used where appropriate

### React/Next.js

- [ ] Components are properly typed
- [ ] Hooks used correctly
- [ ] No unnecessary re-renders
- [ ] Keys used in lists
- [ ] Accessibility attributes added
- [ ] Loading and error states handled
- [ ] SEO metadata included

### API/Backend

- [ ] Input validation implemented
- [ ] Error responses are consistent
- [ ] Authentication/authorization checked
- [ ] Rate limiting considered
- [ ] Database queries optimized
- [ ] Sensitive data not logged

### Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Edge cases covered
- [ ] Tests are meaningful
- [ ] Tests pass locally
- [ ] Coverage maintained/improved

### Security

- [ ] No hardcoded secrets
- [ ] SQL injection prevented
- [ ] XSS prevention implemented
- [ ] CSRF protection in place
- [ ] Input sanitization done
- [ ] Dependencies up to date

### Performance

- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Database queries efficient
- [ ] Caching strategy considered
- [ ] Bundle size acceptable
- [ ] No memory leaks

### Documentation

- [ ] README updated if needed
- [ ] API documentation updated
- [ ] Complex functions documented
- [ ] Breaking changes noted
- [ ] Migration guide provided

---

## Best Practices

### Code Organization

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── lib/
│   ├── api/            # API clients
│   ├── utils/          # Utility functions
│   └── hooks/          # Custom hooks
├── types/              # TypeScript types
├── constants/          # Constants
└── styles/             # Global styles
```

### Naming Conventions

```typescript
// Components: PascalCase
const ProjectCard = () => {};

// Functions: camelCase
const fetchProjects = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:1337';

// Types/Interfaces: PascalCase
interface ProjectData {}
type ProjectType = 'Residential' | 'Commercial';

// Files: kebab-case
// project-card.tsx
// api-client.ts
```

### Code Comments

```typescript
// Good: Explain WHY, not WHAT
// Calculate with 10% markup to account for overhead costs
const total = items.reduce((sum, item) => sum + item.price * 1.1, 0);

// Bad: Obvious comment
// Loop through items
items.forEach(item => {});

// Good: Document complex logic
/**
 * Filters projects based on multiple criteria with fallback logic.
 * If no filters match, returns featured projects instead of empty array.
 * 
 * @param filters - Object containing filter criteria
 * @returns Filtered project array or featured projects
 */
const filterProjects = (filters: ProjectFilters) => {};
```

### Error Handling

```typescript
// Good: Specific error handling
try {
  const data = await fetchProjects();
  return data;
} catch (error) {
  if (error instanceof NetworkError) {
    logger.error('Network error fetching projects', { error });
    throw new UserFacingError('Unable to load projects. Please check your connection.');
  }
  throw error;
}

// Bad: Silent failures
try {
  await fetchProjects();
} catch (error) {
  // Do nothing
}
```

---

## Automated Tools Integration

### VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### VS Code Settings

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

---

## Resources

- ESLint: https://eslint.org/
- Prettier: https://prettier.io/
- Husky: https://typicode.github.io/husky/
- Commitlint: https://commitlint.js.org/
- SonarQube: https://www.sonarqube.org/
- CodeClimate: https://codeclimate.com/