"use client"
import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, Eye } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export default function PaymentPage() {
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)

    // Sample data - replace with actual data from your database
    const teachers = [
        {
            id: 1,
            firstName: "Fetitah",
            lastName: "Rachida",
            type: "etablissement",
            paymentMethod: "CCP",
            accountNumber: "123456789",
            periods: [
                {
                    id: 1,
                    startDate: "2024-01-01",
                    endDate: "2024-03-31",
                    isPaid: true,
                    totalHours: 48,
                    hourlyRate: 2000,
                    igrValue: 350,
                    ssValue: 150,
                    totalPaid: 45500
                },
                {
                    id: 2,
                    startDate: "2024-04-01",
                    endDate: "2024-06-30",
                    isPaid: false,
                    totalHours: 52,
                    hourlyRate: 2000,
                    igrValue: 380,
                    ssValue: 160,
                    totalPaid: 49460
                }
            ]
        },
        // Add more teachers...
    ]

    const calculateTotalAmount = (period) => {
        const grossAmount = period.totalHours * period.hourlyRate
        return grossAmount - period.igrValue - period.ssValue
    }

    const exportToExcel = (teacherData) => {
        const workbook = XLSX.utils.book_new()

        // Teacher Info Sheet
        const teacherInfo = [
            ['Teacher Information'],
            ['Name', `${teacherData.firstName} ${teacherData.lastName}`],
            ['Type', teacherData.type],
            ['Payment Method', teacherData.paymentMethod],
            ['Account Number', teacherData.accountNumber],
            [''],
            ['Payment History'],
            ['Period Start', 'Period End', 'Total Hours', 'Hourly Rate', 'IGR', 'SS', 'Total Paid', 'Status']
        ]

        teacherData.periods.forEach(period => {
            teacherInfo.push([
                period.startDate,
                period.endDate,
                period.totalHours,
                period.hourlyRate,
                period.igrValue,
                period.ssValue,
                period.totalPaid,
                period.isPaid ? 'Paid' : 'Pending'
            ])
        })

        const ws = XLSX.utils.aoa_to_sheet(teacherInfo)
        XLSX.utils.book_append_sheet(workbook, ws, 'Payment Details')

        // Save the file
        XLSX.writeFile(workbook, `payment_details_${teacherData.firstName}_${teacherData.lastName}.xlsx`)
    }

    const exportToPDF = (teacherData) => {
        const doc = new jsPDF()

        doc.setFontSize(16)
        doc.text('Teacher Payment Details', 14, 15)

        doc.setFontSize(12)
        doc.text(`Name: ${teacherData.firstName} ${teacherData.lastName}`, 14, 25)
        doc.text(`Type: ${teacherData.type}`, 14, 32)
        doc.text(`Payment Method: ${teacherData.paymentMethod}`, 14, 39)
        doc.text(`Account Number: ${teacherData.accountNumber}`, 14, 46)

        const tableData = teacherData.periods.map(period => [
            period.startDate,
            period.endDate,
            period.totalHours,
            period.hourlyRate,
            period.igrValue,
            period.ssValue,
            period.totalPaid,
            period.isPaid ? 'Paid' : 'Pending'
        ])

        doc.autoTable({
            startY: 55,
            head: [['Start Date', 'End Date', 'Hours', 'Rate', 'IGR', 'SS', 'Total', 'Status']],
            body: tableData,
        })

        doc.save(`payment_details_${teacherData.firstName}_${teacherData.lastName}.pdf`)
    }

    return (
        <div className="flex h-screen bg-[#f8f9fa]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8f9fa] p-8">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl font-bold text-[#303841] mb-8">Payment Management</h1>

                        {/* Teachers List */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Period</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {teachers.map((teacher) => {
                                        const currentPeriod = teacher.periods[teacher.periods.length - 1]
                                        return (
                                            <tr key={teacher.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {teacher.firstName} {teacher.lastName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 capitalize">
                                                        {teacher.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {teacher.paymentMethod}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {currentPeriod.startDate} - {currentPeriod.endDate}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${currentPeriod.isPaid
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {currentPeriod.isPaid ? 'Paid' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedTeacher(teacher)
                                                                setShowDetailsModal(true)
                                                            }}
                                                            className="text-[#2185d5] hover:text-[#1a6cb7]"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => exportToExcel(teacher)}
                                                            className="text-green-600 hover:text-green-700"
                                                        >
                                                            <FileSpreadsheet size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => exportToPDF(teacher)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <FileText size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Payment Details Modal */}
            {showDetailsModal && selectedTeacher && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[800px] rounded-lg p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-[#303841]">
                                    Payment Details - {selectedTeacher.firstName} {selectedTeacher.lastName}
                                </h2>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm text-gray-600">
                                        Type: <span className="font-medium capitalize">{selectedTeacher.type}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Payment Method: <span className="font-medium">{selectedTeacher.paymentMethod}</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Account Number: <span className="font-medium">{selectedTeacher.accountNumber}</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-[#303841] mb-4">Payment History</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Period</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Hours</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Rate</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">IGR</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">SS</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedTeacher.periods.map((period) => (
                                            <tr key={period.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm">
                                                    {period.startDate} - {period.endDate}
                                                </td>
                                                <td className="px-4 py-3 text-sm">{period.totalHours}</td>
                                                <td className="px-4 py-3 text-sm">{period.hourlyRate}</td>
                                                <td className="px-4 py-3 text-sm">{period.igrValue}</td>
                                                <td className="px-4 py-3 text-sm">{period.ssValue}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{period.totalPaid}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${period.isPaid
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {period.isPaid ? 'Paid' : 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={() => exportToExcel(selectedTeacher)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                            >
                                <FileSpreadsheet size={16} />
                                Export to Excel
                            </button>
                            <button
                                onClick={() => exportToPDF(selectedTeacher)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                            >
                                <FileText size={16} />
                                Export to PDF
                            </button>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 