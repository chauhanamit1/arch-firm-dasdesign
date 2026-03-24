import { getProjects, getProject, getServices, getService } from '@/lib/api'

describe('API Client', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getProjects', () => {
    it('should fetch all projects successfully', async () => {
      const mockProjects = {
        data: [
          {
            id: 1,
            documentId: 'abc123',
            title: 'Test Project',
            description: 'Test Description',
            category: 'residential',
            budget: 100000,
            area: 2000,
            location: 'Test City',
            status: 'completed',
            completionDate: '2024-01-01',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
            publishedAt: '2024-01-01',
          },
        ],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects,
      })

      const result = await getProjects()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/projects?populate=*',
        expect.any(Object)
      )
      expect(result).toEqual(mockProjects.data)
    })

    it('should handle fetch errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      await expect(getProjects()).rejects.toThrow('Network error')
    })

    it('should handle non-ok responses', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(getProjects()).rejects.toThrow('Failed to fetch projects')
    })
  })

  describe('getProject', () => {
    it('should fetch a single project by ID', async () => {
      const mockProject = {
        data: {
          id: 1,
          documentId: 'abc123',
          title: 'Test Project',
          description: 'Test Description',
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProject,
      })

      const result = await getProject('abc123')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/projects/abc123?populate=*',
        expect.any(Object)
      )
      expect(result).toEqual(mockProject.data)
    })
  })

  describe('getServices', () => {
    it('should fetch all services successfully', async () => {
      const mockServices = {
        data: [
          {
            id: 1,
            documentId: 'service123',
            title: 'Interior Design',
            description: 'Professional interior design services',
            icon: 'home',
          },
        ],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockServices,
      })

      const result = await getServices()

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/services?populate=*',
        expect.any(Object)
      )
      expect(result).toEqual(mockServices.data)
    })
  })

  describe('getService', () => {
    it('should fetch a single service by ID', async () => {
      const mockService = {
        data: {
          id: 1,
          documentId: 'service123',
          title: 'Interior Design',
          description: 'Professional interior design services',
        },
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockService,
      })

      const result = await getService('service123')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:1337/api/services/service123?populate=*',
        expect.any(Object)
      )
      expect(result).toEqual(mockService.data)
    })
  })
})

// Made with Bob
