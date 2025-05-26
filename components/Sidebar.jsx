"use client"
import Image from "next/image"
import Link from "next/link"
import { Settings, LogOut, Clock, DollarSign } from 'lucide-react'

export default function Sidebar() {
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        window.location.href = "/login"
    }

    return (
        <div className="w-[280px] bg-white border-r border-gray-100 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <Image src="/esi-logo.png" alt="ESI Logo" width={55} height={55} className="object-contain" />
                    <div>
                        <h1 className="text-[#0f172a] font-bold text-lg">ESI-TEACHERS</h1>
                        <p className="text-[#64748b] text-xs">schedule management</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 flex flex-col">
                <ul className="space-y-6 flex-1">
                    <li>
                        <Link href="/" className="sidebar-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                                <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users" className="sidebar-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Teachers</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/holidays" className="sidebar-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 2V6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2V6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 10H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Holidays</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/period" className="sidebar-item">
                            <Clock size={20} />
                            <span>Period</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/payment" className="sidebar-item">
                            <DollarSign size={20} />
                            <span>Payment</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className="sidebar-item">
                            <Settings size={20} />
                            <span>Settings</span>
                        </Link>
                    </li>
                </ul>

                {/* Bottom Navigation */}
                <ul className="space-y-6 pt-6 border-t border-gray-100">
                    <li>
                        <button onClick={handleLogout} className="sidebar-item w-full">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
} 