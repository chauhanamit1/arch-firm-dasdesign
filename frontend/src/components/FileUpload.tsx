'use client'

import { useState, useRef } from 'react'

interface FileUploadProps {
  readonly projectId: string
  readonly onUploadSuccess?: (file: any) => void
}

export default function FileUpload({ projectId, onUploadSuccess }: Readonly<FileUploadProps>) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    
    if (!allowedTypes.includes(file.type)) {
      setError('File type not supported. Please upload PDF, JPG, PNG, or DOC files.')
      return
    }

    await uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('files', file)
      formData.append('ref', 'api::project.project')
      formData.append('refId', projectId)
      formData.append('field', 'documents')

      const response = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setSuccess(true)
      
      if (onUploadSuccess) {
        onUploadSuccess(data[0])
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setSuccess(false)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }, 3000)
    } catch (err) {
      setError('Failed to upload file. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            disabled={uploading}
          />
          
          <button
            onClick={handleButtonClick}
            disabled={uploading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload File
              </>
            )}
          </button>
        </div>
        
        <p className="mt-2 text-xs text-gray-500">
          PDF, JPG, PNG, DOC up to 10MB
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-green-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-sm text-green-800">File uploaded successfully!</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Made with Bob
