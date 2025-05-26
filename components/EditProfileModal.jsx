"use client"
import { useState, useEffect } from "react"
import ChangePasswordModal from "./ChangePasswordModal"

export default function EditProfileModal({ onClose, onConfirm, initialData }) {
  const [firstName, setFirstName] = useState(initialData.firstName || "")
  const [lastName, setLastName] = useState(initialData.lastName || "")
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

  // Update form when initialData changes
  useEffect(() => {
    setFirstName(initialData.firstName || "")
    setLastName(initialData.lastName || "")
  }, [initialData])

  const handleConfirm = () => {
    onConfirm({
      firstName,
      lastName,
    })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[500px] h-[560px] p-6 flex flex-col relative">
          <h2 className="text-[24px] font-[Poppins] text-center mt-4">EDIT PROFILE</h2>

          <div className="flex items-center mt-8 mx-auto w-[211px] h-[81px]">
            <div className="w-[81px] h-[81px] bg-gray-300 rounded-full flex items-center justify-center">
              {/* Profile Picture Placeholder */}
            </div>
            <div className="flex flex-col ml-4 text-sm">
              <span>Drag image</span>
              <span className="text-center">OR</span>
              <button className="text-blue-500 underline" onClick={() => alert("Open gallery")}>
                Browse image
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 space-y-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D51A] px-4 text-[#2185D5] text-[15px] placeholder-[#2185D5]"
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D51A] px-4 text-[#2185D5] text-[15px] placeholder-[#2185D5]"
            />
            <div
              onClick={() => {
                setIsChangePasswordOpen(true)
              }}
              className="w-[364px] h-[70px] rounded-[8px] bg-[#2185D5] text-white text-[15px] flex items-center justify-center cursor-pointer"
            >
              <span>Change password</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-auto pb-4">
            <button
              className="w-[122px] h-[44px] bg-white text-[#858D9D] text-[16px] rounded-md border"
              onClick={onClose}
            >
              Discard
            </button>
            <button
              className="w-[122px] h-[44px] bg-[#6ED120] text-white text-[16px] rounded-md"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {isChangePasswordOpen && (
        <ChangePasswordModal
          onClose={() => setIsChangePasswordOpen(false)}
          onConfirm={(data) => {
            // Handle password change
            console.log("Password changed:", data)
            setIsChangePasswordOpen(false)
          }}
        />
      )}
    </>
  )
}
