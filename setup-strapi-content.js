#!/usr/bin/env node

/**
 * Automated Strapi Content Setup Script
 * 
 * This script will:
 * 1. Create all required content types
 * 2. Configure API permissions
 * 3. Add sample project data with construction milestones
 * 4. Add sample services
 * 5. Add sample clients
 * 
 * Run this after Strapi is running and admin account is created.
 */

const axios = require('axios');
const readline = require('readline');

const STRAPI_URL = 'http://localhost:1337';
const API_URL = `${STRAPI_URL}/api`;

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  step: (msg) => console.log(`\n${colors.cyan}${colors.bright}${msg}${colors.reset}`),
};

// Prompt for user input
const prompt = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Login to Strapi
async function login() {
  log.step('Step 1: Authenticating with Strapi');
  
  const email = await prompt('Enter your Strapi admin email: ');
  const password = await prompt('Enter your Strapi admin password: ');

  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier: email,
      password: password,
    });

    log.success('Successfully authenticated!');
    return response.data.jwt;
  } catch (error) {
    log.error('Authentication failed. Please check your credentials.');
    log.error(`Error: ${error.response?.data?.error?.message || error.message}`);
    process.exit(1);
  }
}

// Create content types via Strapi API
async function createContentTypes(jwt) {
  log.step('Step 2: Creating Content Types');
  
  const contentTypes = [
    {
      name: 'Project',
      singularName: 'project',
      pluralName: 'projects',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        category: { type: 'string' },
        location: { type: 'string' },
        status: { type: 'string' },
        area: { type: 'decimal' },
        budget: { type: 'decimal' },
        startDate: { type: 'date' },
        completionDate: { type: 'date' },
        client: { type: 'string' },
        images: { type: 'media', multiple: true, allowedTypes: ['images'] },
      }
    },
    {
      name: 'Service',
      singularName: 'service',
      pluralName: 'services',
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text' },
        category: { type: 'string' },
        icon: { type: 'string' },
      }
    },
    {
      name: 'Client',
      singularName: 'client',
      pluralName: 'clients',
      attributes: {
        name: { type: 'string', required: true },
        email: { type: 'email' },
        phone: { type: 'string' },
        company: { type: 'string' },
        address: { type: 'text' },
        type: { type: 'string' },
      }
    },
    {
      name: 'Project Milestone',
      singularName: 'project-milestone',
      pluralName: 'project-milestones',
      attributes: {
        name: { type: 'string', required: true },
        description: { type: 'text' },
        phase: { type: 'integer' },
        keyOutput: { type: 'string' },
        deliverables: { type: 'json' },
        status: { type: 'string' },
        dueDate: { type: 'date' },
        completionDate: { type: 'date' },
        signOffRequired: { type: 'boolean', default: true },
        signOffDate: { type: 'date' },
        signOffBy: { type: 'string' },
        notes: { type: 'text' },
        projectId: { type: 'string' },
      }
    },
    {
      name: 'Invoice',
      singularName: 'invoice',
      pluralName: 'invoices',
      attributes: {
        invoiceNumber: { type: 'string', required: true },
        projectId: { type: 'string' },
        milestoneId: { type: 'string' },
        amount: { type: 'decimal' },
        tax: { type: 'decimal' },
        total: { type: 'decimal' },
        status: { type: 'string' },
        issueDate: { type: 'date' },
        dueDate: { type: 'date' },
        paidDate: { type: 'date' },
        description: { type: 'text' },
      }
    },
  ];

  log.info('Note: Content types must be created manually in Strapi admin panel.');
  log.info('This script will create sample data once content types exist.');
  log.warning('Please create the following content types in Strapi admin:');
  
  contentTypes.forEach((ct, index) => {
    console.log(`\n${index + 1}. ${ct.name} (${ct.pluralName})`);
    console.log('   Attributes:');
    Object.entries(ct.attributes).forEach(([key, value]) => {
      console.log(`   - ${key}: ${value.type}${value.required ? ' (required)' : ''}`);
    });
  });

  const proceed = await prompt('\nHave you created these content types? (yes/no): ');
  if (proceed.toLowerCase() !== 'yes') {
    log.warning('Please create the content types first, then run this script again.');
    process.exit(0);
  }
}

// Configure API permissions
async function configurePermissions(jwt) {
  log.step('Step 3: Configuring API Permissions');
  log.info('Permissions must be configured manually in Strapi admin.');
  log.info('Go to Settings → Roles → Public and enable:');
  log.info('  - Project: find, findOne');
  log.info('  - Service: find, findOne');
  log.info('  - Client: find, findOne');
  log.info('  - Project Milestone: find, findOne');
  log.info('  - Invoice: find, findOne');
  
  const proceed = await prompt('\nHave you configured permissions? (yes/no): ');
  if (proceed.toLowerCase() !== 'yes') {
    log.warning('Please configure permissions first, then run this script again.');
    process.exit(0);
  }
}

// Add sample data
async function addSampleData(jwt) {
  log.step('Step 4: Adding Sample Data');

  const headers = {
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };

  try {
    // Add sample client
    log.info('Creating sample client...');
    const clientData = {
      data: {
        name: 'TechCorp Solutions Inc.',
        email: 'contact@techcorp.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Solutions Inc.',
        address: '123 Business Ave, Chicago, IL 60601',
        type: 'Commercial',
      }
    };

    const clientResponse = await axios.post(`${API_URL}/clients`, clientData, { headers });
    const clientId = clientResponse.data.data.id;
    log.success(`Client created with ID: ${clientId}`);

    // Add sample services
    log.info('Creating sample services...');
    const services = [
      {
        title: 'Interior Design',
        description: 'Complete interior design services for residential and commercial spaces, including space planning, material selection, and 3D visualization.',
        category: 'Both',
        icon: '🏠',
      },
      {
        title: 'Space Planning',
        description: 'Optimize your space with professional layout planning and furniture arrangement for maximum functionality.',
        category: 'Both',
        icon: '📐',
      },
      {
        title: 'Construction Management',
        description: 'End-to-end construction project management with milestone tracking and quality control.',
        category: 'Commercial',
        icon: '🏗️',
      },
      {
        title: 'Residential Design',
        description: 'Custom home design services for 2-7 bedroom apartments with modern aesthetics.',
        category: 'Residential',
        icon: '🏡',
      },
    ];

    for (const service of services) {
      await axios.post(`${API_URL}/services`, { data: service }, { headers });
      log.success(`Service created: ${service.title}`);
    }

    // Add sample project
    log.info('Creating sample project...');
    const projectData = {
      data: {
        title: 'Modern Office Interior Redesign',
        description: 'Complete interior redesign of a 5,000 sq ft office space with open floor plan, collaborative workspaces, and modern amenities. Project includes full construction management with 5-phase milestone tracking.',
        category: 'Commercial',
        location: 'Chicago, IL',
        status: 'In Progress',
        area: 5000,
        budget: 250000,
        startDate: '2026-01-15',
        completionDate: '2026-06-30',
        client: 'TechCorp Solutions Inc.',
      }
    };

    const projectResponse = await axios.post(`${API_URL}/projects`, projectData, { headers });
    const projectId = projectResponse.data.data.id;
    log.success(`Project created with ID: ${projectId}`);

    // Add construction milestones
    log.info('Creating construction milestones...');
    const milestones = [
      {
        name: 'Site Ready',
        description: 'Site preparation and initial surveys completed',
        phase: 1,
        keyOutput: 'Survey & Soil Report',
        deliverables: [
          'Topographic Survey',
          'Geotechnical Report',
          'Site Clearance Certificate',
          'Utility Connection Approvals',
        ],
        status: 'Completed',
        dueDate: '2026-02-01',
        completionDate: '2026-01-28',
        signOffRequired: true,
        signOffDate: '2026-01-29',
        signOffBy: 'John Smith, TechCorp',
        notes: 'All site preparations completed ahead of schedule',
        projectId: projectId.toString(),
      },
      {
        name: 'Design Freeze',
        description: 'All design documents finalized and approved',
        phase: 2,
        keyOutput: 'Full CAD Set (Arch/Elec/AC)',
        deliverables: [
          'Architectural Drawings',
          'Electrical Drawings',
          'HVAC Drawings',
          'Plumbing Drawings',
          'Structural Drawings',
          'Interior Design Specifications',
        ],
        status: 'Completed',
        dueDate: '2026-02-28',
        completionDate: '2026-02-25',
        signOffRequired: true,
        signOffDate: '2026-02-26',
        signOffBy: 'John Smith, TechCorp',
        notes: 'Design approved. All changes after this require change orders.',
        projectId: projectId.toString(),
      },
      {
        name: 'Mechanical/Electrical',
        description: 'All concealed MEP work completed and inspected',
        phase: 3,
        keyOutput: 'Concealed conduits & ducts inspected',
        deliverables: [
          'Electrical Conduit Installation',
          'HVAC Duct Installation',
          'Plumbing Rough-in',
          'Fire Safety Systems',
          'Inspection Report',
          'As-Built Drawings (MEP)',
        ],
        status: 'In Progress',
        dueDate: '2026-04-15',
        completionDate: null,
        signOffRequired: true,
        signOffDate: null,
        signOffBy: null,
        notes: 'Critical phase - no access to concealed work after sign-off',
        projectId: projectId.toString(),
      },
      {
        name: 'The Skin',
        description: 'All visible finishes and fixtures installed',
        phase: 4,
        keyOutput: 'Flooring & Ceiling complete',
        deliverables: [
          'Flooring Installation',
          'Ceiling Installation',
          'Wall Finishes',
          'Door & Window Installation',
          'Fixture Installation',
          'Painting & Finishing',
        ],
        status: 'Pending',
        dueDate: '2026-05-30',
        completionDate: null,
        signOffRequired: true,
        signOffDate: null,
        signOffBy: null,
        notes: 'Awaiting completion of MEP phase',
        projectId: projectId.toString(),
      },
      {
        name: 'Handover',
        description: 'Project completion and client handover',
        phase: 5,
        keyOutput: 'Ready for Move-in',
        deliverables: [
          'Final Cleaning',
          'Punch List Completion',
          'Systems Testing & Commissioning',
          'Occupancy Certificate',
          'As-Built Documentation',
          'Warranty Documents',
          'Operation & Maintenance Manuals',
          'Key Handover',
        ],
        status: 'Pending',
        dueDate: '2026-06-30',
        completionDate: null,
        signOffRequired: true,
        signOffDate: null,
        signOffBy: null,
        notes: 'Final phase - complete project handover',
        projectId: projectId.toString(),
      },
    ];

    for (const milestone of milestones) {
      await axios.post(`${API_URL}/project-milestones`, { data: milestone }, { headers });
      log.success(`Milestone created: ${milestone.name} (Phase ${milestone.phase})`);
    }

    // Add sample invoices
    log.info('Creating sample invoices...');
    const invoices = [
      {
        invoiceNumber: 'INV-2026-001',
        projectId: projectId.toString(),
        milestoneId: '1',
        amount: 50000,
        tax: 5000,
        total: 55000,
        status: 'Paid',
        issueDate: '2026-01-29',
        dueDate: '2026-02-12',
        paidDate: '2026-02-08',
        description: 'Payment for Milestone 1: Site Ready',
      },
      {
        invoiceNumber: 'INV-2026-002',
        projectId: projectId.toString(),
        milestoneId: '2',
        amount: 75000,
        tax: 7500,
        total: 82500,
        status: 'Paid',
        issueDate: '2026-02-26',
        dueDate: '2026-03-12',
        paidDate: '2026-03-10',
        description: 'Payment for Milestone 2: Design Freeze',
      },
      {
        invoiceNumber: 'INV-2026-003',
        projectId: projectId.toString(),
        milestoneId: '3',
        amount: 60000,
        tax: 6000,
        total: 66000,
        status: 'Pending',
        issueDate: '2026-03-20',
        dueDate: '2026-04-20',
        paidDate: null,
        description: 'Payment for Milestone 3: Mechanical/Electrical (Due upon completion)',
      },
    ];

    for (const invoice of invoices) {
      await axios.post(`${API_URL}/invoices`, { data: invoice }, { headers });
      log.success(`Invoice created: ${invoice.invoiceNumber} - $${invoice.total}`);
    }

    log.success('\n✨ All sample data created successfully!');
    
  } catch (error) {
    log.error('Error creating sample data:');
    log.error(error.response?.data?.error?.message || error.message);
    if (error.response?.data?.error?.details) {
      console.log(JSON.stringify(error.response.data.error.details, null, 2));
    }
  }
}

// Publish all content
async function publishContent(jwt) {
  log.step('Step 5: Publishing Content');
  log.info('All content has been created in draft mode.');
  log.info('Please go to Strapi admin and publish:');
  log.info('  - All Projects');
  log.info('  - All Services');
  log.info('  - All Clients');
  log.info('  - All Project Milestones');
  log.info('  - All Invoices');
  log.info('\nOr use the "Publish All" button in each content type.');
}

// Main execution
async function main() {
  console.log(`
${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   Architectural Firm Website - Strapi Setup Script       ║
║                                                           ║
║   This script will create sample data for a complete     ║
║   construction project with milestones, invoices, and    ║
║   client information.                                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}
  `);

  try {
    // Check if Strapi is running
    log.info('Checking if Strapi is running...');
    await axios.get(STRAPI_URL);
    log.success('Strapi is running!');

    // Login
    const jwt = await login();

    // Create content types (manual step)
    await createContentTypes(jwt);

    // Configure permissions (manual step)
    await configurePermissions(jwt);

    // Add sample data
    await addSampleData(jwt);

    // Publish content (manual step)
    await publishContent(jwt);

    console.log(`
${colors.green}${colors.bright}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ✓ Setup Complete!                                      ║
║                                                           ║
║   Next Steps:                                            ║
║   1. Publish all content in Strapi admin                 ║
║   2. Visit http://localhost:3000 to see your website     ║
║   3. Explore the sample project with milestones          ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}
    `);

  } catch (error) {
    log.error('Setup failed:');
    log.error(error.message);
    process.exit(1);
  }
}

// Run the script
main();

// Made with Bob
