'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
  onFile: (file: File) => void
  loading: boolean
}

export default function UploadZone({ onFile, loading }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((files: File[]) => {
    if (!files[0]) return
    setPreview(URL.createObjectURL(files[0]))
    onFile(files[0])
  }, [onFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }, maxFiles: 1
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition
        ${isDragActive ? 'border-blue-500 bg-blue-500/5' : 'border-gray-700 hover:border-gray-500'}
        ${loading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-xl object-contain" />
      ) : (
        <div className="space-y-3">
          <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">Drop a car image here or <span className="text-blue-400">browse</span></p>
          <p className="text-gray-600 text-xs">JPG, PNG, WEBP</p>
        </div>
      )}
    </div>
  )
}