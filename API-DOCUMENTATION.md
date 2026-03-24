# API Documentation Guide
## Comprehensive API Documentation for Architectural Firm Website

---

## Table of Contents
1. [API Overview](#api-overview)
2. [Documentation Tools](#documentation-tools)
3. [API Endpoints](#api-endpoints)
4. [Authentication](#authentication)
5. [Request/Response Examples](#requestresponse-examples)
6. [Error Handling](#error-handling)
7. [Rate Limiting](#rate-limiting)
8. [Versioning](#versioning)

---

## API Overview

### Base URL
```
Development: http://localhost:1337/api
Production: https://your-domain.com/api
```

### API Architecture
```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)            │
│         http://localhost:3000           │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────────┐
│         API Gateway (Strapi)            │
│         http://localhost:1337/api       │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────┐
│   Database   │  │ File Storage │
│   (SQLite)   │  │  (Cloudinary)│
└──────────────┘  └──────────────┘
```

---

## Documentation Tools

### 1. Swagger/OpenAPI Setup

#### Install Swagger Plugin for Strapi

```bash
cd backend
npm install @strapi/plugin-documentation
```

#### Configure Swagger

```javascript
// backend/config/plugins.js
module.exports = {
  documentation: {
    enabled: true,
    config: {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'Architectural Firm API',
        description: 'API documentation for the Architectural Firm website',
        contact: {
          name: 'API Support',
          email: 'api@yourfirm.com',
        },
        license: {
          name: 'MIT',
        },
      },
      'x-strapi-config': {
        path: '/documentation',
        showGeneratedFiles: true,
      },
      servers: [
        {
          url: 'http://localhost:1337/api',
          description: 'Development server',
        },
        {
          url: 'https://your-domain.com/api',
          description: 'Production server',
        },
      ],
    },
  },
};
```

#### Access Swagger UI
```
http://localhost:1337/documentation
```

### 2. Postman Collection

#### Export Postman Collection

```json
{
  "info": {
    "name": "Architectural Firm API",
    "description": "Complete API collection for testing",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Projects",
      "item": [
        {
          "name": "Get All Projects",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/projects?populate=*",
              "host": ["{{baseUrl}}"],
              "path": ["projects"],
              "query": [
                {
                  "key": "populate",
                  "value": "*"
                }
              ]
            }
          }
        },
        {
          "name": "Get Project by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/projects/:id?populate=*",
              "host": ["{{baseUrl}}"],
              "path": ["projects", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "1"
                }
              ]
            }
          }
        },
        {
          "name": "Create Project",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"data\": {\n    \"title\": \"Modern Apartment\",\n    \"projectType\": \"Residential\",\n    \"category\": \"3-Bedroom\",\n    \"location\": \"Chicago, IL\",\n    \"year\": 2025,\n    \"size\": 1200\n  }\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/projects",
              "host": ["{{baseUrl}}"],
              "path": ["projects"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:1337/api",
      "type": "string"
    }
  ]
}
```

---

## API Endpoints

### Projects API

#### GET /api/projects
Get all projects with optional filtering and pagination.

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `populate` | string | Populate relations | `*` or `images,floorPlans` |
| `filters` | object | Filter results | `filters[projectType][$eq]=Residential` |
| `sort` | string | Sort results | `year:desc` |
| `pagination[page]` | number | Page number | `1` |
| `pagination[pageSize]` | number | Items per page | `10` |

**Example Request:**
```bash
GET /api/projects?populate=*&filters[projectType][$eq]=Residential&sort=year:desc
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Modern 3-Bedroom Apartment",
        "slug": "modern-3-bedroom-apartment",
        "description": "A contemporary apartment...",
        "projectType": "Residential",
        "category": "3-Bedroom",
        "location": "Chicago, IL",
        "year": 2025,
        "size": 1200,
        "budgetRange": "$150,000 - $200,000",
        "featured": true,
        "images": {
          "data": [
            {
              "id": 1,
              "attributes": {
                "url": "/uploads/image1.jpg",
                "alternativeText": "Living room",
                "width": 1920,
                "height": 1080
              }
            }
          ]
        },
        "createdAt": "2025-01-15T10:00:00.000Z",
        "updatedAt": "2025-01-15T10:00:00.000Z",
        "publishedAt": "2025-01-15T10:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

#### GET /api/projects/:id
Get a single project by ID.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Project ID |

**Example Request:**
```bash
GET /api/projects/1?populate=*
```

**Example Response:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "title": "Modern 3-Bedroom Apartment",
      "slug": "modern-3-bedroom-apartment",
      // ... full project data
    }
  },
  "meta": {}
}
```

#### POST /api/projects
Create a new project (requires authentication).

**Request Body:**
```json
{
  "data": {
    "title": "Modern Apartment",
    "slug": "modern-apartment",
    "description": "A contemporary design...",
    "projectType": "Residential",
    "category": "3-Bedroom",
    "location": "Chicago, IL",
    "year": 2025,
    "size": 1200,
    "budgetRange": "$150,000 - $200,000",
    "challenge": "Limited space...",
    "solution": "Smart planning...",
    "keyFeatures": ["Open kitchen", "Home office"],
    "materials": ["Hardwood floors", "Granite countertops"],
    "featured": true,
    "clientName": "John Doe",
    "testimonial": "Excellent work!"
  }
}
```

**Example Response:**
```json
{
  "data": {
    "id": 2,
    "attributes": {
      "title": "Modern Apartment",
      // ... created project data
    }
  },
  "meta": {}
}
```

#### PUT /api/projects/:id
Update an existing project (requires authentication).

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Project ID |

**Request Body:**
```json
{
  "data": {
    "title": "Updated Title",
    "featured": false
  }
}
```

#### DELETE /api/projects/:id
Delete a project (requires authentication).

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | Project ID |

**Example Response:**
```json
{
  "data": {
    "id": 2,
    "attributes": {
      // ... deleted project data
    }
  },
  "meta": {}
}
```

---

### Services API

#### GET /api/services
Get all services.

**Example Request:**
```bash
GET /api/services?populate=*&sort=order:asc
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Residential Design",
        "slug": "residential-design",
        "description": "Custom apartment design...",
        "serviceType": "Residential",
        "features": ["Space optimization", "3D visualization"],
        "order": 1,
        "icon": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/icon.svg"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

---

### Team Members API

#### GET /api/team-members
Get all team members.

**Example Request:**
```bash
GET /api/team-members?populate=*&sort=order:asc
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "John Smith",
        "position": "Lead Architect",
        "bio": "With over 15 years...",
        "email": "john@firm.com",
        "linkedin": "https://linkedin.com/in/johnsmith",
        "order": 1,
        "photo": {
          "data": {
            "id": 1,
            "attributes": {
              "url": "/uploads/john.jpg"
            }
          }
        }
      }
    }
  ],
  "meta": {}
}
```

---

### Consultation Requests API

#### POST /api/consultation-requests
Submit a consultation request (public endpoint).

**Request Body:**
```json
{
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1-555-0123",
    "projectType": "Residential",
    "propertyType": "New Build",
    "location": "Chicago, IL",
    "timeline": "3-6 months",
    "budget": "$200,000 - $300,000",
    "message": "I'm interested in designing a 4-bedroom apartment..."
  }
}
```

**Example Response:**
```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "status": "New",
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  },
  "meta": {}
}
```

---

## Authentication

### JWT Authentication

#### Login
```bash
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "admin@firm.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@firm.com"
  }
}
```

#### Using JWT Token
```bash
GET /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Error Handling

### Error Response Format

```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid request data",
    "details": {
      "errors": [
        {
          "path": ["title"],
          "message": "Title is required",
          "name": "ValidationError"
        }
      ]
    }
  }
}
```

### HTTP Status Codes

| Code | Description | Example |
|------|-------------|---------|
| 200 | Success | GET request successful |
| 201 | Created | POST request successful |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## Rate Limiting

### Default Limits
- **Public endpoints:** 100 requests per 15 minutes
- **Authenticated endpoints:** 1000 requests per 15 minutes

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642345678
```

---

## Versioning

### API Version Header
```bash
GET /api/projects
Accept: application/vnd.api+json; version=1
```

### Version History
- **v1.0.0** (Current) - Initial release

---

## Code Examples

### JavaScript/TypeScript

```typescript
// Using axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all projects
const getProjects = async () => {
  const response = await api.get('/projects', {
    params: {
      populate: '*',
      'filters[projectType][$eq]': 'Residential',
    },
  });
  return response.data;
};

// Create project
const createProject = async (data) => {
  const response = await api.post('/projects', { data });
  return response.data;
};
```

### Python

```python
import requests

BASE_URL = 'http://localhost:1337/api'

# Get all projects
def get_projects():
    response = requests.get(
        f'{BASE_URL}/projects',
        params={
            'populate': '*',
            'filters[projectType][$eq]': 'Residential'
        }
    )
    return response.json()

# Create project
def create_project(data):
    response = requests.post(
        f'{BASE_URL}/projects',
        json={'data': data}
    )
    return response.json()
```

### cURL

```bash
# Get all projects
curl -X GET 'http://localhost:1337/api/projects?populate=*'

# Create project
curl -X POST 'http://localhost:1337/api/projects' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": {
      "title": "Modern Apartment",
      "projectType": "Residential"
    }
  }'
```

---

## Interactive Documentation

### Swagger UI
Access interactive API documentation at:
```
http://localhost:1337/documentation
```

Features:
- Try API endpoints directly
- View request/response schemas
- Test authentication
- Download OpenAPI spec

### Redoc
Alternative documentation view:
```
http://localhost:1337/documentation/redoc
```

---

## Best Practices

1. **Always use HTTPS in production**
2. **Include API version in requests**
3. **Handle errors gracefully**
4. **Implement retry logic for failed requests**
5. **Cache responses when appropriate**
6. **Use pagination for large datasets**
7. **Validate input data**
8. **Log API usage for monitoring**

---

## Resources

- Strapi API Documentation: https://docs.strapi.io/dev-docs/api/rest
- OpenAPI Specification: https://swagger.io/specification/
- Postman Documentation: https://learning.postman.com/