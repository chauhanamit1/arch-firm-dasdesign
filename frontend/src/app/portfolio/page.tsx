'use client';

import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Healthcare', 'Education', 'Public Space', 'Retail'];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl text-white">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
            Transforming spaces into timeless experiences through innovative design and meticulous craftsmanship
          </p>
          <div className="mt-12">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8 animate-bounce mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="projects" className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No projects found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project: any, index: number) => {
                // Map categories to Unsplash image keywords
                const imageKeywords: Record<string, string> = {
                  'Residential': 'modern-luxury-apartment-interior',
                  'Commercial': 'modern-office-building-architecture',
                  'Healthcare': 'modern-hospital-architecture',
                  'Education': 'modern-school-campus-architecture',
                  'Public Space': 'urban-plaza-architecture',
                  'Retail': 'luxury-shopping-mall-interior'
                };
                
                const keyword = imageKeywords[project.category] || 'modern-architecture';
                const imageUrl = `https://source.unsplash.com/800x600/?${keyword},${index}`;
                
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.documentId}`}
                    className="group relative overflow-hidden bg-gray-900 rounded-lg aspect-[4/3] cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Project Image */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-gray-200 transition-colors">
                        {project.title}
                      </h3>
                      {project.location && (
                        <p className="text-gray-400 mb-4">📍 {project.location}</p>
                      )}
                      <p className="text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.description}
                      </p>
                      <div className="mt-4 flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="mr-2">View Project</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.size && <span>📐 {project.size}</span>}
                    {project.year && <span>📅 {project.year}</span>}
                    {project.status && <span>✓ {project.status}</span>}
                  </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to bring your vision to life? Our team is here to transform your ideas into reality.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto text-center text-gray-500">
          <p>© 2024 DAS Design Studio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

// Made with Bob
