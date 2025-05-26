"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      if (isLoggedIn === "true") {
        router.push("/")
      }
    }
  }, [router])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Reset errors
    setEmailError("")
    setPasswordError("")

    // Validate inputs
    let hasError = false

    if (!email) {
      setEmailError("Email is required")
      hasError = true
    } else if (!validateEmail(email)) {
      setEmailError("Wrong email address")
      hasError = true
    }

    if (!password) {
      setPasswordError("Password is required")
      hasError = true
    } else if (password.length < 6) {
      setPasswordError("Wrong password")
      hasError = true
    }

    if (hasError) return

    setIsLoading(true)

    try {
      // Simple credential check
      if (email === "admin@example.com" && password === "password") {
        // Set authentication in localStorage
        localStorage.setItem("isLoggedIn", "true")

        // Wait a moment before redirecting
        setTimeout(() => {
          // Force a hard navigation
          window.location.href = "/"
        }, 500)
      } else {
        setEmailError("Wrong email address")
        setPasswordError("Wrong password")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Login error:", err)
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/login-bg.png" alt="Background" fill priority className="object-cover" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className={`relative ${emailError ? "mb-1" : "mb-4"}`}>
              <input
                type="text"
                placeholder="Email"
                className={`w-full px-4 py-3 rounded-lg text-gray-700 bg-blue-50 focus:outline-none ${
                  emailError ? "border-2 border-red-500" : "border border-gray-200"
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError("")
                }}
                disabled={isLoading}
              />
            </div>
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <div className={`relative ${passwordError ? "mb-1" : "mb-4"}`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full px-4 py-3 rounded-lg text-gray-700 bg-blue-50 focus:outline-none pr-10 ${
                  passwordError ? "border-2 border-red-500" : "border border-gray-200"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError("")
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm text-gray-500 hover:text-blue-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Test credentials helper - can be removed in production */}
        <div className="mt-6 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
          <p className="font-medium mb-1">Test credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  )
}
