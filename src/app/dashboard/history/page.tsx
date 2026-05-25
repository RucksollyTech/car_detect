'use client'
import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import Navbar from '@/components/Navbar'
import api from '@/lib/api'
import MobileBar from '@/components/mobileBar'

interface HistoryItem {
  id: number
  top_prediction: string
  confidence: number
  image_url: string
  created_at: string
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/history/')
      .then(r => setItems(r.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <MobileBar />
        <main className="max-w-4xl mx-auto px-4 pt-6 pb-10 md:pt-10 md:pb-10">
          <h1 className="text-2xl font-bold text-white mb-6">Detection History</h1>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-gray-500 text-center py-20">No detections yet — go detect a car!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map(item => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                  <img src={item.image_url} alt={item.top_prediction} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <p className="text-white text-sm font-medium truncate">{item.top_prediction}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-blue-400 text-sm font-mono">{item.confidence}%</span>
                      <span className="text-gray-600 text-xs">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  )
}