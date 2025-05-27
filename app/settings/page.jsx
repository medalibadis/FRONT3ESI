"use client"
import { Bell, Search, Pencil, User, Lock, Globe, Bell as BellIcon, Shield, Moon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import EditProfileModal from "../../components/EditProfileModal"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const translations = {
  english: {
    settings: "Settings",
    profile: "Profile",
    security: "Security",
    notifications: "Notifications",
    language: "Language",
    appearance: "Appearance",
    permissions: "Permissions",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    save: "Save",
    cancel: "Cancel",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    role: "Role",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorAuthDesc: "Add an extra layer of security to your account",
    emailNotif: "Email Notifications",
    emailNotifDesc: "Receive email notifications about your account",
    pushNotif: "Push Notifications",
    pushNotifDesc: "Receive push notifications about your account",
    selectLanguage: "Select Language",
    adminOnly: "Only administrators can modify permissions",
    viewTeachers: "View Teachers",
    viewTeachersDesc: "Can view teacher profiles and information",
    manageTeachers: "Manage Teachers",
    manageTeachersDesc: "Can add, edit, and remove teachers",
    manageHolidays: "Manage Holidays",
    manageHolidaysDesc: "Can manage holiday calendar"
  },
  french: {
    settings: "Paramètres",
    profile: "Profil",
    security: "Sécurité",
    notifications: "Notifications",
    language: "Langue",
    appearance: "Apparence",
    permissions: "Permissions",
    editProfile: "Modifier le profil",
    changePassword: "Changer le mot de passe",
    currentPassword: "Mot de passe actuel",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    save: "Enregistrer",
    cancel: "Annuler",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Email",
    role: "Rôle",
    twoFactorAuth: "Authentification à deux facteurs",
    twoFactorAuthDesc: "Ajoutez une couche de sécurité supplémentaire à votre compte",
    emailNotif: "Notifications par email",
    emailNotifDesc: "Recevoir des notifications par email",
    pushNotif: "Notifications push",
    pushNotifDesc: "Recevoir des notifications push",
    selectLanguage: "Sélectionner la langue",
    adminOnly: "Seuls les administrateurs peuvent modifier les permissions",
    viewTeachers: "Voir les enseignants",
    viewTeachersDesc: "Peut voir les profils et informations des enseignants",
    manageTeachers: "Gérer les enseignants",
    manageTeachersDesc: "Peut ajouter, modifier et supprimer des enseignants",
    manageHolidays: "Gérer les congés",
    manageHolidaysDesc: "Peut gérer le calendrier des congés"
  }
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [language, setLanguage] = useState('english')
  const [theme, setTheme] = useState('light')
  const [userData, setUserData] = useState({
    firstName: "Dennai",
    lastName: "Amro Abdullah",
    email: "aa.dennai@esi-sba.dz",
    role: "Admin",
    notifications: {
      email: true,
      push: false
    },
    twoFactorAuth: false
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const t = translations[language]

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

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')

    const timer = setTimeout(() => {
      checkAuth()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Add your password change logic here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    // Implement password change API call here
    setIsPasswordModalOpen(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleProfileSave = (data) => {
    setUserData({ ...userData, ...data })
    setIsEditOpen(false)
  }

  const tabs = [
    { id: 'profile', label: t.profile, icon: User },
    { id: 'security', label: t.security, icon: Lock },
    { id: 'notifications', label: t.notifications, icon: BellIcon },
    { id: 'language', label: t.language, icon: Globe },
    { id: 'appearance', label: t.appearance, icon: Moon },
    { id: 'permissions', label: t.permissions, icon: Shield }
  ]

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0f5fa]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2185d5] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{userData.firstName} {userData.lastName}</h3>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-sm text-[#2185d5]">{userData.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-4 py-2 bg-[#2185d5] text-white rounded-md hover:bg-[#1a6cb6] transition-colors"
            >
              {t.editProfile}
            </button>
          </div>
        )
      case 'security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t.twoFactorAuth}</h3>
                <p className="text-sm text-gray-600">{t.twoFactorAuthDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.twoFactorAuth}
                  onChange={() => setUserData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
              </label>
            </div>
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 text-[#2185d5] border border-[#2185d5] rounded-md hover:bg-[#2185d5] hover:text-white transition-colors"
            >
              {t.changePassword}
            </button>
          </div>
        )
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t.emailNotif}</h3>
                <p className="text-sm text-gray-600">{t.emailNotifDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.notifications.email}
                  onChange={() => setUserData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: !prev.notifications.email }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t.pushNotif}</h3>
                <p className="text-sm text-gray-600">{t.pushNotifDesc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.notifications.push}
                  onChange={() => setUserData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: !prev.notifications.push }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
              </label>
            </div>
          </div>
        )
      case 'language':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.selectLanguage}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
              >
                <option value="english">English</option>
                <option value="french">Français</option>
              </select>
            </div>
          </div>
        )
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.theme}</label>
              <select
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
              >
                <option value="light">{t.light}</option>
                <option value="dark">{t.dark}</option>
                <option value="system">{t.system}</option>
              </select>
            </div>
          </div>
        )
      case 'permissions':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-yellow-800">{t.adminOnly}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">{t.viewTeachers}</h4>
                  <p className="text-sm text-gray-600">{t.viewTeachersDesc}</p>
                </div>
                <input type="checkbox" checked disabled className="rounded text-[#2185d5]" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">{t.manageTeachers}</h4>
                  <p className="text-sm text-gray-600">{t.manageTeachersDesc}</p>
                </div>
                <input type="checkbox" checked disabled className="rounded text-[#2185d5]" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h4 className="font-medium">{t.manageHolidays}</h4>
                  <p className="text-sm text-gray-600">{t.manageHolidaysDesc}</p>
                </div>
                <input type="checkbox" checked disabled className="rounded text-[#2185d5]" />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] dark:bg-gray-800 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-[#303841] dark:text-white mb-8">{t.settings}</h1>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === tab.id
                        ? 'border-b-2 border-[#2185d5] text-[#2185d5] dark:text-blue-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm relative">
            {/* Close button */}
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t.editProfile}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal information</p>
            </div>

            {/* Profile Picture */}
            <div className="mb-4 text-center">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 border-3 border-[#2185d5] dark:border-blue-600">
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-[#2185d5] dark:bg-blue-600 p-1.5 rounded-full text-white hover:bg-[#1a6cb6] dark:hover:bg-blue-700 transition-colors">
                  <Pencil size={14} />
                </button>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault()
              handleProfileSave({
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value
              })
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.firstName}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={userData.firstName}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2185d5] dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.lastName}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={userData.lastName}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2185d5] dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={userData.email}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#2185d5] dark:focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.role}
                  </label>
                  <input
                    type="text"
                    value={userData.role}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-[#2185d5] text-white rounded-lg hover:bg-[#1a6cb6] transition-colors font-medium"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 dark:text-white">{t.changePassword}</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.currentPassword}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.newPassword}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.confirmPassword}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2185d5] text-white rounded-md hover:bg-[#1a6cb6]"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
