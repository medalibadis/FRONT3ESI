export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f5fa]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2185d5] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading settings...</p>
      </div>
    </div>
  )
}
