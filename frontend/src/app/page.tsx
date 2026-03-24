'use client';

import { useEffect, useState } from 'react';
import { getProjects, getServices } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, servicesData] = await Promise.all([
          getProjects(),
          getServices(),
        ]);
        console.log('Projects data:', projectsData);
        console.log('Services data:', servicesData);
        setProjects(projectsData.data || []);
        setServices(servicesData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            DAS Design Studio
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transforming Spaces into Timeless Experiences
          </p>
          <div className="space-x-4">
            <Link href="/#services" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </Link>
            <Link href="/portfolio" className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Services
          </h2>
          {services.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg mb-4">No services added yet.</p>
              <p className="text-sm">Add services in Strapi admin panel at http://localhost:1337/admin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.documentId}`}
                  className="block bg-gray-50 rounded-lg p-8 hover:shadow-xl transition-all hover:scale-105 border border-gray-200 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{service.icon || '🏢'}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
                    {service.title || 'Service'}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4">
                    {service.category || 'General'}
                  </p>
                  <div className="text-gray-600 mb-4">
                    {service.description?.substring(0, 150) || 'No description available'}
                    {service.description?.length > 150 ? '...' : ''}
                  </div>
                  <div className="text-blue-600 font-medium hover:underline">
                    Learn More →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Projects
          </h2>
          {projects.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-lg mb-4">No projects added yet.</p>
              <p className="text-sm">Add projects in Strapi admin panel at http://localhost:1337/admin</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.documentId}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {project.title || 'Untitled Project'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">{project.category || 'General'}</span>
                      {project.location && ` • ${project.location}`}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {project.description?.substring(0, 120)}
                      {project.description?.length > 120 ? '...' : ''}
                    </p>
                    <div className="flex justify-between items-center text-sm border-t pt-4">
                      <span className="text-gray-500 font-medium">
                        {project.status || 'Status Unknown'}
                      </span>
                      {project.budget && (
                        <span className="text-blue-600 font-bold text-lg">
                          ${(project.budget / 1000).toFixed(0)}K
                        </span>
                      )}
                    </div>
                    {project.area && (
                      <p className="text-sm text-gray-500 mt-2">
                        📐 Area: {project.area.toLocaleString()} sq ft
                      </p>
                    )}
                    {project.client && (
                      <p className="text-sm text-gray-600 mt-1">
                        👤 Client: {project.client}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600 text-lg">Projects Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600 text-lg">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 text-lg">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600 text-lg">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's bring your architectural vision to life. Contact us today for a consultation.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Architectural Firm. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Backend: <a href="http://localhost:1337/admin" className="text-blue-400 hover:underline">Strapi Admin</a> | 
            Frontend: <a href="http://localhost:3000" className="text-blue-400 hover:underline">Next.js</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
