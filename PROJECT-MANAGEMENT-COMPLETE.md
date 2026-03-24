# Complete Project Management System for Architectural Firms
## Interior Projects with Timelines, Milestones, Approvals, Invoicing & Contracts

---

## Table of Contents
1. [System Overview](#system-overview)
2. [Content Types Setup](#content-types-setup)
3. [Contract Documents](#contract-documents)
4. [Sample Project Workflow](#sample-project-workflow)
5. [Implementation Steps](#implementation-steps)

---

## System Overview

### Complete Feature Set:
✅ Project onboarding and tracking
✅ Timeline management with milestones
✅ Approval workflow for each milestone
✅ Invoice generation per milestone
✅ **Contract document management**
✅ **Digital contract signing**
✅ Email notifications for approvals
✅ Meeting scheduling and tracking
✅ Document management
✅ Client portal access
✅ Progress tracking dashboard

---

## Content Types Setup

### 1. Contract Document Content Type

**Collection Name:** `contract-document`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| contractType | Enumeration | Values: Service Agreement, Design Contract, Construction Contract, NDA, Change Order, Amendment |
| contractNumber | Text (Short) | Required, Unique (e.g., "CON-2025-001") |
| contractTitle | Text (Short) | Required |
| project | Relation | Many-to-one with Interior Project |
| client | Relation | Many-to-one with Client |
| contractValue | Number | Decimal |
| startDate | Date | Required |
| endDate | Date | - |
| signedDate | Date | - |
| status | Enumeration | Values: Draft, Sent for Signature, Signed, Active, Completed, Terminated; Default: Draft |
| contractFile | Media | Single file (PDF) |
| signedContractFile | Media | Single file (PDF) |
| terms | Rich Text | Contract terms and conditions |
| paymentSchedule | Component (repeatable) | PaymentSchedule component |
| deliverables | Rich Text | - |
| clientSignature | JSON | Signature data |
| firmSignature | JSON | Signature data |
| witnesses | JSON | Array of witness information |
| notes | Text (Long) | - |

### 2. Change Order Content Type

**Collection Name:** `change-order`

**Fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| changeOrderNumber | Text (Short) | Required, Unique |
| project | Relation | Many-to-one with Interior Project |
| originalContract | Relation | Many-to-one with Contract Document |
| requestDate | Date | Required |
| requestedBy | Text (Short) | - |
| description | Rich Text | Required |
| reason | Rich Text | - |
| scopeImpact | Rich Text | - |
| costImpact | Number | Decimal (can be negative) |
| timeImpact | Number | Integer (days) |
| status | Enumeration | Values: Pending Review, Approved, Rejected, In Progress, Completed |
| approvedBy | Text (Short) | - |
| approvalDate | Date | - |
| documents | Media | Multiple files |

---

## Contract Documents & Templates

### 1. Interior Design Services Agreement

```markdown
# INTERIOR DESIGN SERVICES AGREEMENT

**Contract Number:** {{contractNumber}}
**Date:** {{contractDate}}

## PARTIES

**CLIENT:**
Name: {{clientName}}
Company: {{companyName}}
Address: {{clientAddress}}
Email: {{clientEmail}}
Phone: {{clientPhone}}

**DESIGNER:**
Name: {{firmName}}
Address: {{firmAddress}}
Email: {{firmEmail}}
Phone: {{firmPhone}}
License Number: {{licenseNumber}}

## PROJECT DESCRIPTION

**Project Name:** {{projectName}}
**Project Location:** {{projectLocation}}
**Project Type:** {{projectType}}
**Square Footage:** {{squareFootage}} sq ft
**Estimated Start Date:** {{startDate}}
**Estimated Completion Date:** {{endDate}}

## SCOPE OF SERVICES

The Designer agrees to provide the following interior design services:

### Phase 1: Discovery & Planning ({{phase1Duration}})
- Initial consultation and needs assessment
- Site analysis and measurements
- Space programming
- Preliminary budget development
- Project timeline development

**Deliverables:**
- Site analysis report
- Project brief document
- Preliminary budget estimate
- Project schedule

**Fee:** ${{phase1Fee}}

### Phase 2: Concept Design ({{phase2Duration}})
- Space planning (minimum 3 options)
- Concept development
- Mood boards and material palettes
- 3D renderings ({{renderingCount}} views)
- Preliminary furniture and fixture selections

**Deliverables:**
- Space planning options
- Concept presentation boards
- 3D renderings
- Material samples
- Preliminary furniture schedule

**Fee:** ${{phase2Fee}}

### Phase 3: Design Development ({{phase3Duration}})
- Detailed floor plans
- Reflected ceiling plans
- Lighting design
- Furniture, fixtures, and equipment (FF&E) specifications
- Material and finish specifications
- Custom millwork design
- Detailed cost estimates

**Deliverables:**
- Construction documents set
- FF&E specifications
- Material specifications
- Detailed budget

**Fee:** ${{phase3Fee}}

### Phase 4: Documentation ({{phase4Duration}})
- Construction drawings
- Technical specifications
- Permit documentation (if required)
- Contractor coordination documents

**Deliverables:**
- Complete construction document set
- Specification manual
- Permit-ready drawings

**Fee:** ${{phase4Fee}}

### Phase 5: Implementation Support ({{phase5Duration}})
- Contractor selection assistance
- Construction administration
- Site visits ({{siteVisitCount}} visits included)
- Procurement coordination
- Installation supervision
- Final walkthrough

**Deliverables:**
- Site visit reports
- Punch list
- Project closeout documentation

**Fee:** ${{phase5Fee}}

## TOTAL PROJECT FEE

**Base Design Fee:** ${{totalDesignFee}}
**Estimated Reimbursable Expenses:** ${{estimatedExpenses}}
**Total Estimated Fee:** ${{totalProjectFee}}

## PAYMENT SCHEDULE

| Milestone | Description | Amount | Due Date |
|-----------|-------------|--------|----------|
| Upon Signing | Retainer | ${{retainerAmount}} | {{retainerDueDate}} |
| Phase 1 Complete | Discovery & Planning | ${{phase1Fee}} | Upon approval |
| Phase 2 Complete | Concept Design | ${{phase2Fee}} | Upon approval |
| Phase 3 Complete | Design Development | ${{phase3Fee}} | Upon approval |
| Phase 4 Complete | Documentation | ${{phase4Fee}} | Upon approval |
| Phase 5 Complete | Implementation Support | ${{phase5Fee}} | Upon completion |

**Payment Terms:** Net 30 days from invoice date

## REIMBURSABLE EXPENSES

The following expenses will be billed at cost plus {{expenseMarkup}}%:
- Printing and reproduction
- Travel expenses beyond {{travelRadius}} miles
- Photography and renderings (beyond included)
- Samples and mock-ups
- Permit and filing fees
- Shipping and courier services
- Specialty consultants

## CLIENT RESPONSIBILITIES

The Client agrees to:
1. Provide timely decisions and approvals
2. Provide access to project site
3. Provide accurate information about existing conditions
4. Review and approve all design phases within {{approvalDays}} business days
5. Make timely payments per the payment schedule
6. Obtain necessary permits and approvals
7. Hire qualified contractors for implementation

## DESIGNER RESPONSIBILITIES

The Designer agrees to:
1. Perform services in a professional manner
2. Meet agreed-upon deadlines
3. Maintain professional liability insurance
4. Coordinate with contractors and vendors
5. Provide regular project updates
6. Maintain confidentiality of client information

## APPROVAL PROCESS

1. Designer submits deliverables for each phase
2. Client has {{approvalDays}} business days to review
3. Client provides written approval or requests revisions
4. Up to {{includedRevisions}} rounds of revisions included per phase
5. Additional revisions billed at ${{hourlyRate}}/hour
6. Invoice issued upon phase approval
7. Next phase begins upon payment receipt

## CHANGES TO SCOPE

Any changes to the agreed scope of work must be documented in a Change Order:
- Change orders must be approved in writing
- Additional fees will be calculated based on time and materials
- Timeline adjustments will be documented
- Change orders become part of this agreement

## INTELLECTUAL PROPERTY

- Designer retains copyright to all design documents
- Client receives license to use designs for this project only
- Designer may use project images for portfolio and marketing
- Client may request confidentiality for sensitive projects

## TERMINATION

Either party may terminate this agreement with {{terminationNoticeDays}} days written notice:

**By Client:**
- Client pays for all work completed to date
- Client pays for all expenses incurred
- Client receives all work product completed

**By Designer:**
- Designer provides all work completed to date
- Client pays for all work completed
- Designer released from further obligations

## LIMITATION OF LIABILITY

Designer's liability limited to the total fees paid under this agreement.
Designer not responsible for:
- Contractor errors or omissions
- Product defects or failures
- Code compliance (unless specifically contracted)
- Structural or mechanical issues

## DISPUTE RESOLUTION

1. Good faith negotiation between parties
2. Mediation if negotiation fails
3. Binding arbitration if mediation fails
4. Arbitration conducted in {{arbitrationLocation}}

## INSURANCE

Designer maintains:
- Professional Liability Insurance: ${{professionalLiabilityAmount}}
- General Liability Insurance: ${{generalLiabilityAmount}}

## GOVERNING LAW

This agreement governed by the laws of {{governingState}}.

## ENTIRE AGREEMENT

This agreement constitutes the entire agreement between parties and supersedes all prior agreements.

## SIGNATURES

**CLIENT:**

Signature: _________________________
Name: {{clientName}}
Title: {{clientTitle}}
Date: _____________

**DESIGNER:**

Signature: _________________________
Name: {{designerName}}
Title: {{designerTitle}}
Date: _____________

---

**Attachments:**
- Exhibit A: Project Scope Details
- Exhibit B: Fee Schedule
- Exhibit C: Project Timeline
```

### 2. Non-Disclosure Agreement (NDA)

```markdown
# MUTUAL NON-DISCLOSURE AGREEMENT

**Agreement Date:** {{agreementDate}}
**Agreement Number:** {{ndaNumber}}

## PARTIES

**Disclosing Party:**
{{firmName}}
{{firmAddress}}

**Receiving Party:**
{{clientName}}
{{clientAddress}}

## RECITALS

The parties wish to explore a business relationship regarding {{projectDescription}} and may disclose confidential information to each other.

## DEFINITIONS

**Confidential Information** includes:
- Business plans and strategies
- Financial information
- Design concepts and drawings
- Client lists and information
- Proprietary processes and methods
- Trade secrets
- Any information marked "Confidential"

## OBLIGATIONS

The Receiving Party agrees to:

1. **Maintain Confidentiality**
   - Keep all Confidential Information strictly confidential
   - Not disclose to third parties without written consent
   - Use same degree of care as for own confidential information

2. **Limited Use**
   - Use Confidential Information only for evaluation purposes
   - Not use for any competitive purpose
   - Not reverse engineer or attempt to derive source

3. **Limited Disclosure**
   - Disclose only to employees with need to know
   - Ensure employees are bound by similar obligations
   - Maintain list of persons with access

4. **Return of Materials**
   - Return or destroy all Confidential Information upon request
   - Provide written certification of destruction
   - Delete all electronic copies

## EXCEPTIONS

Confidential Information does not include information that:
- Is publicly available through no breach of this agreement
- Was known prior to disclosure
- Is independently developed
- Is rightfully received from a third party

## TERM

This agreement effective from {{effectiveDate}} and continues for {{termYears}} years.

## REMEDIES

Breach of this agreement may cause irreparable harm. Parties entitled to:
- Injunctive relief
- Specific performance
- Monetary damages
- Attorney fees and costs

## GOVERNING LAW

Governed by laws of {{governingState}}.

## SIGNATURES

**Disclosing Party:**

Signature: _________________________
Name: {{firmRepName}}
Title: {{firmRepTitle}}
Date: _____________

**Receiving Party:**

Signature: _________________________
Name: {{clientRepName}}
Title: {{clientRepTitle}}
Date: _____________
```

### 3. Change Order Template

```markdown
# CHANGE ORDER

**Change Order Number:** {{changeOrderNumber}}
**Date:** {{changeOrderDate}}
**Project:** {{projectName}}
**Original Contract:** {{contractNumber}}

## REQUESTED CHANGE

**Requested By:** {{requestedBy}}
**Date Requested:** {{requestDate}}

**Description of Change:**
{{changeDescription}}

**Reason for Change:**
{{changeReason}}

## IMPACT ANALYSIS

### Scope Impact:
{{scopeImpact}}

### Cost Impact:
- Original Contract Amount: ${{originalAmount}}
- This Change Order: ${{changeAmount}}
- New Contract Amount: ${{newTotalAmount}}

**Cost Breakdown:**
| Item | Quantity | Unit Price | Total |
|------|----------|------------|-------|
| {{item1}} | {{qty1}} | ${{price1}} | ${{total1}} |
| {{item2}} | {{qty2}} | ${{price2}} | ${{total2}} |
| **Subtotal** | | | ${{subtotal}} |
| **Tax ({{taxRate}}%)** | | | ${{taxAmount}} |
| **Total** | | | ${{changeAmount}} |

### Schedule Impact:
- Original Completion Date: {{originalEndDate}}
- Time Extension: {{timeExtension}} days
- New Completion Date: {{newEndDate}}

## APPROVAL

**Client Approval:**

☐ Approved - Proceed with change
☐ Rejected - Do not proceed
☐ Revise and resubmit

Signature: _________________________
Name: {{clientName}}
Date: _____________

**Designer Approval:**

Signature: _________________________
Name: {{designerName}}
Date: _____________

## PAYMENT TERMS

Payment for this change order due: {{paymentDue}}

## NOTES

{{additionalNotes}}
```

---

## Sample Project Workflow with Contracts

### Complete Project Example: "TechCorp Office Redesign"

#### Step 1: Initial Contract

```json
{
  "contractType": "Design Contract",
  "contractNumber": "CON-2025-001",
  "contractTitle": "Interior Design Services Agreement - TechCorp Office",
  "contractValue": 250000,
  "startDate": "2025-02-01",
  "endDate": "2025-08-01",
  "status": "Signed",
  "signedDate": "2025-01-25",
  "paymentSchedule": [
    {
      "milestone": "Upon Signing",
      "description": "Retainer",
      "amount": 25000,
      "dueDate": "2025-01-25",
      "status": "Paid"
    },
    {
      "milestone": "Phase 1 Complete",
      "description": "Discovery & Planning",
      "amount": 50000,
      "dueDate": "Upon approval",
      "status": "Paid"
    },
    {
      "milestone": "Phase 2 Complete",
      "description": "Concept Design",
      "amount": 60000,
      "dueDate": "Upon approval",
      "status": "Pending"
    }
  ]
}
```

#### Step 2: Project Milestones with Approvals

**Milestone 1: Discovery & Planning**
- Status: Completed
- Approval Status: Approved
- Invoice: INV-2025-001 ($50,000) - Paid
- Contract Reference: CON-2025-001

**Milestone 2: Concept Design**
- Status: Pending Approval
- Deliverables Ready: Yes
- Awaiting Client Approval
- Invoice: INV-2025-002 ($60,000) - Draft

#### Step 3: Change Order Example

```json
{
  "changeOrderNumber": "CO-2025-001",
  "project": "TechCorp Office Redesign",
  "originalContract": "CON-2025-001",
  "requestDate": "2025-03-15",
  "requestedBy": "Sarah Johnson (Client)",
  "description": "Add executive boardroom with custom millwork and AV integration",
  "reason": "Business need for high-end client presentation space",
  "scopeImpact": "Additional 500 sq ft space, custom millwork design, AV system coordination",
  "costImpact": 35000,
  "timeImpact": 14,
  "status": "Approved",
  "approvedBy": "Sarah Johnson",
  "approvalDate": "2025-03-18"
}
```

---

## Implementation Steps

### Phase 1: Set Up Strapi Content Types (Day 1)

1. Log into Strapi admin: http://localhost:1337/admin
2. Go to Content-Type Builder
3. Create all content types listed above
4. Set up relationships between types
5. Configure API permissions

### Phase 2: Add Sample Data (Day 2)

1. Create sample client
2. Create sample project
3. Add milestones
4. Upload contract documents
5. Create sample invoices
6. Schedule sample meetings

### Phase 3: Test Workflow (Day 3)

1. Navigate through project lifecycle
2. Test approval process
3. Generate invoices
4. Create change orders
5. Test email notifications

This creates a complete, production-ready project management system with full contract management!

---

## Construction Project Milestone Template

### Standard Construction Milestones with Sign-offs

This template follows industry-standard construction phases with client sign-off requirements.

#### Milestone Structure for Construction Projects

```json
{
  "projectType": "Construction",
  "milestones": [
    {
      "milestoneNumber": 1,
      "milestoneName": "Site Ready",
      "keyOutput": "Survey & Soil Report",
      "clientSignOffRequired": true,
      "deliverables": [
        {
          "name": "Topographic Survey",
          "description": "Complete site survey with elevations and boundaries",
          "status": "Completed"
        },
        {
          "name": "Geotechnical Report",
          "description": "Soil investigation and bearing capacity analysis",
          "status": "Completed"
        },
        {
          "name": "Site Clearance Certificate",
          "description": "Confirmation of site preparation completion",
          "status": "Completed"
        }
      ],
      "approvalStatus": "Approved",
      "signOffDate": "2025-02-15",
      "signedBy": "Client Name"
    },
    {
      "milestoneNumber": 2,
      "milestoneName": "Design Freeze",
      "keyOutput": "Full CAD Set (Arch/Elec/AC)",
      "clientSignOffRequired": true,
      "deliverables": [
        {
          "name": "Architectural Drawings",
          "description": "Complete architectural CAD set - all floors, elevations, sections",
          "status": "Completed"
        },
        {
          "name": "Electrical Drawings",
          "description": "Complete electrical layout, single line diagrams, panel schedules",
          "status": "Completed"
        },
        {
          "name": "HVAC Drawings",
          "description": "Complete AC/ventilation layout and duct routing",
          "status": "Completed"
        },
        {
          "name": "Plumbing Drawings",
          "description": "Water supply and drainage layout",
          "status": "Completed"
        },
        {
          "name": "Structural Drawings",
          "description": "Foundation, column, beam, and slab details",
          "status": "Completed"
        }
      ],
      "approvalStatus": "Approved",
      "signOffDate": "2025-03-20",
      "signedBy": "Client Name",
      "notes": "All design changes must be documented as change orders after this point"
    },
    {
      "milestoneNumber": 3,
      "milestoneName": "Mechanical/Electrical",
      "keyOutput": "Concealed conduits & ducts inspected",
      "clientSignOffRequired": true,
      "deliverables": [
        {
          "name": "Electrical Conduit Installation",
          "description": "All concealed electrical conduits installed and inspected",
          "status": "Completed"
        },
        {
          "name": "HVAC Duct Installation",
          "description": "All concealed AC ducts installed and inspected",
          "status": "Completed"
        },
        {
          "name": "Plumbing Rough-in",
          "description": "All concealed plumbing pipes installed",
          "status": "Completed"
        },
        {
          "name": "Inspection Report",
          "description": "Third-party inspection of all concealed work",
          "status": "Completed"
        },
        {
          "name": "As-Built Drawings",
          "description": "Updated drawings showing actual installation",
          "status": "Completed"
        }
      ],
      "approvalStatus": "Approved",
      "signOffDate": "2025-05-10",
      "signedBy": "Client Name",
      "notes": "Critical milestone - no access to concealed work after this point"
    },
    {
      "milestoneNumber": 4,
      "milestoneName": "The Skin",
      "keyOutput": "Flooring & Ceiling complete",
      "clientSignOffRequired": true,
      "deliverables": [
        {
          "name": "Flooring Installation",
          "description": "All flooring materials installed - tiles, wood, carpet, etc.",
          "status": "Completed"
        },
        {
          "name": "Ceiling Installation",
          "description": "All ceiling work complete - false ceiling, lighting fixtures",
          "status": "Completed"
        },
        {
          "name": "Wall Finishes",
          "description": "Paint, wallpaper, wall panels complete",
          "status": "Completed"
        },
        {
          "name": "Door & Window Installation",
          "description": "All doors and windows installed with hardware",
          "status": "Completed"
        },
        {
          "name": "Fixture Installation",
          "description": "Light fixtures, switches, outlets installed",
          "status": "Completed"
        }
      ],
      "approvalStatus": "Approved",
      "signOffDate": "2025-06-25",
      "signedBy": "Client Name"
    },
    {
      "milestoneNumber": 5,
      "milestoneName": "Handover",
      "keyOutput": "Ready for Move-in",
      "clientSignOffRequired": true,
      "deliverables": [
        {
          "name": "Final Cleaning",
          "description": "Complete site cleaning and debris removal",
          "status": "Completed"
        },
        {
          "name": "Punch List Completion",
          "description": "All punch list items addressed and closed",
          "status": "Completed"
        },
        {
          "name": "Systems Testing",
          "description": "All electrical, HVAC, plumbing systems tested and operational",
          "status": "Completed"
        },
        {
          "name": "Occupancy Certificate",
          "description": "Official occupancy certificate obtained",
          "status": "Completed"
        },
        {
          "name": "As-Built Documentation",
          "description": "Complete as-built drawings and O&M manuals",
          "status": "Completed"
        },
        {
          "name": "Warranty Documents",
          "description": "All warranty certificates and maintenance schedules",
          "status": "Completed"
        },
        {
          "name": "Key Handover",
          "description": "Physical handover of keys and access cards",
          "status": "Completed"
        }
      ],
      "approvalStatus": "Approved",
      "signOffDate": "2025-07-30",
      "signedBy": "Client Name",
      "notes": "Project officially complete and ready for occupancy"
    }
  ]
}
```

### Milestone Sign-off Checklist

#### For Each Milestone:

**Before Requesting Sign-off:**
- [ ] All deliverables completed
- [ ] Quality checks performed
- [ ] Documentation prepared
- [ ] Photos/evidence collected
- [ ] Third-party inspections done (if required)

**Sign-off Process:**
1. Submit deliverables to client
2. Schedule inspection/review meeting
3. Address any concerns or punch list items
4. Obtain written approval
5. Document sign-off date and signatory
6. Issue invoice for milestone
7. Proceed to next phase

**Sign-off Document Template:**

```markdown
# MILESTONE SIGN-OFF CERTIFICATE

**Project:** {{projectName}}
**Project Code:** {{projectCode}}
**Milestone:** {{milestoneName}}
**Milestone Number:** {{milestoneNumber}}

## Key Output Delivered:
{{keyOutput}}

## Deliverables Completed:
{{#each deliverables}}
- [✓] {{name}}: {{description}}
{{/each}}

## Inspection Details:
**Inspection Date:** {{inspectionDate}}
**Inspected By:** {{inspectorName}}
**Inspection Result:** {{inspectionResult}}

## Client Approval:

I hereby confirm that the above milestone has been completed to my satisfaction and approve the work for the next phase to proceed.

**Client Signature:** _________________________
**Name:** {{clientName}}
**Title:** {{clientTitle}}
**Date:** {{signOffDate}}

**Contractor Signature:** _________________________
**Name:** {{contractorName}}
**Title:** {{contractorTitle}}
**Date:** {{signOffDate}}

## Notes:
{{additionalNotes}}

---
**Next Milestone:** {{nextMilestoneName}}
**Estimated Start Date:** {{nextMilestoneStart}}
```

### Construction Project Dashboard View

```typescript
// Component to display construction milestones with sign-off status
interface ConstructionMilestone {
  number: number;
  name: string;
  keyOutput: string;
  signOffRequired: boolean;
  signOffStatus: 'Pending' | 'Approved' | 'Rejected';
  signOffDate?: string;
}

const constructionMilestones: ConstructionMilestone[] = [
  {
    number: 1,
    name: 'Site Ready',
    keyOutput: 'Survey & Soil Report',
    signOffRequired: true,
    signOffStatus: 'Approved',
    signOffDate: '2025-02-15'
  },
  {
    number: 2,
    name: 'Design Freeze',
    keyOutput: 'Full CAD Set (Arch/Elec/AC)',
    signOffRequired: true,
    signOffStatus: 'Approved',
    signOffDate: '2025-03-20'
  },
  {
    number: 3,
    name: 'Mechanical/Electrical',
    keyOutput: 'Concealed conduits & ducts inspected',
    signOffRequired: true,
    signOffStatus: 'Approved',
    signOffDate: '2025-05-10'
  },
  {
    number: 4,
    name: 'The Skin',
    keyOutput: 'Flooring & Ceiling complete',
    signOffRequired: true,
    signOffStatus: 'Approved',
    signOffDate: '2025-06-25'
  },
  {
    number: 5,
    name: 'Handover',
    keyOutput: 'Ready for Move-in',
    signOffRequired: true,
    signOffStatus: 'Pending',
    signOffDate: undefined
  }
];

export default function ConstructionMilestoneTracker() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Construction Milestones</h2>
      
      <div className="space-y-4">
        {constructionMilestones.map((milestone) => (
          <div
            key={milestone.number}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  milestone.signOffStatus === 'Approved' ? 'bg-green-500' :
                  milestone.signOffStatus === 'Rejected' ? 'bg-red-500' :
                  'bg-gray-400'
                }`}>
                  {milestone.number}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">{milestone.name}</h3>
                  <p className="text-sm text-gray-600">{milestone.keyOutput}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {milestone.signOffStatus === 'Approved' && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Signed Off</span>
                  </div>
                )}
                
                {milestone.signOffStatus === 'Pending' && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Request Sign-off
                  </button>
                )}
                
                {milestone.signOffDate && (
                  <span className="text-sm text-gray-500">
                    {new Date(milestone.signOffDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Quick Implementation Guide

### Step 1: Create Construction Project in Strapi

1. Go to Content Manager → Interior Projects
2. Create new entry with:
   - Project Type: "Construction"
   - Use construction milestone template
   - Set up 5 standard milestones

### Step 2: Configure Milestone Sign-offs

For each milestone:
1. Set `clientSignOffRequired: true`
2. Add key output description
3. List all deliverables
4. Set up approval workflow

### Step 3: Track Progress

- Update milestone status as work progresses
- Request client sign-off when ready
- Document approval with date and signature
- Generate invoice upon approval
- Move to next milestone

This construction-specific workflow ensures proper documentation and client approval at each critical phase!
