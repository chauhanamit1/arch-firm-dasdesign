structural design# Project Management System for Architectural Firms
## Complete Interior Project Workflow with Timelines, Milestones, Approvals & Invoicing

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Content Types Setup](#content-types-setup)
3. [Project Workflow](#project-workflow)
4. [Sample Project Data](#sample-project-data)
5. [Email Notifications](#email-notifications)
6. [Meeting Scheduling](#meeting-scheduling)
7. [Frontend Implementation](#frontend-implementation)

---

## System Overview

### Features Included:
✅ Project onboarding and tracking
✅ Timeline management with milestones
✅ Approval workflow for each milestone
✅ Invoice generation per milestone
✅ Email notifications for approvals
✅ Meeting scheduling and tracking
✅ Document management
✅ Client portal access
✅ Progress tracking dashboard

### Project Lifecycle:
```
1. Project Initiation
   ↓
2. Discovery & Planning (Milestone 1)
   ↓ [Approval Required]
3. Concept Design (Milestone 2)
   ↓ [Approval Required]
4. Design Development (Milestone 3)
   ↓ [Approval Required]
5. Documentation (Milestone 4)
   ↓ [Approval Required]
6. Implementation Support (Milestone 5)
   ↓ [Final Approval]
7. Project Completion
```

---

## Content Types Setup

### 1. Interior Project Content Type

Go to Strapi Admin → Content-Type Builder → Create new collection type

**Collection Name:** `interior-project`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| projectName | Text (Short) | Required, Unique |
| projectCode | Text (Short) | Required, Unique (e.g., "INT-2025-001") |
| client | Relation | Many-to-one with Client |
| projectType | Enumeration | Values: Interior Design, Renovation, Full Build-out |
| spaceType | Enumeration | Values: Residential, Office, Retail, Hospitality, Healthcare |
| squareFootage | Number | Decimal |
| budget | Number | Decimal |
| startDate | Date | Required |
| estimatedEndDate | Date | Required |
| actualEndDate | Date | Optional |
| status | Enumeration | Values: Initiated, In Progress, On Hold, Completed, Cancelled; Default: Initiated |
| currentPhase | Text (Short) | Current milestone name |
| overallProgress | Number | Integer (0-100) |
| projectDescription | Rich Text | - |
| scopeOfWork | Rich Text | - |
| specialRequirements | Rich Text | - |
| projectManager | Relation | Many-to-one with Team Member |
| leadDesigner | Relation | Many-to-one with Team Member |
| teamMembers | Relation | Many-to-many with Team Member |
| documents | Media | Multiple files |
| images | Media | Multiple files |
| notes | Component (repeatable) | ProjectNote component |

### 2. Client Content Type

**Collection Name:** `client`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| companyName | Text (Short) | - |
| contactPerson | Text (Short) | Required |
| email | Email | Required, Unique |
| phone | Text (Short) | Required |
| address | Text (Long) | - |
| city | Text (Short) | - |
| state | Text (Short) | - |
| zipCode | Text (Short) | - |
| clientType | Enumeration | Values: Individual, Corporate, Government |
| accountStatus | Enumeration | Values: Active, Inactive, Pending; Default: Active |
| projects | Relation | One-to-many with Interior Project |
| portalAccess | Boolean | Default: false |
| portalUsername | Text (Short) | - |
| notes | Text (Long) | - |

### 3. Project Milestone Content Type

**Collection Name:** `project-milestone`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| milestoneName | Text (Short) | Required |
| milestoneNumber | Number | Integer, Required |
| project | Relation | Many-to-one with Interior Project |
| description | Rich Text | - |
| startDate | Date | Required |
| dueDate | Date | Required |
| completedDate | Date | - |
| status | Enumeration | Values: Not Started, In Progress, Pending Approval, Approved, Rejected, Completed; Default: Not Started |
| progress | Number | Integer (0-100), Default: 0 |
| deliverables | Component (repeatable) | Deliverable component |
| approvalRequired | Boolean | Default: true |
| approvalStatus | Enumeration | Values: Pending, Approved, Rejected, Revision Requested; Default: Pending |
| approvedBy | Text (Short) | - |
| approvalDate | DateTime | - |
| approvalComments | Text (Long) | - |
| invoice | Relation | One-to-one with Invoice |
| documents | Media | Multiple files |
| meetings | Relation | One-to-many with Meeting |

### 4. Invoice Content Type

**Collection Name:** `invoice`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| invoiceNumber | Text (Short) | Required, Unique (e.g., "INV-2025-001") |
| project | Relation | Many-to-one with Interior Project |
| milestone | Relation | One-to-one with Project Milestone |
| client | Relation | Many-to-one with Client |
| issueDate | Date | Required |
| dueDate | Date | Required |
| paidDate | Date | - |
| amount | Number | Decimal, Required |
| taxAmount | Number | Decimal |
| totalAmount | Number | Decimal, Required |
| status | Enumeration | Values: Draft, Sent, Paid, Overdue, Cancelled; Default: Draft |
| paymentMethod | Enumeration | Values: Bank Transfer, Check, Credit Card, Cash |
| paymentTerms | Text (Short) | Default: "Net 30" |
| lineItems | Component (repeatable) | InvoiceLineItem component |
| notes | Text (Long) | - |
| invoiceFile | Media | Single file (PDF) |

### 5. Meeting Content Type

**Collection Name:** `meeting`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| meetingTitle | Text (Short) | Required |
| project | Relation | Many-to-one with Interior Project |
| milestone | Relation | Many-to-one with Project Milestone |
| meetingType | Enumeration | Values: Kickoff, Design Review, Client Presentation, Site Visit, Progress Review, Final Walkthrough |
| scheduledDate | DateTime | Required |
| duration | Number | Integer (minutes) |
| location | Text (Short) | - |
| meetingLink | Text (Short) | For virtual meetings |
| attendees | JSON | Array of attendee objects |
| agenda | Rich Text | - |
| status | Enumeration | Values: Scheduled, Completed, Cancelled, Rescheduled; Default: Scheduled |
| minutes | Rich Text | Meeting notes |
| actionItems | Component (repeatable) | ActionItem component |
| documents | Media | Multiple files |
| recordingLink | Text (Short) | - |

### 6. Email Notification Content Type

**Collection Name:** `email-notification`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| notificationType | Enumeration | Values: Milestone Approval, Invoice Sent, Meeting Reminder, Project Update, Document Shared |
| project | Relation | Many-to-one with Interior Project |
| recipient | Email | Required |
| subject | Text (Short) | Required |
| body | Rich Text | Required |
| sentDate | DateTime | - |
| status | Enumeration | Values: Pending, Sent, Failed, Bounced; Default: Pending |
| readDate | DateTime | - |
| clickedLinks | JSON | - |

---

## Components Setup

### 1. ProjectNote Component

**Component Name:** `project-note`

**Fields:**
- noteText (Rich Text)
- createdBy (Text Short)
- createdAt (DateTime)
- isInternal (Boolean) - visible only to team

### 2. Deliverable Component

**Component Name:** `deliverable`

**Fields:**
- deliverableName (Text Short)
- description (Text Long)
- status (Enumeration: Pending, In Progress, Completed)
- file (Media - Single file)
- completedDate (Date)

### 3. InvoiceLineItem Component

**Component Name:** `invoice-line-item`

**Fields:**
- description (Text Short)
- quantity (Number - Decimal)
- unitPrice (Number - Decimal)
- amount (Number - Decimal)

### 4. ActionItem Component

**Component Name:** `action-item`

**Fields:**
- task (Text Short)
- assignedTo (Text Short)
- dueDate (Date)
- status (Enumeration: Open, In Progress, Completed)
- completedDate (Date)

---

## Sample Project Data

### Sample Interior Project

```json
{
  "projectName": "Modern Office Interior Redesign",
  "projectCode": "INT-2025-001",
  "projectType": "Interior Design",
  "spaceType": "Office",
  "squareFootage": 5000,
  "budget": 250000,
  "startDate": "2025-02-01",
  "estimatedEndDate": "2025-08-01",
  "status": "In Progress",
  "currentPhase": "Concept Design",
  "overallProgress": 35,
  "projectDescription": "Complete interior redesign of a 5,000 sq ft corporate office space. Focus on creating collaborative work environments, private meeting rooms, and modern amenities.",
  "scopeOfWork": "- Space planning and layout design\n- Material and finish selection\n- Furniture specification\n- Lighting design\n- Custom millwork design\n- Project management and coordination",
  "specialRequirements": "- LEED certification required\n- Phased implementation to minimize business disruption\n- Integration with existing building systems"
}
```

### Sample Client

```json
{
  "companyName": "TechCorp Solutions Inc.",
  "contactPerson": "Sarah Johnson",
  "email": "sarah.johnson@techcorp.com",
  "phone": "+1-555-0123",
  "address": "123 Business Plaza",
  "city": "Chicago",
  "state": "IL",
  "zipCode": "60601",
  "clientType": "Corporate",
  "accountStatus": "Active",
  "portalAccess": true,
  "portalUsername": "sjohnson@techcorp"
}
```

### Sample Milestones

#### Milestone 1: Discovery & Planning
```json
{
  "milestoneName": "Discovery & Planning",
  "milestoneNumber": 1,
  "description": "Initial project discovery, site analysis, and planning phase",
  "startDate": "2025-02-01",
  "dueDate": "2025-02-28",
  "status": "Completed",
  "progress": 100,
  "approvalStatus": "Approved",
  "approvedBy": "Sarah Johnson",
  "approvalDate": "2025-03-01T10:00:00.000Z",
  "deliverables": [
    {
      "deliverableName": "Site Analysis Report",
      "description": "Comprehensive analysis of existing space",
      "status": "Completed",
      "completedDate": "2025-02-15"
    },
    {
      "deliverableName": "Project Brief",
      "description": "Detailed project requirements and objectives",
      "status": "Completed",
      "completedDate": "2025-02-20"
    },
    {
      "deliverableName": "Preliminary Budget",
      "description": "Initial cost estimates and budget breakdown",
      "status": "Completed",
      "completedDate": "2025-02-25"
    }
  ]
}
```

#### Milestone 2: Concept Design
```json
{
  "milestoneName": "Concept Design",
  "milestoneNumber": 2,
  "description": "Development of initial design concepts and space planning",
  "startDate": "2025-03-01",
  "dueDate": "2025-04-15",
  "status": "In Progress",
  "progress": 75,
  "approvalStatus": "Pending",
  "deliverables": [
    {
      "deliverableName": "Space Planning Options",
      "description": "3 layout options with furniture placement",
      "status": "Completed",
      "completedDate": "2025-03-20"
    },
    {
      "deliverableName": "Mood Boards",
      "description": "Visual concept boards for each space",
      "status": "Completed",
      "completedDate": "2025-03-25"
    },
    {
      "deliverableName": "3D Renderings",
      "description": "Photorealistic renderings of key spaces",
      "status": "In Progress"
    },
    {
      "deliverableName": "Material Palette",
      "description": "Proposed materials and finishes",
      "status": "In Progress"
    }
  ]
}
```

#### Milestone 3: Design Development
```json
{
  "milestoneName": "Design Development",
  "milestoneNumber": 3,
  "description": "Detailed design development and specifications",
  "startDate": "2025-04-16",
  "dueDate": "2025-05-31",
  "status": "Not Started",
  "progress": 0,
  "approvalStatus": "Pending",
  "deliverables": [
    {
      "deliverableName": "Detailed Floor Plans",
      "description": "Dimensioned plans with all details",
      "status": "Not Started"
    },
    {
      "deliverableName": "Reflected Ceiling Plans",
      "description": "Lighting and ceiling design",
      "status": "Not Started"
    },
    {
      "deliverableName": "Furniture Specifications",
      "description": "Complete furniture schedule with specs",
      "status": "Not Started"
    },
    {
      "deliverableName": "Material Specifications",
      "description": "Detailed material and finish specifications",
      "status": "Not Started"
    }
  ]
}
```

### Sample Invoice

```json
{
  "invoiceNumber": "INV-2025-001",
  "issueDate": "2025-03-01",
  "dueDate": "2025-03-31",
  "amount": 50000,
  "taxAmount": 4000,
  "totalAmount": 54000,
  "status": "Paid",
  "paidDate": "2025-03-15",
  "paymentMethod": "Bank Transfer",
  "paymentTerms": "Net 30",
  "lineItems": [
    {
      "description": "Discovery & Planning Phase",
      "quantity": 1,
      "unitPrice": 50000,
      "amount": 50000
    }
  ],
  "notes": "Payment for Milestone 1: Discovery & Planning. Thank you for your business!"
}
```

### Sample Meetings

#### Kickoff Meeting
```json
{
  "meetingTitle": "Project Kickoff Meeting",
  "meetingType": "Kickoff",
  "scheduledDate": "2025-02-05T10:00:00.000Z",
  "duration": 120,
  "location": "Client Office - Conference Room A",
  "status": "Completed",
  "attendees": [
    {
      "name": "Sarah Johnson",
      "role": "Client Contact",
      "email": "sarah.johnson@techcorp.com"
    },
    {
      "name": "Michael Chen",
      "role": "Project Manager",
      "email": "mchen@archfirm.com"
    },
    {
      "name": "Emily Rodriguez",
      "role": "Lead Designer",
      "email": "erodriguez@archfirm.com"
    }
  ],
  "agenda": "1. Introductions\n2. Project overview and objectives\n3. Timeline review\n4. Budget discussion\n5. Communication protocols\n6. Next steps",
  "minutes": "Meeting went well. Client expressed excitement about the project. Key decisions: Weekly progress meetings on Mondays at 2 PM. Primary contact is Sarah Johnson. Budget approved at $250,000.",
  "actionItems": [
    {
      "task": "Send project brief to client for review",
      "assignedTo": "Michael Chen",
      "dueDate": "2025-02-07",
      "status": "Completed",
      "completedDate": "2025-02-06"
    },
    {
      "task": "Schedule site visit",
      "assignedTo": "Emily Rodriguez",
      "dueDate": "2025-02-10",
      "status": "Completed",
      "completedDate": "2025-02-08"
    }
  ]
}
```

#### Design Review Meeting
```json
{
  "meetingTitle": "Concept Design Review",
  "meetingType": "Design Review",
  "scheduledDate": "2025-03-28T14:00:00.000Z",
  "duration": 90,
  "location": "Virtual Meeting",
  "meetingLink": "https://zoom.us/j/1234567890",
  "status": "Scheduled",
  "attendees": [
    {
      "name": "Sarah Johnson",
      "role": "Client Contact",
      "email": "sarah.johnson@techcorp.com"
    },
    {
      "name": "David Park",
      "role": "CEO",
      "email": "dpark@techcorp.com"
    },
    {
      "name": "Emily Rodriguez",
      "role": "Lead Designer",
      "email": "erodriguez@archfirm.com"
    }
  ],
  "agenda": "1. Present 3 space planning options\n2. Review mood boards and material palette\n3. Show 3D renderings\n4. Discuss feedback and preferences\n5. Next steps and timeline",
  "actionItems": [
    {
      "task": "Prepare presentation materials",
      "assignedTo": "Emily Rodriguez",
      "dueDate": "2025-03-27",
      "status": "In Progress"
    },
    {
      "task": "Send meeting link to all attendees",
      "assignedTo": "Michael Chen",
      "dueDate": "2025-03-26",
      "status": "Open"
    }
  ]
}
```

---

## Email Notification Templates

### 1. Milestone Approval Request

```
Subject: Action Required: Approve Milestone - {{milestoneName}}

Dear {{clientName}},

We're pleased to inform you that we've completed {{milestoneName}} for your project "{{projectName}}".

Project Details:
- Project Code: {{projectCode}}
- Milestone: {{milestoneName}} ({{milestoneNumber}} of 5)
- Completion Date: {{completedDate}}

Deliverables:
{{#each deliverables}}
- {{deliverableName}}: {{description}}
{{/each}}

Please review the deliverables and provide your approval by clicking the link below:

[Review and Approve Milestone]

Once approved, we'll proceed with the next phase and send the invoice for this milestone.

If you have any questions or need revisions, please don't hesitate to contact us.

Best regards,
{{projectManagerName}}
{{firmName}}
```

### 2. Invoice Notification

```
Subject: Invoice {{invoiceNumber}} - {{projectName}}

Dear {{clientName}},

Please find attached invoice {{invoiceNumber}} for {{milestoneName}}.

Invoice Details:
- Invoice Number: {{invoiceNumber}}
- Issue Date: {{issueDate}}
- Due Date: {{dueDate}}
- Amount: ${{amount}}
- Tax: ${{taxAmount}}
- Total Amount: ${{totalAmount}}

Payment Terms: {{paymentTerms}}

You can view and pay your invoice online:
[View Invoice] [Pay Now]

Thank you for your business!

Best regards,
Accounting Department
{{firmName}}
```

### 3. Meeting Reminder

```
Subject: Reminder: {{meetingTitle}} - Tomorrow at {{meetingTime}}

Dear {{attendeeName}},

This is a reminder about our upcoming meeting:

Meeting Details:
- Title: {{meetingTitle}}
- Date: {{meetingDate}}
- Time: {{meetingTime}}
- Duration: {{duration}} minutes
- Location: {{location}}
{{#if meetingLink}}
- Join Link: {{meetingLink}}
{{/if}}

Agenda:
{{agenda}}

Please review any attached materials before the meeting.

Looking forward to seeing you!

Best regards,
{{organizerName}}
```

---

## Frontend Implementation

### Project Dashboard Component

```typescript
// frontend/src/components/projects/ProjectDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { getInteriorProjects } from '@/lib/api';

interface Project {
  id: number;
  attributes: {
    projectName: string;
    projectCode: string;
    status: string;
    currentPhase: string;
    overallProgress: number;
    startDate: string;
    estimatedEndDate: string;
  };
}

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getInteriorProjects();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { projectName, projectCode, status, currentPhase, overallProgress } =
    project.attributes;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{projectName}</h3>
          <p className="text-sm text-gray-500">{projectCode}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : status === 'Completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Current Phase:</span>
          <span className="font-semibold">{currentPhase}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-600 mt-1">
          {overallProgress}% Complete
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );
}
```

### Milestone Timeline Component

```typescript
// frontend/src/components/projects/MilestoneTimeline.tsx
'use client';

interface Milestone {
  id: number;
  attributes: {
    milestoneName: string;
    milestoneNumber: number;
    status: string;
    progress: number;
    dueDate: string;
    approvalStatus: string;
  };
}

export default function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />

      {milestones.map((milestone, index) => (
        <MilestoneItem
          key={milestone.id}
          milestone={milestone}
          isLast={index === milestones.length - 1}
        />
      ))}
    </div>
  );
}

function MilestoneItem({ milestone, isLast }: { milestone: Milestone; isLast: boolean }) {
  const { milestoneName, milestoneNumber, status, progress, dueDate, approvalStatus } =
    milestone.attributes;

  const statusColor =
    status === 'Completed'
      ? 'bg-green-500'
      : status === 'In Progress'
      ? 'bg-blue-500'
      : 'bg-gray-300';

  return (
    <div className="relative pl-20 pb-12">
      {/* Milestone number circle */}
      <div
        className={`absolute left-4 w-8 h-8 rounded-full ${statusColor} flex items-center justify-center text-white font-bold z-10`}
      >
        {milestoneNumber}
      </div>

      {/* Milestone content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-800">{milestoneName}</h4>
            <p className="text-sm text-gray-500">Due: {new Date(dueDate).toLocaleDateString()}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'Completed'
                ? 'bg-green-100 text-green-800'
                : status === 'In Progress'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${statusColor}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Approval status */}
        {status === 'Pending Approval' && (
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
            <span className="text-sm text-yellow-800">
              Approval Status: {approvalStatus}
            </span>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-700">
              Review & Approve
            </button>
          </div>
        )}

        {status === 'Completed' && (
          <div className="flex items-center p-3 bg-green-50 rounded-md">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-green-800">Approved & Completed</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Next Steps to Implement

1. **Create all content types in Strapi** (follow Content Types Setup section)
2. **Add sample data** using the JSON examples provided
3. **Set up email service** (SendGrid, Mailgun, or AWS SES)
4. **Implement frontend components** for project management
5. **Configure webhooks** for automated notifications
6. **Set up client portal** with authentication
7. **Test the complete workflow** with a sample project

This creates a fully functional project management system for your architectural firm!