import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProjectRequestForm from '@/components/ProjectRequestForm'


export const dynamic = 'force-dynamic'
export const dynamicParams = true

// Use backend service name for server-side rendering, localhost for client-side
const getApiUrl = () => {
  // Server-side: use Docker service name
  if (typeof window === 'undefined') {
    return process.env.API_URL || 'http://backend:1337'
  }
  // Client-side: use public URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
}

interface Feature {
  title: string
  description: string
  icon?: string
}

interface ProcessStep {
  step: string
  description: string
  duration?: string
}

interface Benefit {
  title: string
  description: string
}

interface Deliverable {
  name: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

interface FAQ {
  question: string
  answer: string
}

interface Milestone {
  id: string
  name: string
  description: string
}

async function getService(id: string) {
  try {
    const apiUrl = getApiUrl()
    console.log(`Fetching service from: ${apiUrl}/api/services/${id}`)
    const res = await fetch(`${apiUrl}/api/services/${id}?populate=*`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      console.error(`Service fetch failed: ${res.status} ${res.statusText}`)
      return null
    }
    
    const data = await res.json()
    console.log('Service data received:', data.data?.title)
    return data.data
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

async function getRelatedProjects(serviceTitle: string) {
  try {
    const apiUrl = getApiUrl()
    const res = await fetch(`${apiUrl}/api/projects?populate=*`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.data.slice(0, 3)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Sample milestones for the service
const sampleMilestones: Milestone[] = [
  { id: 'initial-consultation', name: 'Initial Consultation', description: 'Meet with our team to discuss your vision and requirements' },
  { id: 'site-analysis', name: 'Site Analysis', description: 'Comprehensive evaluation of the project site' },
  { id: 'concept-design', name: 'Concept Design', description: 'Initial design concepts and sketches' },
  { id: 'design-development', name: 'Design Development', description: 'Detailed design drawings and specifications' },
  { id: 'permit-approval', name: 'Permit & Approval', description: 'Obtain necessary permits and approvals' },
  { id: 'construction-docs', name: 'Construction Documents', description: 'Complete construction documentation' },
  { id: 'construction-admin', name: 'Construction Administration', description: 'Oversight during construction phase' },
  { id: 'final-walkthrough', name: 'Final Walkthrough', description: 'Project completion and handover' },
]

export default async function ServiceDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  const { id } = await params
  const service = await getService(id)
  
  if (!service) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(service.title)

  // Parse JSON fields with fallbacks
  const features: Feature[] = service.features || []
  const process: ProcessStep[] = service.process || []
  const benefits: Benefit[] = service.benefits || []
  const deliverables: Deliverable[] = service.deliverables || []
  const testimonials: Testimonial[] = service.testimonials || []
  const faqs: FAQ[] = service.faqs || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link 
            href="/" 
            className="text-blue-200 hover:text-white mb-6 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            {service.icon && (
              <span className="text-5xl mr-4">{service.icon}</span>
            )}
            <h1 className="text-5xl font-bold">{service.title}</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mt-4">
            {service.description}
          </p>
          {service.timeline && (
            <div className="mt-6 inline-flex items-center bg-blue-800 bg-opacity-50 px-4 py-2 rounded-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Typical Timeline: {service.timeline}</span>
            </div>
          )}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Section */}
        {benefits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose This Service</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={`feature-${index}`} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      {feature.icon || (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process Section */}
        {process.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Process</h2>
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={`step-${index}`} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.step}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {step.duration && (
                      <span className="inline-block mt-2 text-sm text-blue-600 font-medium">
                        ⏱ {step.duration}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deliverables Section */}
        {deliverables.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What You'll Receive</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {deliverables.map((deliverable, index) => (
                <div key={`deliverable-${index}`} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-900">{deliverable.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{deliverable.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Section */}
        {service.pricing && (
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment</h2>
            <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.pricing }} />
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Client Testimonials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={`testimonial-${index}`} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={`star-${i}`}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={`faq-${index}`} className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-3 px-4 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.documentId}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{project.category}</span>
                        <span className="text-blue-600 group-hover:underline">
                          View Project →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Project Request Form */}
        <section id="start-project">
          <ProjectRequestForm 
            serviceId={service.id} 
            serviceName={service.title}
            milestones={sampleMilestones}
          />
        </section>
      </main>
    </div>
  )
}

// Made with Bob
