'use client'

import { useState } from 'react'

interface PDFViewerProps {
  url: string
  title?: string
}

export default function PDFViewer({ url, title }: PDFViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleOpen = () => {
    setIsOpen(true)
    setLoading(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setLoading(true)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpen}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        View PDF
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {title || 'PDF Document'}
                </h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={url}
                    download
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </a>
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>
                </div>
              </div>

              {/* PDF Content */}
              <div className="flex-1 relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading PDF...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  title={title || 'PDF Document'}
                  onLoad={handleLoad}
                />
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50 text-sm text-gray-600">
                <p>
                  💡 Tip: Use the toolbar in the PDF viewer to zoom, navigate pages, and print.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Made with Bob
