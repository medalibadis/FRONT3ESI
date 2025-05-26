"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function Dashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const isLoggedIn = localStorage.getItem("isLoggedIn")

          if (isLoggedIn !== "true") {
            window.location.href = "/login"
          } else {
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        window.location.href = "/login"
      }
    }

    const timer = setTimeout(() => {
      checkAuth()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    window.location.href = "/login"
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0f5fa]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2185d5] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] relative">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Stats */}
              <div className="col-span-2 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    title="Total Teachers"
                    value="10"
                  />
                  <StatCard
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2V6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 2V6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 10H21"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
                    title="Holidays"
                    value="4"
                  />
                </div>

                {/* Grade Distribution */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-[#0f172a] text-lg font-semibold mb-4">Grade Distribution</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#64748b]">Professor</span>
                        <span className="text-[#0f172a] font-medium">4</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2185d5] rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#64748b]">MCA</span>
                        <span className="text-[#0f172a] font-medium">3</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2185d5] rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#64748b]">MCB</span>
                        <span className="text-[#0f172a] font-medium">3</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2185d5] rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile & Logo */}
              <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-esAf7XSAuHwNCKztIq5gAP7i3bOAbQ.png"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[#0f172a] text-xl font-semibold">Dennai Amro Abdullah</h3>
                  <p className="text-[#2185d5] font-medium">Admin</p>
                </div>

                {/* Logo Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm flex items-center justify-center">
                  <Image src="/esi-logo.png" alt="ESI Logo" width={120} height={120} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#2185d5]">{icon}</div>
      <div>
        <h3 className="text-[#64748b] text-base font-normal">{title}</h3>
        <p className="text-[#0f172a] text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}
