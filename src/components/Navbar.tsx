'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="border-b border-gray-800 bg-gray-950 px-6 py-4 flex items-center justify-between">
      <Link href="/dashboard" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17H3a2 2 0 01-2-2v-4a2 2 0 012-2h1l2-4h12l2 4h1a2 2 0 012 2v4a2 2 0 01-2 2h-2M7.5 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16.5 17.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          </svg>
        </div>
        <span className="font-semibold text-white">CarDetect AI</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">Detect</Link>
        <Link href="/dashboard/history" className="text-sm text-gray-400 hover:text-white transition">History</Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{user?.username}</span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-red-400 transition">
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}