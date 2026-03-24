import Link from 'next/link'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

async function getService(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/services/${id}?populate=*`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return null
    }
    
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

async function getRelatedProjects(serviceTitle: string) {
  try {
    const res = await fetch(`${API_URL}/api/projects?populate=*`, {
      cache: 'no-store',
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    // Filter projects that might be related to this service
    return data.data.slice(0, 3) // Show up to 3 related projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const service = await getService(params.id)
  
  if (!service) {
    notFound()
  }

  const relatedProjects = await getRelatedProjects(service.title)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">{service.title}</h1>
          {service.icon && (
            <p className="text-2xl mt-2">{service.icon}</p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Description */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {service.description}
          </p>
        </section>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process Steps */}
        {service.process && service.process.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((step: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Information */}
        {service.pricing && (
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-xl font-semibold text-gray-900">{service.pricing}</p>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.documentId}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
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
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="mt-12 bg-blue-600 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in This Service?
          </h2>
          <p className="text-blue-100 text-lg mb-6">
            Contact us today to discuss your project requirements
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get in Touch
          </button>
        </section>
      </main>
    </div>
  )
}

// Made with Bob
