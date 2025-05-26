"use client"
import { Bell, Search, Calendar, Pencil, Trash2, ListFilter, ChevronDown, X, Check, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [isTimeTableModalOpen, setIsTimeTableModalOpen] = useState(false)
  const [isAddLectureModalOpen, setIsAddLectureModalOpen] = useState(false)
  const [isDeleteLectureModalOpen, setIsDeleteLectureModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [userToEdit, setUserToEdit] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  })
  const [newLecture, setNewLecture] = useState({
    name: "",
    type: "",
    day: "",
    time: ""
  })
  const [lectureToDelete, setLectureToDelete] = useState(null)

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Fetitah",
      lastName: "Rachida",
      email: "r.fetitah@esi-sba.dz",
      role: "MCA",
      buttonLabel: "button 1",
    },
    {
      id: 2,
      firstName: "Aced",
      lastName: "Mohammed",
      email: "mr.aced@esi-sba.dz",
      role: "MCB",
      buttonLabel: "button 2",
    },
    {
      id: 3,
      firstName: "Benslimane",
      lastName: "Mohammed",
      email: "s.benslimane@esi-sba.dz",
      role: "Professor",
      buttonLabel: "button 3",
    },
  ])

  // Sample attendance data
  const attendanceData = {
    present: [
      {
        courseName: "Software Engineering",
        date: "15/03/2024",
        time: "08:30 - 10:30"
      },
      {
        courseName: "Database Systems",
        date: "14/03/2024",
        time: "13:00 - 15:00"
      }
    ],
    absent: [
      {
        courseName: "Web Development",
        date: "13/03/2024",
        time: "10:30 - 12:30"
      },
      {
        courseName: "Network Security",
        date: "12/03/2024",
        time: "15:00 - 17:00"
      }
    ]
  }

  // Sample timetable data
  const [teacherStats, setTeacherStats] = useState({
    totalLectures: 12,
    cours: 5,
    td: 4,
    tp: 3
  })

  const [timeTableData, setTimeTableData] = useState([
    {
      name: "Security",
      type: "Cours",
      day: "Sunday",
      time: "08:00-09:30"
    },
    {
      name: "Database",
      type: "TD",
      day: "Monday",
      time: "11:00-12:30"
    },
    {
      name: "Networks",
      type: "TP",
      day: "Wednesday",
      time: "14:00-15:30"
    }
  ])

  const timeSlots = [
    "08:00-09:30",
    "09:30-11:00",
    "11:00-12:30",
    "14:00-15:30",
    "15:30-17:00"
  ]

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditClick = (user) => {
    setModalMode('edit')
    setUserToEdit(user)
    setNewUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role
    })
    setIsModalOpen(true)
  }

  const handleAddNewClick = () => {
    setModalMode('add')
    setUserToEdit(null)
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    })
    setIsModalOpen(true)
  }

  const handleSaveUser = () => {
    if (modalMode === 'add') {
      // Existing add user logic
      const newUserData = {
        id: users.length + 1,
        ...newUser,
        buttonLabel: `button ${users.length + 1}`
      }
      setUsers(prev => [...prev, newUserData])
    } else {
      // Edit user logic
      setUsers(prev => prev.map(user =>
        user.id === userToEdit.id
          ? { ...user, ...newUser }
          : user
      ))
    }
    setIsModalOpen(false)
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    })
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    setUsers(prev => prev.filter(user => user.id !== userToDelete.id))
    setIsDeleteModalOpen(false)
    setUserToDelete(null)
  }

  const handleAttendanceClick = (user) => {
    setSelectedUser(user)
    setIsAttendanceModalOpen(true)
  }

  const handleTimeTableClick = (user) => {
    setSelectedTeacher(user)
    setIsTimeTableModalOpen(true)
  }

  const handleAddLecture = () => {
    if (newLecture.name && newLecture.type && newLecture.day && newLecture.time) {
      const updatedTimeTableData = [...timeTableData, newLecture]
      setTimeTableData(updatedTimeTableData)

      // Update stats
      setTeacherStats(prev => ({
        ...prev,
        [newLecture.type.toLowerCase()]: prev[newLecture.type.toLowerCase()] + 1,
        totalLectures: prev.totalLectures + 1
      }))

      setIsAddLectureModalOpen(false)
      setNewLecture({
        name: "",
        type: "",
        day: "",
        time: ""
      })
    }
  }

  const handleDeleteLectureConfirm = () => {
    if (lectureToDelete) {
      setTimeTableData(prev => prev.filter(lecture =>
        !(lecture.name === lectureToDelete.name &&
          lecture.day === lectureToDelete.day &&
          lecture.time === lectureToDelete.time)
      ))

      // Update stats
      setTeacherStats(prev => ({
        ...prev,
        [lectureToDelete.type.toLowerCase()]: prev[lectureToDelete.type.toLowerCase()] - 1,
        totalLectures: prev.totalLectures - 1
      }))

      setIsDeleteLectureModalOpen(false)
      setLectureToDelete(null)
    }
  }

  const getLectureColor = (type) => {
    switch (type) {
      case 'Cours': return 'bg-[#D1FAE5]'
      case 'TD': return 'bg-[#EDE9FE]'
      case 'TP': return 'bg-[#FFEDD5]'
      default: return ''
    }
  }

  // Helper function to get available time slots for a selected day
  const getAvailableTimeSlots = (selectedDay) => {
    if (!selectedDay) return timeSlots;

    const occupiedSlots = timeTableData
      .filter(lecture => lecture.day === selectedDay)
      .map(lecture => lecture.time);

    return timeSlots.filter(slot => !occupiedSlots.includes(slot));
  }

  // Helper function to get available days for a selected time
  const getAvailableDays = (selectedTime) => {
    if (!selectedTime) return days;

    const occupiedDays = timeTableData
      .filter(lecture => lecture.time === selectedTime)
      .map(lecture => lecture.day);

    return days.filter(day => !occupiedDays.includes(day));
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] relative">
      {/* Sidebar */}
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
        <nav className="flex-1 py-8">
          <ul className="space-y-6">
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
              <Link href="/users" className="sidebar-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Users</span>
              </Link>
            </li>
            {/* <li>
              <Link href="#" className="sidebar-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6.5H8.5V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 12V17.5H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Structures</span>
              </Link>
            </li> */}
            <li>
              <Link href="#" className="sidebar-item">
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
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            {/* <li>
              <Link href="#" className="sidebar-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Permissions</span>
              </Link>
            </li> */}
            <li>
              <Link href="/settings" className="sidebar-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-6 mt-auto">
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn")
              window.location.href = "/login"
            }}
            className="sidebar-item w-full"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-[#1e293b] text-lg">Hi admin</h2>
            <h1 className="text-[#1e293b] text-2xl font-bold">Welcome to users configuration !</h1>
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
            <div className="relative">
              <Bell className="text-[#2185d5]" size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </header>

        {/* Users Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#f8fafc]">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-[#1e293b] text-xl font-medium">Users</h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-600 bg-white">
                <ListFilter size={16} />
                <span>Filters</span>
              </button>
              <button
                onClick={handleAddNewClick}
                className="px-4 py-2 bg-[#2185d5] text-white rounded-md text-sm font-medium"
              >
                Add user
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                  <th className="px-6 py-4 font-medium">First name</th>
                  <th className="px-6 py-4 font-medium">Last name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">role</th>
                  <th className="px-6 py-4 font-medium">History</th>
                  <th className="px-6 py-4 font-medium">More</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{user.firstName}</td>
                    <td className="px-6 py-4 text-sm">{user.lastName}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.role}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleAttendanceClick(user)}
                        className="bg-[#2185d5] text-white text-sm py-2 px-4 rounded-md font-medium"
                      >
                        {user.buttonLabel}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleTimeTableClick(user)}
                          className="text-gray-500 hover:text-[#2185d5] bg-gray-100 p-2 rounded-md"
                        >
                          <Calendar size={18} />
                        </button>
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-gray-500 hover:text-[#2185d5] bg-gray-100 p-2 rounded-md"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="text-gray-500 hover:text-red-500 bg-gray-100 p-2 rounded-md"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] h-[600px] rounded-lg relative">
            <div className="px-8 pt-10">
              <h2 className="text-black text-2xl font-poppins text-center">
                {modalMode === 'add' ? 'Create New Account' : 'Edit User'}
              </h2>

              <div className="space-y-4 mt-[30px] ml-7 items-center justify-center">
                {/* First Name */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="text"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="First Name"
                  />
                </div>

                {/* Last Name */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="text"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Last Name"
                  />
                </div>

                {/* Email */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Enter user's email"
                  />
                </div>

                {/* Password */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* Role */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D5] rounded-lg relative flex items-center justify-between px-4">
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-white appearance-none text-center outline-none"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="MCA">MCA</option>
                    <option value="MCB">MCB</option>
                    <option value="Professor">Professor</option>
                  </select>
                  <ChevronDown className="text-white absolute right-4 pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-10 w-full flex gap-4 px-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-[110px] h-[44px] rounded-[10px] border bg-red-500 text-[#F0F1F3]"
                >
                  Discard
                </button>
                <button
                  onClick={handleSaveUser}
                  className="w-[110px] h-[44px] rounded-[10px] bg-[#2185D5] text-white"
                >
                  {modalMode === 'add' ? 'Add User' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] h-[266px] rounded-lg relative">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-black text-2xl mb-8 ml-8">
                Are you sure you want to delete this account?
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-[110px] h-[44px] rounded-[10px] border bg-red-500 text-[#F0F1F3]"
                >
                  Discard
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="w-[110px] h-[44px] rounded-[10px] bg-[#2185D5] text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Record Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[900px] h-[468px] rounded-lg relative p-8">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-black text-2xl font-medium">Attendance Record</h2>
                <button
                  onClick={() => setIsAttendanceModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-6">
                {/* Present Lectures */}
                <div className="flex-1 bg-[#ECFDF5] rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="text-green-600" size={16} />
                    </div>
                    <h3 className="text-green-600 text-xl">Present Lectures</h3>
                  </div>

                  <div className="space-y-4">
                    {attendanceData.present.map((lecture, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 w-[354px] h-[76px]">
                        <div className="flex justify-between items-start">
                          <h4 className="text-black text-base font-medium">{lecture.courseName}</h4>
                          <p className="text-gray-500 text-sm">{lecture.date}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{lecture.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Absent Lectures */}
                <div className="flex-1 bg-[#FEF2F2] rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                      <X className="text-red-600" size={16} />
                    </div>
                    <h3 className="text-red-600 text-xl">Absent Lectures</h3>
                  </div>

                  <div className="space-y-4">
                    {attendanceData.absent.map((lecture, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 w-[354px] h-[76px]">
                        <div className="flex justify-between items-start">
                          <h4 className="text-black text-base font-medium">{lecture.courseName}</h4>
                          <p className="text-gray-500 text-sm">{lecture.date}</p>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{lecture.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher's TimeTable Modal */}
      {isTimeTableModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[1200px] h-[602px] rounded-lg relative p-8">
            <div className="flex flex-col h-full">
              <h2 className="text-black text-xl font-medium mb-6">Teacher's TimeTable</h2>

              {/* Stats Cards */}
              <div className="flex gap-4 mb-6">
                <div className="w-[276px] h-[92px] bg-[#EFF6FF] rounded-lg p-4">
                  <h3 className="text-[#1E40AF] text-sm font-medium mb-2">Total Lectures</h3>
                  <p className="text-[#1E40AF] text-2xl font-bold">{teacherStats.totalLectures}</p>
                </div>
                <div className="w-[276px] h-[92px] bg-[#ECFDF5] rounded-lg p-4">
                  <h3 className="text-[#047857] text-sm font-medium mb-2">Cours</h3>
                  <p className="text-[#047857] text-2xl font-bold">{teacherStats.cours}</p>
                </div>
                <div className="w-[276px] h-[92px] bg-[#F5F3FF] rounded-lg p-4">
                  <h3 className="text-[#6D28D9] text-sm font-medium mb-2">TD</h3>
                  <p className="text-[#6D28D9] text-2xl font-bold">{teacherStats.td}</p>
                </div>
                <div className="w-[276px] h-[92px] bg-[#FFF7ED] rounded-lg p-4">
                  <h3 className="text-[#C2410C] text-sm font-medium mb-2">TP</h3>
                  <p className="text-[#C2410C] text-2xl font-bold">{teacherStats.tp}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setIsAddLectureModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2185D5] text-white rounded-md"
                >
                  <Plus size={18} />
                  Add Lecture
                </button>
                <button
                  onClick={() => setIsDeleteLectureModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  <Trash2 size={18} />
                  Delete Lecture
                </button>
              </div>

              {/* TimeTable Grid */}
              <div className="overflow-auto">
                <table className="w-[1152px] border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[100px] p-2 bg-[#E5E7EB] border border-gray-200">Time</th>
                      {days.map(day => (
                        <th key={day} className="p-2 bg-[#E5E7EB] border border-gray-200">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(timeSlot => (
                      <tr key={timeSlot}>
                        <td className="p-2 bg-[#E5E7EB] border border-gray-200 whitespace-nowrap">
                          {timeSlot}
                        </td>
                        {days.map(day => {
                          const lecture = timeTableData.find(l => l.day === day && l.time === timeSlot)
                          return (
                            <td key={day} className="p-2 border border-gray-200">
                              {lecture && (
                                <div className={`p-2 rounded ${getLectureColor(lecture.type)}`}>
                                  <span className="font-bold">{lecture.type}</span> {lecture.name}
                                </div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#D1FAE5]"></div>
                  <span>Cours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#EDE9FE]"></div>
                  <span>TD</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#FFEDD5]"></div>
                  <span>TP</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsTimeTableModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lecture Modal */}
      {isAddLectureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Add New Lecture</h3>
              <button
                onClick={() => setIsAddLectureModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Lecture Name"
                  value={newLecture.name}
                  onChange={(e) => setNewLecture(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <select
                  value={newLecture.type}
                  onChange={(e) => setNewLecture(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="">Select Type</option>
                  <option value="Cours">Cours</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </select>
              </div>

              <div>
                <select
                  value={newLecture.day}
                  onChange={(e) => setNewLecture(prev => ({ ...prev, day: e.target.value, time: "" }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="">Select Day</option>
                  {getAvailableDays(newLecture.time).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={newLecture.time}
                  onChange={(e) => setNewLecture(prev => ({ ...prev, time: e.target.value, day: "" }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                >
                  <option value="">Select Time</option>
                  {getAvailableTimeSlots(newLecture.day).map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddLectureModalOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLecture}
                className="px-4 py-2 bg-[#2185D5] text-white rounded-md"
                disabled={!newLecture.name || !newLecture.type || !newLecture.day || !newLecture.time}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Lecture Modal */}
      {isDeleteLectureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Delete Lecture</h3>
              <button
                onClick={() => setIsDeleteLectureModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {timeTableData.map((lecture, index) => (
                <div
                  key={index}
                  onClick={() => setLectureToDelete(lecture)}
                  className={`p-4 border border-gray-200 rounded-lg mb-2 cursor-pointer hover:bg-gray-50 ${lectureToDelete === lecture ? 'border-[#2185D5] bg-blue-50' : ''
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`font-bold ${lecture.type === 'Cours' ? 'text-green-600' :
                        lecture.type === 'TD' ? 'text-purple-600' :
                          'text-orange-600'
                        }`}>
                        {lecture.type}
                      </span>
                      <span className="ml-2">{lecture.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {lecture.day}, {lecture.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeleteLectureModalOpen(false)}
                className="px-4 py-2 border border-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLectureConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                disabled={!lectureToDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
