"use client"
import { Calendar, CalendarDays, Plus } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

const initialHolidays = [
    {
        id: 1,
        name: "New Year's Day",
        date: "January 1, 2025",
        duration: "1 Day",
        type: "Single Day",
        color: "bg-[#28b473]",
    },
    {
        id: 2,
        name: "Eid al-Fitr",
        date: "April 10-12, 2025",
        duration: "3 Days",
        type: "Multi-day",
        color: "bg-[#8e60e6]",
    },
    {
        id: 3,
        name: "Labour Day",
        date: "May 1, 2025",
        duration: "1 Day",
        type: "Single Day",
        color: "bg-[#f2994a]",
    },
    {
        id: 4,
        name: "Christmas Holiday",
        date: "December 24-26, 2025",
        duration: "3 Days",
        type: "Multi-day",
        color: "bg-[#2d9cdb]",
    },
]

export default function UpcomingHolidays() {
    const [holidays, setHolidays] = useState(initialHolidays)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newHoliday, setNewHoliday] = useState({
        name: "",
        date: "",
        duration: "",
        type: "Single Day",
    })

    const handleAddHoliday = (e) => {
        e.preventDefault()
        const colors = ["bg-[#28b473]", "bg-[#8e60e6]", "bg-[#f2994a]", "bg-[#2d9cdb]"]
        const newId = holidays.length + 1
        const newHolidayWithId = {
            ...newHoliday,
            id: newId,
            color: colors[Math.floor(Math.random() * colors.length)]
        }
        setHolidays([...holidays, newHolidayWithId])
        setNewHoliday({
            name: "",
            date: "",
            duration: "",
            type: "Single Day",
        })
        setIsAddModalOpen(false)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Header with Add Button */}
                        <div className="flex items-center justify-between gap-3 mb-8">
                            <div className="flex items-center gap-3">
                                <CalendarDays className="w-6 h-6 text-[#28b473]" />
                                <h1 className="text-2xl font-bold text-[#303841]">Upcoming Holidays</h1>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-lg hover:bg-[#1a6cb6] transition-colors"
                            >
                                <Plus size={20} />
                                <span>Add Holiday</span>
                            </button>
                        </div>

                        {/* Holidays List */}
                        <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
                            <div className="divide-y divide-[#e5e7eb]">
                                {holidays.map((holiday, index) => (
                                    <div
                                        key={holiday.id}
                                        className={`flex items-center justify-between p-6 ${index % 2 === 0 ? "bg-[#f4f7fe]" : "bg-white"}`}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-[#303841] mb-2">{holiday.name}</h3>
                                            <div className="flex items-center gap-2 text-[#6b7280]">
                                                <Calendar className="w-4 h-4" />
                                                <span>{holiday.date}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-block px-2 py-1 rounded-full ${holiday.color} text-white text-sm font-medium mb-2`}>
                                                {holiday.duration}
                                            </div>
                                            <div>
                                                <p className="text-sm text-[#9ca3af]">{holiday.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="mt-8 bg-white rounded-xl border border-[#e5e7eb] shadow-sm p-6">
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <p className="text-3xl font-bold text-[#303841] mb-1">{holidays.length}</p>
                                    <p className="text-sm text-[#888888]">Total Holidays</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-[#28b473] mb-1">
                                        {holidays.filter((h) => h.type === "Single Day").length}
                                    </p>
                                    <p className="text-sm text-[#888888]">Single Day</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-[#8e60e6] mb-1">
                                        {holidays.filter((h) => h.type === "Multi-day").length}
                                    </p>
                                    <p className="text-sm text-[#888888]">Multi-day</p>
                                </div>
                            </div>
                        </div>

                        {/* Add Holiday Modal */}
                        {isAddModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white rounded-lg p-6 w-[500px]">
                                    <h2 className="text-xl font-bold text-[#303841] mb-4">Add New Holiday</h2>
                                    <form onSubmit={handleAddHoliday}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    Holiday Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newHoliday.name}
                                                    onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    Date
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newHoliday.date}
                                                    onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                                                    placeholder="e.g., January 1, 2025 or January 1-3, 2025"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    Duration
                                                </label>
                                                <input
                                                    type="text"
                                                    value={newHoliday.duration}
                                                    onChange={(e) => setNewHoliday({ ...newHoliday, duration: e.target.value })}
                                                    placeholder="e.g., 1 Day or 3 Days"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    Type
                                                </label>
                                                <select
                                                    value={newHoliday.type}
                                                    onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                >
                                                    <option value="Single Day">Single Day</option>
                                                    <option value="Multi-day">Multi-day</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => setIsAddModalOpen(false)}
                                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#2185d5] text-white rounded-md hover:bg-[#1a6cb6]"
                                            >
                                                Add Holiday
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
} 