import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Upcoming Holidays - ESI Store',
    description: 'View upcoming holidays and schedule',
}

export default function HolidaysLayout({ children }) {
    return children
} 