"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault()
    setEmailError("")

    if (!email) {
      setEmailError("Email is required")
      return
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep(2)
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setError("")

    if (!verificationCode) {
      setError("Please enter the verification code")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would redirect to a password reset page
      // For this example, we'll just go back to login
      router.push("/login")
    } catch (err) {
      setError("Invalid verification code. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/login-bg.png" alt="Background" fill priority className="object-cover" />
      </div>

      {/* Forgot Password Card */}
      <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password</h1>
          <p className="text-gray-500">
            {step === 1
              ? "Enter your email to receive a verification code"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm">{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleSubmitEmail} className="space-y-6">
            <div>
              <div className={`relative ${emailError ? "mb-1" : "mb-4"}`}>
                <input
                  type="email"
                  placeholder="Email address"
                  className={`w-full px-4 py-3 rounded-lg text-gray-700 bg-blue-50 focus:outline-none ${
                    emailError ? "border-2 border-red-500" : "border border-gray-200"
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  required
                  disabled={isLoading}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Continue"
              )}
            </button>

            <div className="pt-2 flex justify-center">
              <a
                href="/login"
                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault()
                  }
                }}
              >
                <ArrowLeft size={16} />
                <span>Back to login</span>
              </a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification code to your email address. Please enter it below.
            </p>

            <div>
              <input
                type="text"
                placeholder="Verification code"
                className="w-full px-4 py-3 rounded-lg text-gray-700 bg-blue-50 border border-gray-200 focus:outline-none focus:border-blue-500"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify"
              )}
            </button>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  if (!isLoading) {
                    setStep(1)
                  }
                }}
                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                disabled={isLoading}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
