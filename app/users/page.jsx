"use client"
import { Bell, Search, Calendar, Pencil, Trash2, ListFilter, ChevronDown, X, Check, Plus, Eye, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false)
  const [isTimeTableModalOpen, setIsTimeTableModalOpen] = useState(false)
  const [isAddLectureModalOpen, setIsAddLectureModalOpen] = useState(false)
  const [isDeleteLectureModalOpen, setIsDeleteLectureModalOpen] = useState(false)
  const [isManageAbsenceModalOpen, setIsManageAbsenceModalOpen] = useState(false)
  const [isViewAbsencesModalOpen, setIsViewAbsencesModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [teacherToEdit, setTeacherToEdit] = useState(null)
  const [teacherToDelete, setTeacherToDelete] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [newTeacher, setNewTeacher] = useState({
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
  const [selectedAbsences, setSelectedAbsences] = useState([])
  const [absentLectures, setAbsentLectures] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [showTimetable, setShowTimetable] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [weekDates, setWeekDates] = useState([])

  // Sample teachers data
  const [teachers, setTeachers] = useState([
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

  // Add new state for filtering and search
  const [selectedRole, setSelectedRole] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)

  // Filter teachers based on role and search query
  const filteredTeachers = teachers.filter(teacher => {
    const matchesRole = selectedRole === 'all' || teacher.role === selectedRole
    const matchesSearch = searchQuery === '' || (
      teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return matchesRole && matchesSearch
  })

  // Role options for filter
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Professor', label: 'Professor' },
    { value: 'MCA', label: 'MCA' },
    { value: 'MCB', label: 'MCB' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTeacher(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditClick = (teacher) => {
    setModalMode('edit')
    setTeacherToEdit(teacher)
    setNewTeacher({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      password: "",
      confirmPassword: "",
      role: teacher.role
    })
    setIsModalOpen(true)
  }

  const handleAddNewClick = () => {
    setModalMode('add')
    setTeacherToEdit(null)
    setNewTeacher({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    })
    setIsModalOpen(true)
  }

  const handleSaveTeacher = () => {
    if (modalMode === 'add') {
      // Add new teacher
      const newTeacherData = {
        id: teachers.length + 1,
        ...newTeacher,
        buttonLabel: `button ${teachers.length + 1}`
      }
      setTeachers(prev => [...prev, newTeacherData])
    } else {
      // Edit teacher
      setTeachers(prev => prev.map(teacher =>
        teacher.id === teacherToEdit.id
          ? { ...teacher, ...newTeacher }
          : teacher
      ))
    }
    setIsModalOpen(false)
    setNewTeacher({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: ""
    })
  }

  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherToDelete.id))
    setIsDeleteModalOpen(false)
    setTeacherToDelete(null)
  }

  const handleAttendanceClick = (teacher) => {
    setSelectedTeacher(teacher)
    setIsAttendanceModalOpen(true)
  }

  const handleTimeTableClick = (teacher) => {
    setSelectedTeacher(teacher)
    setShowTimetable(false)
    setSelectedPeriod(null)
    setIsTimeTableModalOpen(true)
  }

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period)
    setShowTimetable(true)
  }

  const handleAddLecture = () => {
    console.log('Adding lecture:', newLecture); // Debug log

    if (newLecture.name && newLecture.type && newLecture.day && newLecture.time) {
      const lectureToAdd = {
        name: newLecture.name,
        type: newLecture.type,
        day: newLecture.day,
        time: newLecture.time
      };

      setTimeTableData(prevData => [...prevData, lectureToAdd]);

      // Update stats
      setTeacherStats(prev => ({
        ...prev,
        [lectureToAdd.type.toLowerCase()]: prev[lectureToAdd.type.toLowerCase()] + 1,
        totalLectures: prev.totalLectures + 1
      }));

      // Reset form and close modal
      setNewLecture({
        name: "",
        type: "",
        day: "",
        time: ""
      });
      setIsAddLectureModalOpen(false);
    } else {
      console.log('Missing fields:', {
        name: !newLecture.name,
        type: !newLecture.type,
        day: !newLecture.day,
        time: !newLecture.time
      }); // Debug log
    }
  };

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

  const handleAbsenceToggle = (lecture) => {
    setSelectedAbsences(prev => {
      const isSelected = prev.some(
        l => l.name === lecture.name && l.day === lecture.day && l.time === lecture.time
      );

      if (isSelected) {
        return prev.filter(
          l => !(l.name === lecture.name && l.day === lecture.day && l.time === lecture.time)
        );
      } else {
        return [...prev, lecture];
      }
    });
  };

  const handleConfirmAbsences = () => {
    setAbsentLectures(selectedAbsences);
    setIsManageAbsenceModalOpen(false);
    setSelectedAbsences([]);
  };

  const handleSendAbsences = async () => {
    try {
      // Here you would make your API call to the database
      // Example API call (replace with your actual endpoint):
      // await fetch('/api/absences', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     teacherId: selectedTeacher.id,
      //     absences: absentLectures
      //   }),
      // });

      // For now, we'll simulate a successful API call
      setTimeout(() => {
        // Clear the absences after successful send
        setAbsentLectures([]);
        setIsViewAbsencesModalOpen(false);
        // You can add a success notification here
        alert('Absences have been sent successfully!');
      }, 1000);

    } catch (error) {
      console.error('Error sending absences:', error);
      alert('Failed to send absences. Please try again.');
    }
  };

  // Sample teacher periods data (replace with actual data from your database)
  const [teacherPeriodsData] = useState({
    1: [ // Teacher ID 1
      {
        id: 1,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        status: "Completed"
      },
      {
        id: 2,
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        status: "Active"
      }
    ],
    2: [ // Teacher ID 2
      {
        id: 3,
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        status: "Completed"
      }
    ],
    3: [ // Teacher ID 3
      {
        id: 4,
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        status: "Active"
      }
    ]
  })

  // Function to get the dates of the current week
  const getWeekDates = (date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) // Start from Sunday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  // Update week dates when selected week changes
  useEffect(() => {
    setWeekDates(getWeekDates(selectedWeek))
  }, [selectedWeek])

  // Function to navigate to previous/next week
  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek)
    newDate.setDate(selectedWeek.getDate() + (direction === 'next' ? 7 : -7))
    setSelectedWeek(newDate)
  }

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-[#1e293b] text-xl font-medium">Teachers</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2185d5] focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-sm text-gray-600 bg-white hover:bg-gray-50"
                  >
                    <ListFilter size={16} />
                    <span>{roleOptions.find(role => role.value === selectedRole)?.label || 'Filter by role'}</span>
                    <ChevronDown size={16} className={`transform transition-transform ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isFilterDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      {roleOptions.map((role) => (
                        <button
                          key={role.value}
                          onClick={() => {
                            setSelectedRole(role.value)
                            setIsFilterDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selectedRole === role.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                        >
                          {role.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAddNewClick}
                  className="px-4 py-2 bg-[#2185d5] text-white rounded-md text-sm font-medium"
                >
                  Add teacher
                </button>
              </div>
            </div>

            {/* Teachers Table */}
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
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{teacher.firstName}</td>
                      <td className="px-6 py-4 text-sm">{teacher.lastName}</td>
                      <td className="px-6 py-4 text-sm">{teacher.email}</td>
                      <td className="px-6 py-4 text-sm">{teacher.role}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleAttendanceClick(teacher)}
                          className="bg-[#2185d5] text-white text-sm py-2 px-4 rounded-md font-medium"
                        >
                          {teacher.buttonLabel}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleTimeTableClick(teacher)}
                            className="text-gray-500 hover:text-[#2185d5] bg-gray-100 p-2 rounded-md"
                          >
                            <Calendar size={18} />
                          </button>
                          <button
                            onClick={() => handleEditClick(teacher)}
                            className="text-gray-500 hover:text-[#2185d5] bg-gray-100 p-2 rounded-md"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTeachers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No teachers found matching your criteria
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Teacher Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[500px] h-[600px] rounded-lg relative">
            <div className="px-8 pt-10">
              <h2 className="text-black text-2xl font-poppins text-center">
                {modalMode === 'add' ? 'Create New Teacher Account' : 'Edit Teacher'}
              </h2>

              <div className="space-y-4 mt-[30px] ml-7 items-center justify-center">
                {/* First Name */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="text"
                    name="firstName"
                    value={newTeacher.firstName}
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
                    value={newTeacher.lastName}
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
                    value={newTeacher.email}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Enter teacher's email"
                  />
                </div>

                {/* Password */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D51A] rounded-lg flex items-center justify-center">
                  <input
                    type="password"
                    name="password"
                    value={newTeacher.password}
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
                    value={newTeacher.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent text-center text-[#2185D5] placeholder-[#2185D5] focus:placeholder-transparent outline-none px-4"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* Role */}
                <div className="w-[363.89px] h-[50px] bg-[#2185D5] rounded-lg relative flex items-center justify-between px-4">
                  <select
                    name="role"
                    value={newTeacher.role}
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
                  onClick={handleSaveTeacher}
                  className="w-[110px] h-[44px] rounded-[10px] bg-[#2185D5] text-white"
                >
                  {modalMode === 'add' ? 'Add Teacher' : 'Confirm'}
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
                Are you sure you want to delete this teacher?
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

      {/* Attendance History Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[600px] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#303841] mb-4">
              Attendance History - {selectedTeacher?.firstName} {selectedTeacher?.lastName}
            </h2>

            {/* Present Records */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-green-600 mb-3">Present</h3>
              <div className="space-y-2">
                {attendanceData.present.map((record, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{record.courseName}</span>
                      <div className="text-sm text-gray-600">
                        <span className="mr-4">{record.date}</span>
                        <span>{record.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Absent Records */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-red-600 mb-3">Absent</h3>
              <div className="space-y-2">
                {attendanceData.absent.map((record, index) => (
                  <div key={index} className="bg-red-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{record.courseName}</span>
                      <div className="text-sm text-gray-600">
                        <span className="mr-4">{record.date}</span>
                        <span>{record.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="px-4 py-2 bg-[#2185d5] text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Modal */}
      {isTimeTableModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[700px] rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#303841]">
                {showTimetable ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowTimetable(false)
                        setSelectedPeriod(null)
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ChevronDown className="transform rotate-90" size={20} />
                    </button>
                    <span>
                      Timetable - {selectedTeacher?.firstName} {selectedTeacher?.lastName}
                      <div className="text-sm font-normal text-gray-500">
                        Period: {new Date(selectedPeriod.startDate).toLocaleDateString()} - {new Date(selectedPeriod.endDate).toLocaleDateString()}
                      </div>
                    </span>
                  </div>
                ) : (
                  <span>Select Period - {selectedTeacher?.firstName} {selectedTeacher?.lastName}</span>
                )}
              </h2>
            </div>

            {!showTimetable ? (
              // Show periods list
              <div className="space-y-4 mb-6">
                {teacherPeriodsData[selectedTeacher?.id]?.map((period) => (
                  <div
                    key={period.id}
                    className="bg-white border rounded-lg p-4 hover:border-[#2185d5] cursor-pointer transition-colors"
                    onClick={() => handlePeriodSelect(period)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">ID: {period.id}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${period.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {period.status}
                      </span>
                    </div>
                  </div>
                ))}
                {(!teacherPeriodsData[selectedTeacher?.id] || teacherPeriodsData[selectedTeacher?.id].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No periods found for this teacher
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#D1FAE5]"></div>
                      <span className="text-sm">Cours ({teacherStats.cours})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#EDE9FE]"></div>
                      <span className="text-sm">TD ({teacherStats.td})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FFEDD5]"></div>
                      <span className="text-sm">TP ({teacherStats.tp})</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAddLectureModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2185d5] text-white px-4 py-2 rounded-lg"
                  >
                    <Plus size={20} />
                    <span>Add Lecture</span>
                  </button>
                </div>

                {/* Week Filter */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigateWeek('prev')}
                      className="p-1.5 hover:bg-gray-200 rounded-full"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm font-medium">
                        {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateWeek('next')}
                      className="p-1.5 hover:bg-gray-200 rounded-full"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mt-2">
                    {weekDates.map((date, index) => (
                      <div key={index} className="text-center">
                        <div className="text-[10px] text-gray-500">{days[index]}</div>
                        <div className="text-xs font-medium">{date.getDate()}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timetable Grid */}
                <div className="border rounded-lg overflow-x-auto max-h-[400px]">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white z-10">
                      <tr className="bg-gray-50">
                        <th className="py-1.5 px-2 border-b text-left font-medium text-gray-500 w-20">Time</th>
                        {weekDates.map((date, index) => (
                          <th key={index} className="py-1.5 px-2 border-b border-l text-left font-medium text-gray-500">
                            <div className="text-xs">{days[index]}</div>
                            <div className="text-[10px] font-normal">{formatDate(date)}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map(timeSlot => (
                        <tr key={timeSlot} className="border-b">
                          <td className="py-1.5 px-2 font-medium text-gray-500 bg-gray-50 w-20 text-xs">{timeSlot}</td>
                          {weekDates.map((date, index) => {
                            const lecture = timeTableData.find(
                              l => l.day === days[index] && l.time === timeSlot
                            )
                            return (
                              <td key={index} className="py-1.5 px-2 border-l relative min-h-[60px]">
                                {lecture && (
                                  <div className={`p-1.5 rounded ${getLectureColor(lecture.type)} h-full`}>
                                    <div className="flex flex-col h-full">
                                      <p className="font-medium text-gray-800 text-xs">{lecture.name}</p>
                                      <p className="text-[10px] text-gray-600">{lecture.type}</p>
                                    </div>
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

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setIsManageAbsenceModalOpen(true)}
                    className="px-3 py-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm"
                  >
                    Manage Absences
                  </button>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsTimeTableModalOpen(false)}
                      className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Close
                    </button>
                    {absentLectures.length > 0 && (
                      <button
                        onClick={() => setIsViewAbsencesModalOpen(true)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                      >
                        View Absences ({absentLectures.length})
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {!showTimetable && (
              <div className="flex justify-end">
                <button
                  onClick={() => setIsTimeTableModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Lecture Modal */}
      {isAddLectureModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[400px] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#303841] mb-4">Add New Lecture</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Module Name
                </label>
                <div className="space-y-2">
                  <select
                    value={newLecture.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === 'other') {
                        setNewLecture({ ...newLecture, name: '', isCustomName: true });
                      } else {
                        setNewLecture({ ...newLecture, name: value, isCustomName: false });
                      }
                    }}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                  >
                    <option value="">Select module</option>
                    <option value="Security">Security</option>
                    <option value="ACSI">ACSI</option>
                    <option value="GP">GP</option>
                    <option value="Architecture">Architecture</option>
                    <option value="System">System</option>
                    <option value="Reseau">Reseau</option>
                    <option value="other">Other</option>
                  </select>
                  {newLecture.isCustomName && (
                    <input
                      type="text"
                      value={newLecture.name}
                      onChange={(e) => setNewLecture({ ...newLecture, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                      placeholder="Enter module name"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newLecture.type}
                  onChange={(e) => setNewLecture({ ...newLecture, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                >
                  <option value="">Select type</option>
                  <option value="Cours">Cours</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  value={newLecture.day}
                  onChange={(e) => setNewLecture({ ...newLecture, day: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                >
                  <option value="">Select day</option>
                  {getAvailableDays(newLecture.time).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <select
                  value={newLecture.time}
                  onChange={(e) => setNewLecture({ ...newLecture, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                >
                  <option value="">Select time</option>
                  {getAvailableTimeSlots(newLecture.day).map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsAddLectureModalOpen(false)
                  setNewLecture({ name: "", type: "", day: "", time: "" })
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLecture}
                className="px-4 py-2 bg-[#2185d5] text-white rounded-md hover:bg-[#1a6cb7] transition-colors"
              >
                Add Lecture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Absences Modal */}
      {isManageAbsenceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[600px] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#303841] mb-4">Manage Absences</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {timeTableData.map((lecture, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${selectedAbsences.some(
                    l => l.name === lecture.name && l.day === lecture.day && l.time === lecture.time
                  )
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{lecture.name}</h3>
                      <p className="text-sm text-gray-600">
                        {lecture.day} - {lecture.time}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAbsenceToggle(lecture)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedAbsences.some(
                        l => l.name === lecture.name && l.day === lecture.day && l.time === lecture.time
                      )
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-300'
                        }`}
                    >
                      {selectedAbsences.some(
                        l => l.name === lecture.name && l.day === lecture.day && l.time === lecture.time
                      ) && <Check size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsManageAbsenceModalOpen(false)
                  setSelectedAbsences([])
                }}
                className="px-4 py-2 text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAbsences}
                className="px-4 py-2 bg-[#2185d5] text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Absences Modal */}
      {isViewAbsencesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[600px] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#303841] mb-4">Current Absences</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {absentLectures.map((lecture, index) => (
                <div key={index} className="p-4 rounded-lg border border-red-500 bg-red-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{lecture.name}</h3>
                      <p className="text-sm text-gray-600">
                        {lecture.day} - {lecture.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsViewAbsencesModalOpen(false)}
                className="px-4 py-2 text-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSendAbsences}
                className="px-4 py-2 bg-[#2185d5] text-white rounded-md"
              >
                Send to Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
