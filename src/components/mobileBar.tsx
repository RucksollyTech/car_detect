"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const MobileBar = () => {
    const { logout } = useAuth()
    return (
        <div className='md:hidden pt-3 px-4 flex justify-between items-center gap-6 flex-wrap'>
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">Detect</Link>
            <Link href="/dashboard/history" className="text-sm text-gray-400 hover:text-white transition">History</Link>
            <button onClick={logout} className="text-sm cursor-pointer text-gray-400 hover:text-red-400 transition">
                Sign out
            </button>
        </div>
    )
}

export default MobileBar