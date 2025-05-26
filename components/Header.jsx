"use client"
import { Search } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white p-6 flex justify-between items-center">
            <div>
                <h2 className="text-[#64748b] text-lg">Hi admin</h2>
                <h1 className="text-[#1e293b] text-2xl font-bold">Welcome!</h1>
            </div>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
} 