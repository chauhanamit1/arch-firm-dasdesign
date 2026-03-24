# Testing Guide - Architectural Firm Website
## Unit Testing, Integration Testing & E2E Testing

---

## Table of Contents
1. [Testing Strategy](#testing-strategy)
2. [Backend Testing (Strapi)](#backend-testing)
3. [Frontend Testing (Next.js)](#frontend-testing)
4. [Integration Testing](#integration-testing)
5. [E2E Testing](#e2e-testing)
6. [Test Coverage](#test-coverage)
7. [CI/CD Integration](#cicd-integration)

---

## Testing Strategy

### Testing Pyramid

```
        /\
       /  \
      / E2E \          <- Few, slow, expensive
     /______\
    /        \
   /Integration\       <- Some, medium speed
  /____________\
 /              \
/  Unit Tests    \     <- Many, fast, cheap
/__________________\
```

### Coverage Goals
- **Unit Tests:** 80%+ coverage
- **Integration Tests:** Critical paths
- **E2E Tests:** User journeys

---

## Backend Testing (Strapi)

### Setup Testing Environment

#### 1. Install Testing Dependencies

```bash
cd backend
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
npm install --save-dev @strapi/strapi @strapi/plugin-users-permissions
```

#### 2. Create Jest Configuration

```javascript
// backend/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};
```

#### 3. Create Test Setup File

```typescript
// backend/tests/setup.ts
import Strapi from '@strapi/strapi';

let instance: any;

beforeAll(async () => {
  instance = await Strapi().load();
  await instance.server.mount();
});

afterAll(async () => {
  await instance.destroy();
});

export { instance };
```

### Unit Tests for Backend

#### Test API Endpoints

```typescript
// backend/tests/api/project.test.ts
import request from 'supertest';
import { instance } from '../setup';

describe('Project API', () => {
  let projectId: number;

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const response = await request(instance.server.app)
        .post('/api/projects')
        .send({
          data: {
            title: 'Test Project',
            projectType: 'Residential',
            category: '3-Bedroom',
            location: 'Chicago, IL',
            year: 2025,
            size: 1200,
          },
        })
        .expect(200);

      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.attributes.title).toBe('Test Project');
      projectId = response.body.data.id;
    });

    it('should validate required fields', async () => {
      const response = await request(instance.server.app)
        .post('/api/projects')
        .send({
          data: {
            // Missing required fields
          },
        })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await request(instance.server.app)
        .get('/api/projects')
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should filter projects by type', async () => {
      const response = await request(instance.server.app)
        .get('/api/projects?filters[projectType][$eq]=Residential')
        .expect(200);

      expect(response.body.data.every(
        (p: any) => p.attributes.projectType === 'Residential'
      )).toBe(true);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a single project', async () => {
      const response = await request(instance.server.app)
        .get(`/api/projects/${projectId}`)
        .expect(200);

      expect(response.body.data.id).toBe(projectId);
      expect(response.body.data.attributes.title).toBe('Test Project');
    });

    it('should return 404 for non-existent project', async () => {
      await request(instance.server.app)
        .get('/api/projects/99999')
        .expect(404);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update a project', async () => {
      const response = await request(instance.server.app)
        .put(`/api/projects/${projectId}`)
        .send({
          data: {
            title: 'Updated Project',
          },
        })
        .expect(200);

      expect(response.body.data.attributes.title).toBe('Updated Project');
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project', async () => {
      await request(instance.server.app)
        .delete(`/api/projects/${projectId}`)
        .expect(200);

      // Verify deletion
      await request(instance.server.app)
        .get(`/api/projects/${projectId}`)
        .expect(404);
    });
  });
});
```

#### Test Services

```typescript
// backend/tests/services/project.service.test.ts
import { instance } from '../setup';

describe('Project Service', () => {
  let projectService: any;

  beforeAll(() => {
    projectService = instance.service('api::project.project');
  });

  describe('findByCategory', () => {
    it('should find projects by category', async () => {
      const projects = await projectService.find({
        filters: { category: '3-Bedroom' },
      });

      expect(projects.results).toBeDefined();
      expect(projects.results.every(
        (p: any) => p.category === '3-Bedroom'
      )).toBe(true);
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return only featured projects', async () => {
      const projects = await projectService.find({
        filters: { featured: true },
      });

      expect(projects.results.every(
        (p: any) => p.featured === true
      )).toBe(true);
    });
  });
});
```

### Add Test Scripts to package.json

```json
// backend/package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=tests/unit",
    "test:integration": "jest --testPathPattern=tests/integration"
  }
}
```

---

## Frontend Testing (Next.js)

### Setup Testing Environment

#### 1. Install Testing Dependencies

```bash
cd frontend
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jest-environment-jsdom
npm install --save-dev @types/jest ts-node
```

#### 2. Create Jest Configuration

```javascript
// frontend/jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

#### 3. Create Jest Setup File

```javascript
// frontend/jest.setup.js
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:1337';
```

### Unit Tests for Frontend

#### Test Components

```typescript
// frontend/src/components/__tests__/ProjectCard.test.tsx
import { render, screen } from '@testing-library/react';
import ProjectCard from '../portfolio/ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    id: 1,
    attributes: {
      title: 'Modern Apartment',
      slug: 'modern-apartment',
      category: '3-Bedroom',
      location: 'Chicago, IL',
      year: 2025,
      images: {
        data: [
          {
            attributes: {
              url: '/uploads/image.jpg',
              alternativeText: 'Modern Apartment',
            },
          },
        ],
      },
    },
  };

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Modern Apartment')).toBeInTheDocument();
    expect(screen.getByText(/3-Bedroom/)).toBeInTheDocument();
    expect(screen.getByText(/Chicago, IL/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('renders project image', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAlt('Modern Apartment');
    expect(image).toBeInTheDocument();
  });

  it('links to project detail page', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/portfolio/modern-apartment');
  });
});
```

#### Test API Integration

```typescript
// frontend/src/lib/__tests__/api.test.ts
import { getProjects, getServices, submitConsultation } from '../api';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProjects', () => {
    it('fetches projects successfully', async () => {
      const mockData = {
        data: {
          data: [
            { id: 1, attributes: { title: 'Project 1' } },
            { id: 2, attributes: { title: 'Project 2' } },
          ],
        },
      };

      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockData),
      } as any);

      const result = await getProjects();
      expect(result.data).toHaveLength(2);
    });

    it('handles errors gracefully', async () => {
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error('Network error')),
      } as any);

      const result = await getProjects();
      expect(result.data).toEqual([]);
    });
  });

  describe('submitConsultation', () => {
    it('submits consultation request successfully', async () => {
      const mockData = {
        data: { id: 1, attributes: { name: 'John Doe' } },
      };

      mockedAxios.create.mockReturnValue({
        post: jest.fn().mockResolvedValue({ data: mockData }),
      } as any);

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'Residential',
        message: 'I need help with my project',
      };

      const result = await submitConsultation(formData);
      expect(result.id).toBe(1);
    });
  });
});
```

#### Test Pages

```typescript
// frontend/src/app/__tests__/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../page';
import * as api from '@/lib/api';

jest.mock('@/lib/api');

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading state initially', () => {
    (api.getProjects as jest.Mock).mockReturnValue(
      new Promise(() => {}) // Never resolves
    );
    (api.getServices as jest.Mock).mockReturnValue(
      new Promise(() => {})
    );

    render(<Home />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('displays projects and services after loading', async () => {
    const mockProjects = {
      data: [
        { id: 1, attributes: { title: 'Project 1' } },
      ],
    };
    const mockServices = {
      data: [
        { id: 1, attributes: { title: 'Service 1' } },
      ],
    };

    (api.getProjects as jest.Mock).mockResolvedValue(mockProjects);
    (api.getServices as jest.Mock).mockResolvedValue(mockServices);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Service 1')).toBeInTheDocument();
    });
  });

  it('displays message when no data available', async () => {
    (api.getProjects as jest.Mock).mockResolvedValue({ data: [] });
    (api.getServices as jest.Mock).mockResolvedValue({ data: [] });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/No projects added yet/i)).toBeInTheDocument();
      expect(screen.getByText(/No services added yet/i)).toBeInTheDocument();
    });
  });
});
```

### Add Test Scripts to package.json

```json
// frontend/package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ui": "jest --testPathPattern=components",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

---

## Integration Testing

### API Integration Tests

```typescript
// frontend/tests/integration/api-integration.test.ts
import { getProjects, submitConsultation } from '@/lib/api';

describe('API Integration Tests', () => {
  // These tests run against actual backend
  // Make sure backend is running on localhost:1337

  it('should fetch projects from backend', async () => {
    const result = await getProjects();
    
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should submit consultation request', async () => {
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      projectType: 'Residential',
      message: 'Test message',
    };

    const result = await submitConsultation(formData);
    expect(result).toHaveProperty('id');
  });
});
```

---

## E2E Testing

### Setup Playwright

```bash
cd frontend
npm install --save-dev @playwright/test
npx playwright install
```

### Playwright Configuration

```typescript
// frontend/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

```typescript
// frontend/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toContainText('Architectural Firm');
    await expect(page.getByRole('button', { name: /start your project/i }))
      .toBeVisible();
  });

  test('should display services section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Our Services')).toBeVisible();
  });

  test('should navigate to portfolio', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /view portfolio/i }).click();
    await expect(page).toHaveURL('/portfolio');
  });
});
```

```typescript
// frontend/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit consultation request', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.selectOption('select[name="projectType"]', 'Residential');
    await page.fill('textarea[name="message"]', 'I need help with my project');

    await page.click('button[type="submit"]');

    await expect(page.getByText(/thank you/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    await page.click('button[type="submit"]');

    await expect(page.getByText(/required/i)).toBeVisible();
  });
});
```

---

## Test Coverage

### Generate Coverage Reports

```bash
# Backend
cd backend
npm run test:coverage

# Frontend
cd frontend
npm run test:coverage
```

### Coverage Thresholds

```javascript
// frontend/jest.config.js
module.exports = {
  // ... other config
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 80,
      statements: 80,
    },
  },
};
```

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd backend
          npm ci
          
      - name: Run tests
        run: |
          cd backend
          npm run test:coverage
          
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info
          flags: backend

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          
      - name: Run unit tests
        run: |
          cd frontend
          npm run test:coverage
          
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info
          flags: frontend

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
          npx playwright install --with-deps
          
      - name: Run E2E tests
        run: |
          cd frontend
          npx playwright test
          
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: frontend/playwright-report/
```

---

## Running Tests

### Local Development

```bash
# Backend unit tests
cd backend
npm test

# Frontend unit tests
cd frontend
npm test

# E2E tests (requires both servers running)
cd frontend
npx playwright test

# Watch mode for development
npm run test:watch

# Coverage reports
npm run test:coverage
```

### Pre-commit Hook

```bash
# Install husky
npm install --save-dev husky

# Setup pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npm test"
```

---

## Best Practices

1. **Write tests first** (TDD approach)
2. **Keep tests isolated** (no dependencies between tests)
3. **Use descriptive test names**
4. **Mock external dependencies**
5. **Test edge cases and error scenarios**
6. **Maintain high coverage** (80%+ for critical code)
7. **Run tests in CI/CD pipeline**
8. **Review test failures immediately**

---

## Resources

- Jest Documentation: https://jestjs.io/
- React Testing Library: https://testing-library.com/react
- Playwright: https://playwright.dev/
- Strapi Testing: https://docs.strapi.io/dev-docs/testing