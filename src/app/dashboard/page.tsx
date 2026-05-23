'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import AuthGuard from '@/components/AuthGuard'
import Navbar from '@/components/Navbar'
import UploadZone from '@/components/UploadZone'
import ResultCard from '@/components/ResultCard'
import api from '@/lib/api'

interface Prediction { class: string; confidence: number }

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Prediction[] | null>(null)
  const [inferenceMs, setInferenceMs] = useState(0)

  const handleFile = async (file: File) => {
    setLoading(true)
    setResults(null)
    const form = new FormData()
    form.append('image', file)
    try {
      const { data } = await api.post('/api/predict/', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResults(data.predictions)
      setInferenceMs(data.inference_ms)
    } catch {
      toast.error('Prediction failed — is the Django server running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-10 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Detect a Car</h1>
            <p className="text-gray-400 text-sm mt-1">Upload any car photo — ResNet50 identifies the model across 196 classes</p>
          </div>
          <UploadZone onFile={handleFile} loading={loading} />
          {loading && (
            <div className="flex items-center justify-center gap-3 py-8">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400 text-sm">Running inference…</span>
            </div>
          )}
          {results && <ResultCard predictions={results} inferenceMs={inferenceMs} />}
        </main>
      </div>
    </AuthGuard>
  )
}