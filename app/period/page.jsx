"use client"
import { useState } from 'react'
import { Clock, History } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function PeriodPage() {
    const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false)
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [periodDates, setPeriodDates] = useState({ start: "", end: "" })

    // Sample users data (replace with actual data from your database)
    const users = [
        { id: 1, name: "John Doe", role: "Professor" },
        { id: 2, name: "Jane Smith", role: "MCA" },
        { id: 3, name: "Mike Johnson", role: "MCB" },
    ]

    // Sample period history (replace with actual data from your database)
    const periodHistory = [
        { id: 1, userId: 1, startDate: "2024-01-01", endDate: "2024-03-31", status: "Completed" },
        { id: 2, userId: 1, startDate: "2024-04-01", endDate: "2024-06-30", status: "Active" },
    ]

    const handlePeriodSubmit = async (e) => {
        e.preventDefault()
        // Here you would make your API call to the database
        // Example:
        // await fetch('/api/periods', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         userId: selectedUser.id,
        //         startDate: periodDates.start,
        //         endDate: periodDates.end,
        //     }),
        // })
        setIsPeriodModalOpen(false)
        setPeriodDates({ start: "", end: "" })
        setSelectedUser(null)
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl font-bold text-[#303841] mb-8">Welcome to Period Management System</h1>

                        {/* Users Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => (
                                <div key={user.id} className="bg-white rounded-xl border border-[#e5e7eb] p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-[#303841]">{user.name}</h3>
                                            <p className="text-sm text-[#64748b]">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setIsPeriodModalOpen(true)
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-lg hover:bg-[#1a6cb6] transition-colors"
                                        >
                                            <Clock size={18} />
                                            <span>Set Period</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setIsHistoryModalOpen(true)
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#f59e0b] text-white rounded-lg hover:bg-[#d97706] transition-colors"
                                        >
                                            <History size={18} />
                                            <span>History</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Period Modal */}
                        {isPeriodModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-[400px]">
                                    <h2 className="text-xl font-bold text-[#303841] mb-4">Set Period</h2>
                                    <p className="text-sm text-[#64748b] mb-4">Setting period for {selectedUser?.name}</p>
                                    <form onSubmit={handlePeriodSubmit}>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    Start Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={periodDates.start}
                                                    onChange={(e) => setPeriodDates({ ...periodDates, start: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#6b7280] mb-1">
                                                    End Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={periodDates.end}
                                                    onChange={(e) => setPeriodDates({ ...periodDates, end: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2185d5]"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsPeriodModalOpen(false)
                                                    setPeriodDates({ start: "", end: "" })
                                                }}
                                                className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#2185d5] text-white rounded-md hover:bg-[#1a6cb6]"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* History Modal */}
                        {isHistoryModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-[500px]">
                                    <h2 className="text-xl font-bold text-[#303841] mb-4">Period History</h2>
                                    <p className="text-sm text-[#64748b] mb-4">History for {selectedUser?.name}</p>
                                    <div className="space-y-3">
                                        {periodHistory
                                            .filter(history => history.userId === selectedUser?.id)
                                            .map(history => (
                                                <div key={history.id} className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-[#303841]">
                                                                {new Date(history.startDate).toLocaleDateString()} - {new Date(history.endDate).toLocaleDateString()}
                                                            </p>
                                                            <p className="text-xs text-[#64748b]">ID: {history.id}</p>
                                                        </div>
                                                        <span className={`text-xs px-2 py-1 rounded ${history.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {history.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="flex justify-end mt-6">
                                        <button
                                            onClick={() => {
                                                setIsHistoryModalOpen(false)
                                                setSelectedUser(null)
                                            }}
                                            className="px-4 py-2 text-gray-500 hover:text-gray-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
} 