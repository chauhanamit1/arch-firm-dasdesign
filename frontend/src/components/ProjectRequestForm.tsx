'use client'

import { useState } from 'react'

interface Milestone {
  id: string
  name: string
  description: string
}

interface ProjectRequestFormProps {
  serviceId: number
  serviceName: string
  milestones?: Milestone[]
}

export default function ProjectRequestForm({ serviceId, serviceName, milestones = [] }: Readonly<ProjectRequestFormProps>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'residential' as 'residential' | 'commercial',
    projectDescription: '',
    budget: '',
    timeline: '',
    selectedMilestones: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMilestoneToggle = (milestoneId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMilestones: prev.selectedMilestones.includes(milestoneId)
        ? prev.selectedMilestones.filter(id => id !== milestoneId)
        : [...prev.selectedMilestones, milestoneId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
      const response = await fetch(`${API_URL}/api/project-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            ...formData,
            serviceId,
            serviceName,
            status: 'new',
          }
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: 'residential',
          projectDescription: '',
          budget: '',
          timeline: '',
          selectedMilestones: [],
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your Project</h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below and we'll get back to you within 24 hours to discuss your {serviceName.toLowerCase()} needs.
      </p>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          <p className="font-semibold">Thank you for your inquiry!</p>
          <p>We'll contact you shortly to discuss your project.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-semibold">Something went wrong.</p>
          <p>Please try again or contact us directly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
            Project Type *
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            required
            rows={4}
            value={formData.projectDescription}
            onChange={handleInputChange}
            placeholder="Tell us about your project, goals, and any specific requirements..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Budget and Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select budget range</option>
              <option value="under-50k">Under $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k-250k">$100,000 - $250,000</option>
              <option value="250k-500k">$250,000 - $500,000</option>
              <option value="over-500k">Over $500,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
              Desired Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select timeline</option>
              <option value="asap">As soon as possible</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Milestone Selection */}
        {milestones.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Project Milestones (Optional)
            </label>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-start">
                  <input
                    type="checkbox"
                    id={`milestone-${milestone.id}`}
                    checked={formData.selectedMilestones.includes(milestone.id)}
                    onChange={() => handleMilestoneToggle(milestone.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`milestone-${milestone.id}`} className="ml-3 cursor-pointer">
                    <span className="block text-sm font-medium text-gray-900">{milestone.name}</span>
                    <span className="block text-sm text-gray-500">{milestone.description}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Project Request'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Made with Bob
