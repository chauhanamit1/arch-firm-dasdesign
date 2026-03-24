'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import PDFViewer from '@/components/PDFViewer';
import FileUpload from '@/components/FileUpload';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`http://localhost:1337/api/projects/${params.id}`);
        const data = await response.json();
        setProject(data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Sample milestones data (will be from API later)
  const milestones = [
    {
      id: 1,
      phase: 1,
      name: 'Site Ready',
      keyOutput: 'Survey & Soil Report',
      status: 'Completed',
      completionDate: '2026-01-28',
      signOffDate: '2026-01-29',
      signOffBy: 'John Smith, TechCorp',
      deliverables: [
        { name: 'Topographic Survey', status: 'Completed', file: 'topographic-survey.pdf' },
        { name: 'Geotechnical Report', status: 'Completed', file: 'geotechnical-report.pdf' },
        { name: 'Site Clearance Certificate', status: 'Completed', file: 'site-clearance.pdf' },
        { name: 'Utility Connection Approvals', status: 'Completed', file: 'utility-approvals.pdf' },
      ],
      notes: 'All site preparations completed ahead of schedule. Soil conditions are favorable for construction.',
      approval: {
        status: 'Approved',
        date: '2026-01-29',
        by: 'John Smith',
        comments: 'Site is ready for construction. All reports are satisfactory.',
      },
    },
    {
      id: 2,
      phase: 2,
      name: 'Design Freeze',
      keyOutput: 'Full CAD Set (Arch/Elec/AC)',
      status: 'Completed',
      completionDate: '2026-02-25',
      signOffDate: '2026-02-26',
      signOffBy: 'John Smith, TechCorp',
      deliverables: [
        { name: 'Architectural Drawings', status: 'Completed', file: 'arch-drawings.dwg' },
        { name: 'Electrical Drawings', status: 'Completed', file: 'elec-drawings.dwg' },
        { name: 'HVAC Drawings', status: 'Completed', file: 'hvac-drawings.dwg' },
        { name: 'Plumbing Drawings', status: 'Completed', file: 'plumbing-drawings.dwg' },
        { name: 'Structural Drawings', status: 'Completed', file: 'structural-drawings.dwg' },
        { name: 'Interior Design Specifications', status: 'Completed', file: 'interior-specs.pdf' },
      ],
      notes: 'Design approved. All changes after this require change orders. Client requested minor modifications to conference room layout.',
      approval: {
        status: 'Approved',
        date: '2026-02-26',
        by: 'John Smith',
        comments: 'Design looks excellent. Approved with minor modifications to conference room.',
      },
    },
    {
      id: 3,
      phase: 3,
      name: 'Mechanical/Electrical',
      keyOutput: 'Concealed conduits & ducts inspected',
      status: 'In Progress',
      completionDate: null,
      signOffDate: null,
      signOffBy: null,
      deliverables: [
        { name: 'Electrical Conduit Installation', status: 'In Progress', file: null },
        { name: 'HVAC Duct Installation', status: 'In Progress', file: null },
        { name: 'Plumbing Rough-in', status: 'Completed', file: 'plumbing-roughin.pdf' },
        { name: 'Fire Safety Systems', status: 'Pending', file: null },
        { name: 'Inspection Report', status: 'Pending', file: null },
        { name: 'As-Built Drawings (MEP)', status: 'Pending', file: null },
      ],
      notes: 'Critical phase - no access to concealed work after sign-off. Electrical work is 70% complete. HVAC installation ongoing.',
      approval: {
        status: 'Pending',
        date: null,
        by: null,
        comments: null,
      },
    },
    {
      id: 4,
      phase: 4,
      name: 'The Skin',
      keyOutput: 'Flooring & Ceiling complete',
      status: 'Pending',
      completionDate: null,
      signOffDate: null,
      signOffBy: null,
      deliverables: [
        { name: 'Flooring Installation', status: 'Pending', file: null },
        { name: 'Ceiling Installation', status: 'Pending', file: null },
        { name: 'Wall Finishes', status: 'Pending', file: null },
        { name: 'Door & Window Installation', status: 'Pending', file: null },
        { name: 'Fixture Installation', status: 'Pending', file: null },
        { name: 'Painting & Finishing', status: 'Pending', file: null },
      ],
      notes: 'Awaiting completion of MEP phase before starting.',
      approval: {
        status: 'Pending',
        date: null,
        by: null,
        comments: null,
      },
    },
    {
      id: 5,
      phase: 5,
      name: 'Handover',
      keyOutput: 'Ready for Move-in',
      status: 'Pending',
      completionDate: null,
      signOffDate: null,
      signOffBy: null,
      deliverables: [
        { name: 'Final Cleaning', status: 'Pending', file: null },
        { name: 'Punch List Completion', status: 'Pending', file: null },
        { name: 'Systems Testing & Commissioning', status: 'Pending', file: null },
        { name: 'Occupancy Certificate', status: 'Pending', file: null },
        { name: 'As-Built Documentation', status: 'Pending', file: null },
        { name: 'Warranty Documents', status: 'Pending', file: null },
        { name: 'Operation & Maintenance Manuals', status: 'Pending', file: null },
        { name: 'Key Handover', status: 'Pending', file: null },
      ],
      notes: 'Final phase - complete project handover.',
      approval: {
        status: 'Pending',
        date: null,
        by: null,
        comments: null,
      },
    },
  ];

  // Sample contracts
  const contracts = [
    {
      id: 1,
      name: 'Interior Design Services Agreement',
      type: 'Service Agreement',
      date: '2026-01-10',
      status: 'Signed',
      file: 'service-agreement.pdf',
      parties: ['TechCorp Solutions Inc.', 'Architectural Firm'],
    },
    {
      id: 2,
      name: 'Non-Disclosure Agreement',
      type: 'NDA',
      date: '2026-01-10',
      status: 'Signed',
      file: 'nda.pdf',
      parties: ['TechCorp Solutions Inc.', 'Architectural Firm'],
    },
    {
      id: 3,
      name: 'Change Order #001',
      type: 'Change Order',
      date: '2026-02-28',
      status: 'Approved',
      file: 'change-order-001.pdf',
      parties: ['TechCorp Solutions Inc.', 'Architectural Firm'],
      description: 'Modification to conference room layout',
    },
  ];

  // Sample meetings
  const meetings = [
    {
      id: 1,
      title: 'Project Kickoff Meeting',
      date: '2026-01-12',
      attendees: ['John Smith (TechCorp)', 'Sarah Johnson (Architect)', 'Mike Chen (Project Manager)'],
      agenda: ['Project overview', 'Timeline discussion', 'Budget review', 'Design preferences'],
      notes: 'Client emphasized need for open collaborative spaces. Budget approved at $250K. Timeline set for 6 months.',
      actionItems: [
        { task: 'Complete site survey', assignee: 'Mike Chen', dueDate: '2026-01-20', status: 'Completed' },
        { task: 'Prepare initial design concepts', assignee: 'Sarah Johnson', dueDate: '2026-01-25', status: 'Completed' },
      ],
    },
    {
      id: 2,
      title: 'Design Review Meeting',
      date: '2026-02-15',
      attendees: ['John Smith (TechCorp)', 'Sarah Johnson (Architect)', 'Mike Chen (Project Manager)', 'Lisa Wong (Interior Designer)'],
      agenda: ['Present design concepts', 'Material selection', 'Color schemes', 'Furniture layout'],
      notes: 'Client approved Design Option B with modifications to conference room. Selected modern minimalist aesthetic with warm wood accents.',
      actionItems: [
        { task: 'Revise conference room layout', assignee: 'Sarah Johnson', dueDate: '2026-02-20', status: 'Completed' },
        { task: 'Finalize material specifications', assignee: 'Lisa Wong', dueDate: '2026-02-22', status: 'Completed' },
      ],
    },
    {
      id: 3,
      title: 'MEP Progress Review',
      date: '2026-03-15',
      attendees: ['John Smith (TechCorp)', 'Mike Chen (Project Manager)', 'Tom Rodriguez (MEP Contractor)'],
      agenda: ['Review MEP installation progress', 'Discuss timeline', 'Address any issues'],
      notes: 'MEP work is 70% complete. Electrical conduits installation ahead of schedule. HVAC duct work in progress. Minor delay due to material delivery.',
      actionItems: [
        { task: 'Expedite HVAC material delivery', assignee: 'Tom Rodriguez', dueDate: '2026-03-20', status: 'In Progress' },
        { task: 'Schedule inspection for completed electrical work', assignee: 'Mike Chen', dueDate: '2026-03-25', status: 'Pending' },
      ],
    },
  ];

  // Sample invoices
  const invoices = [
    {
      id: 1,
      number: 'INV-2026-001',
      milestone: 'Site Ready',
      amount: 50000,
      tax: 5000,
      total: 55000,
      status: 'Paid',
      issueDate: '2026-01-29',
      dueDate: '2026-02-12',
      paidDate: '2026-02-08',
    },
    {
      id: 2,
      number: 'INV-2026-002',
      milestone: 'Design Freeze',
      amount: 75000,
      tax: 7500,
      total: 82500,
      status: 'Paid',
      issueDate: '2026-02-26',
      dueDate: '2026-03-12',
      paidDate: '2026-03-10',
    },
    {
      id: 3,
      number: 'INV-2026-003',
      milestone: 'Mechanical/Electrical',
      amount: 60000,
      tax: 6000,
      total: 66000,
      status: 'Pending',
      issueDate: '2026-03-20',
      dueDate: '2026-04-20',
      paidDate: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
      case 'paid':
      case 'signed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl opacity-90">{project.category} Project</p>
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Client</div>
              <div className="text-xl font-bold text-gray-800">{project.client}</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Budget</div>
              <div className="text-xl font-bold text-blue-600">${(project.budget / 1000).toFixed(0)}K</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Area</div>
              <div className="text-xl font-bold text-gray-800">{project.area.toLocaleString()} sq ft</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Project Description</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="mt-4 flex gap-4 text-sm text-gray-600">
            <div>📍 {project.location}</div>
            <div>📅 {new Date(project.startDate).toLocaleDateString()} - {new Date(project.completionDate).toLocaleDateString()}</div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Construction Milestones</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`p-6 ${milestone.status === 'Completed' ? 'bg-green-50' : milestone.status === 'In Progress' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-400">Phase {milestone.phase}</span>
                        <h3 className="text-2xl font-bold text-gray-800">{milestone.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                      <p className="text-lg text-blue-600 font-semibold mb-2">Key Output: {milestone.keyOutput}</p>
                      <p className="text-gray-600 mb-4">{milestone.notes}</p>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Deliverables:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {milestone.deliverables.map((deliverable, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${deliverable.status === 'Completed' ? 'bg-green-500' : deliverable.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                            <span className="text-gray-700">{deliverable.name}</span>
                          </div>
                          {deliverable.file && (
                            <button className="text-blue-600 hover:underline text-sm">
                              📄 View
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Approval */}
                  {milestone.approval.status !== 'Pending' && (
                    <div className="mt-4 bg-white p-4 rounded border-l-4 border-green-500">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-gray-800 mb-1">✅ Client Sign-off</div>
                          <div className="text-sm text-gray-600">
                            Approved by {milestone.approval.by} on {new Date(milestone.approval.date!).toLocaleDateString()}
                          </div>
                          {milestone.approval.comments && (
                            <div className="mt-2 text-sm text-gray-700 italic">
                              "{milestone.approval.comments}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {milestone.status === 'In Progress' && (
                    <div className="mt-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Request Client Sign-off
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contracts */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Contractual Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">📄</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{contract.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{contract.type}</p>
                <p className="text-sm text-gray-500 mb-3">Date: {new Date(contract.date).toLocaleDateString()}</p>
                {contract.description && (
                  <p className="text-sm text-gray-600 mb-3">{contract.description}</p>
                )}
                {contract.file ? (
                  <PDFViewer url={`/documents/${contract.file}`} title={contract.name} />
                ) : (
                  <button className="text-blue-600 hover:underline text-sm font-semibold">
                    View Document →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* File Upload Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload Project Documents</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 mb-4">
              Upload contracts, drawings, reports, or other project-related documents. Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </p>
            <FileUpload
              projectId={params.id as string}
              onUploadSuccess={(file) => {
                console.log('File uploaded successfully:', file);
                // You can add logic here to refresh the contracts list or show a success message
              }}
            />
          </div>
        </div>
      </section>

      {/* Meetings */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meeting Notes</h2>
          <div className="space-y-6">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{meeting.title}</h3>
                    <p className="text-sm text-gray-600">📅 {new Date(meeting.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Attendees:</h4>
                  <div className="flex flex-wrap gap-2">
                    {meeting.attendees.map((attendee, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {attendee}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Agenda:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {meeting.agenda.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Notes:</h4>
                  <p className="text-gray-600">{meeting.notes}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Action Items:</h4>
                  <div className="space-y-2">
                    {meeting.actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-green-500' : item.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
                          <span className="text-gray-700">{item.task}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.assignee} • Due: {new Date(item.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invoices */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Invoices & Payments</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Invoice #</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Milestone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{invoice.number}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{invoice.milestone}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">${invoice.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:underline text-sm">View Invoice</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-blue-50 p-6 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Project Value</div>
                <div className="text-3xl font-bold text-gray-800">${project.budget.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Invoiced</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Paid</div>
                <div className="text-2xl font-bold text-green-600">
                  ${invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Outstanding</div>
                <div className="text-2xl font-bold text-yellow-600">
                  ${invoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}

// Made with Bob
