import { useState, useCallback } from 'react'
import ImageUploader from '../components/ImageUploader'
import ResultCard from '../components/ResultCard'
import { predictDisease } from '../api/predict'

/**
 * Home page — main prediction flow.
 *
 * State machine:
 *   idle      → user hasn't uploaded an image yet
 *   loading   → image is being sent to the backend
 *   result    → prediction succeeded, showing ResultCard
 *   error     → something went wrong
 */
export default function Home() {
  const [status, setStatus] = useState('idle')     // 'idle' | 'loading' | 'result' | 'error'
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [uploaderKey, setUploaderKey] = useState(0) // changing key remounts the uploader (clears preview)

  /**
   * Called when the user selects/drops an image.
   * Immediately sends it to the backend for prediction.
   */
  const handleImageSelected = useCallback(async (file) => {
    setStatus('loading')
    setError('')
    setResult(null)

    try {
      const data = await predictDisease(file)
      setResult(data)
      setStatus('result')
    } catch (err) {
      // Build a user-friendly error message
      let message = 'Something went wrong. Please try again.'
      if (err.response) {
        // Server responded with an error
        message = err.response.data?.detail || `Server error (${err.response.status})`
      } else if (err.code === 'ECONNABORTED') {
        message = 'Request timed out. The server might be overloaded — please try again.'
      } else if (err.message?.includes('Network Error')) {
        message = 'Cannot reach the server. Make sure the backend is running on port 8000.'
      }
      setError(message)
      setStatus('error')
    }
  }, [])

  /**
   * Reset everything so the user can upload another image.
   */
  const handleReset = () => {
    setStatus('idle')
    setResult(null)
    setError('')
    setUploaderKey((k) => k + 1) // remount uploader to clear preview
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Hero section */}
      <div className="text-center mb-12 sm:mb-16 animate-fade-in">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-shadow-glow">
          <span className="bg-gradient-to-r from-leaf-200 via-leaf-300 to-leaf-400 bg-clip-text text-transparent">
            Plant Disease
          </span>{' '}
          <span className="text-leaf-100">Detection</span>
        </h1>
        <p className="mt-4 text-xl text-leaf-100/50 max-w-xl mx-auto leading-relaxed">
          Upload a photo of a plant leaf and our AI will instantly identify diseases
          with treatment recommendations.
        </p>
      </div>

      {/* Upload area (hidden once we have a result) */}
      {status !== 'result' && (
        <ImageUploader
          key={uploaderKey}
          onImageSelected={handleImageSelected}
          disabled={status === 'loading'}
        />
      )}

      {/* Loading spinner */}
      {status === 'loading' && (
        <div className="flex flex-col items-center gap-4 mt-8 animate-fade-in" id="loading-spinner">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-leaf-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-leaf-400 animate-spin" />
          </div>
          <p className="text-sm text-leaf-100/50 font-medium">Analyzing your leaf…</p>
        </div>
      )}

      {/* Error message */}
      {status === 'error' && (
        <div className="max-w-lg mx-auto mt-8 animate-slide-up" id="error-message">
          <div className="glass rounded-2xl p-6 border-red-500/30 border">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-red-300 font-semibold">Prediction Failed</h3>
                <p className="text-sm text-red-200/70 mt-1">{error}</p>
              </div>
            </div>
            <button
              id="error-retry-button"
              onClick={handleReset}
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold
                bg-red-500/20 hover:bg-red-500/30 text-red-200
                transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Result card */}
      {status === 'result' && result && (
        <div className="mt-2">
          <ResultCard result={result} onReset={handleReset} />
        </div>
      )}

      {/* Feature highlights (only visible in idle state) */}
      {status === 'idle' && (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
              title: 'Instant Analysis',
              desc: 'Get results in seconds with our deep learning model.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              ),
              title: '38 Diseases',
              desc: 'Covers major crops including tomato, potato, grape & more.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.318 2.636a2.25 2.25 0 01-2.014 1.244h-7.336a2.25 2.25 0 01-2.014-1.244L5 14.5m14 0h-14" />
                </svg>
              ),
              title: 'Treatment Tips',
              desc: 'Actionable treatment recommendations for every diagnosis.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 hover:bg-white/[0.08] transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-leaf-500/10 flex items-center justify-center text-leaf-400 mb-3 group-hover:bg-leaf-500/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-leaf-200">{feature.title}</h3>
              <p className="mt-1 text-xs text-leaf-100/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
