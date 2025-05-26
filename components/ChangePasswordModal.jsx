"use client"

import { useState } from "react"

export default function ChangePasswordModal({ onClose, onConfirm }) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleConfirm = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // If validation passes, call onConfirm
    onConfirm({
      currentPassword,
      newPassword,
    })
  }

  // Stop propagation to prevent clicks from reaching parent elements
  const handleModalClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-[60]"
      onClick={onClose} // Close when clicking the backdrop
    >
      <div
        className="bg-white rounded-lg w-[500px] h-[560px] p-6 flex flex-col relative"
        onClick={handleModalClick} // Prevent clicks from closing the modal
      >
        <h2 className="text-[24px] font-[Poppins] text-center mt-4">CHANGE PASSWORD</h2>

        <div className="flex items-center justify-center mt-8">
          <div className="w-[81px] h-[81px] bg-[#2185D51A] rounded-full flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#2185D5]"
            >
              <path
                d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        <div className="flex flex-col items-center mt-6 space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D51A] px-4 text-[#2185D5] text-[15px] placeholder-[#2185D5]"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D51A] px-4 text-[#2185D5] text-[15px] placeholder-[#2185D5]"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D51A] px-4 text-[#2185D5] text-[15px] placeholder-[#2185D5]"
          />
        </div>

        <div className="flex justify-center gap-6 mt-auto pb-4">
          <button
            className="w-[122px] h-[44px] bg-white text-[#858D9D] text-[16px] rounded-md border"
            onClick={onClose}
            type="button"
          >
            Discard
          </button>
          <button
            className="w-[122px] h-[44px] bg-[#6ED120] text-white text-[16px] rounded-md"
            onClick={handleConfirm}
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
