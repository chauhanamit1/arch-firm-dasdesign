# Architectural Firm Website

A modern, full-stack website for an architectural firm serving both residential (2-7 bedroom apartments) and commercial clients (hospitals, schools). Built with Next.js, Strapi CMS, and featuring advanced project management capabilities.

## 🏗️ Project Overview

This website provides:
- **Portfolio Showcase**: Display residential and commercial projects with detailed information
- **Service Offerings**: Interior Design, Space Planning, Construction Management, Residential Design
- **Project Management**: 5-phase construction milestone tracking with client sign-offs
- **Document Management**: Contracts, meeting notes, and file uploads
- **Financial Tracking**: Invoice management and payment tracking

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React PDF** - PDF viewing capabilities

### Backend
- **Strapi v5.40.0** - Headless CMS
- **SQLite** - Development database
- **PostgreSQL** - Production database
- **Node.js 20** - Runtime environment

### DevOps & Quality
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancing
- **SonarQube** - Code quality analysis
- **Jest** - Unit testing
- **Cypress** - E2E testing

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker & Docker Compose (for production deployment)
- Git

## 🛠️ Quick Start

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd architectural-firm-website
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Start development servers**

Terminal 1 - Backend:
```bash
cd backend
npm run develop
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend Admin: http://localhost:1337/admin
- API: http://localhost:1337/api

### Docker Deployment

1. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your production values
```

2. **Build and start containers**
```bash
docker-compose up -d
```

3. **Access services**
- Website: http://localhost (via Nginx)
- Backend: http://localhost:1337
- SonarQube: http://localhost:9000

## 📁 Project Structure

```
architectural-firm-website/
├── backend/                 # Strapi CMS
│   ├── src/
│   │   ├── api/
│   │   │   ├── project/    # Project content type
│   │   │   └── service/    # Service content type
│   │   └── index.ts        # Bootstrap with sample data
│   ├── Dockerfile
│   └── package.json
├── frontend/                # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── projects/[id]/     # Project details
│   │   │   └── services/[id]/     # Service details
│   │   ├── components/            # React components
│   │   └── lib/
│   │       └── api.ts             # API client
│   ├── __tests__/                 # Jest unit tests
│   ├── cypress/                   # E2E tests
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── cypress.config.ts
│   └── package.json
├── nginx/
│   └── nginx.conf          # Nginx configuration
├── docker-compose.yml      # Multi-container setup
├── sonar-project.properties # SonarQube config
├── .env.example            # Environment template
├── .gitignore
└── README.md
```

## 🧪 Testing

### Unit Tests (Jest)
```bash
cd frontend
npm test
npm run test:coverage
```

### E2E Tests (Cypress)
```bash
cd frontend
npm run cypress:open    # Interactive mode
npm run cypress:run     # Headless mode
```

### Code Quality (SonarQube)
```bash
# Start SonarQube
docker-compose up -d sonarqube

# Run analysis
npm run sonar
```

## 📊 Features

### Project Management
- **5 Construction Phases**:
  1. Site Ready - Site preparation and permits
  2. Design Freeze - Final design approval
  3. MEP (Mechanical, Electrical, Plumbing) - Systems installation
  4. The Skin - Exterior completion
  5. Handover - Final inspection and delivery

- **Client Sign-offs**: Track approvals with comments and timestamps
- **Document Management**: Upload and view contracts, meeting notes
- **Financial Tracking**: Invoice management with payment status

### Content Types

#### Project
- Title, description, category (residential/commercial)
- Budget, area, location, status
- Completion date
- Image gallery
- Milestones with deliverables and sign-offs
- Contracts and meeting notes
- Invoices

#### Service
- Title, description
- Icon, features list
- Process steps
- Pricing information
- Related projects

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available variables:

- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret
- `ADMIN_JWT_SECRET` - Admin JWT secret
- `APP_KEYS` - Strapi app keys
- `API_TOKEN_SALT` - API token salt
- `NEXT_PUBLIC_API_URL` - API endpoint URL

### Strapi Configuration

1. Create admin user at http://localhost:1337/admin
2. Configure API permissions:
   - Settings → Users & Permissions → Roles → Public
   - Enable `find` and `findOne` for Project and Service

## 📚 Documentation

Comprehensive documentation is available in the project:

- `COMPLETE-SETUP-GUIDE.md` - Full setup walkthrough
- `ENTERPRISE-FEATURES-GUIDE.md` - Advanced features (1,247 lines)
- `PROJECT-MANAGEMENT-COMPLETE.md` - Construction milestone system
- `API-DOCUMENTATION.md` - API reference
- `TESTING-GUIDE.md` - Testing strategies
- `TROUBLESHOOTING.md` - Common issues and solutions
- `DEPLOYMENT-GUIDE.md` - Production deployment
- Plus 10+ additional guides

## 🚢 Deployment

### Production Checklist

1. ✅ Update environment variables in `.env`
2. ✅ Generate secure secrets (use `openssl rand -base64 32`)
3. ✅ Configure SSL certificates in `nginx/ssl/`
4. ✅ Update `nginx.conf` for HTTPS
5. ✅ Set `NODE_ENV=production`
6. ✅ Build Docker images
7. ✅ Run database migrations
8. ✅ Create admin user
9. ✅ Configure API permissions
10. ✅ Test all endpoints

### Docker Production Build

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

- **Architecture**: Residential & Commercial Design
- **Development**: Full-stack web application
- **Project Management**: Construction milestone tracking

## 📞 Support

For issues and questions:
- Check `TROUBLESHOOTING.md`
- Review documentation in project root
- Contact development team

## 🎯 Roadmap

- [x] Core website functionality
- [x] Project management system
- [x] Docker deployment
- [x] Testing infrastructure
- [ ] Service detail pages
- [ ] PDF viewer integration
- [ ] File upload system
- [ ] Mobile app
- [ ] Client portal
- [ ] Real-time notifications

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready
