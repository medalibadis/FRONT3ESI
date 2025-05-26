"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn) {
      // If logged in, redirect to dashboard
      router.push("/")
    } else {
      // If not logged in, redirect to login
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2185d5] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}
