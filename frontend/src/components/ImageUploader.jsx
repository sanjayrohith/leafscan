import { useState, useRef, useCallback } from 'react'

/**
 * Drag-and-drop image upload component.
 *
 * Props:
 *   onImageSelected(file: File) — called when the user selects or drops an image.
 *   disabled (boolean)          — disable interaction while a prediction is in progress.
 */
export default function ImageUploader({ onImageSelected, disabled = false }) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  // Handle file selection from both drag-drop and click-to-browse
  const handleFile = useCallback(
    (file) => {
      if (!file || disabled) return

      // Validate it's an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (JPEG, PNG, etc.)')
        return
      }

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Notify the parent component
      onImageSelected(file)
    },
    [onImageSelected, disabled]
  )

  // --- Drag event handlers ---
  const handleDragOver = (e) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  // Click the hidden file input
  const handleClick = () => {
    if (!disabled) fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
    // Reset the input so the same file can be re-selected
    e.target.value = ''
  }

  /**
   * Clear the current preview (called by the parent via reset).
   * Exposed via the component's public API through the parent passing a new key.
   */
  const clearPreview = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }, [preview])

  // If parent re-renders without preview, clear it
  // (parent controls reset by remounting with a new key)

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        id="file-input"
      />

      {/* Drop zone */}
      <div
        id="drop-zone"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed
          transition-all duration-300 ease-out
          focus-within:ring-2 focus-within:ring-leaf-400/50 focus-within:ring-offset-2 focus-within:ring-offset-leaf-950
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${
            isDragging
              ? 'border-leaf-400 bg-leaf-500/10 drop-zone-active scale-[1.03] shadow-2xl shadow-leaf-400/20'
              : 'border-white/20 hover:border-leaf-400/50 hover:bg-white/5 hover:shadow-2xl hover:shadow-leaf-500/10'
          }
          ${preview ? 'p-3' : 'p-10 sm:p-14'}
        `}
      >
        {preview ? (
          /* Image preview */
          <div className="relative group">
            <img
              src={preview}
              alt="Uploaded leaf preview"
              className="w-full max-h-80 object-contain rounded-xl border border-leaf-400/20 shadow-lg shadow-black/20"
            />
            {/* Overlay on hover */}
            {!disabled && (
              <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center shadow-inner">
                <p className="text-white text-sm font-medium">Click to change image</p>
              </div>
            )}
          </div>
        ) : (
          /* Empty state — upload prompt */
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Upload icon */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-leaf-500/20 to-leaf-600/20 flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-leaf-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>

            <div>
              <p className="text-lg font-semibold text-leaf-200">
                Drop your leaf image here
              </p>
              <p className="mt-1 text-sm text-leaf-100/50">
                or <span className="text-leaf-400 underline underline-offset-2">click to browse</span>
              </p>
            </div>

            <p className="text-xs text-leaf-100/30">
              Supports JPEG, PNG, WebP — up to 10 MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
