"use client"

export default function Header() {
    return (
        <header className="bg-white p-6 flex justify-between items-center">
            <div>
                <h2 className="text-[#64748b] text-lg">Hi admin</h2>
                <h1 className="text-[#1e293b] text-2xl font-bold">Welcome!</h1>
            </div>
            <div className="flex items-center gap-6">
                {/* Empty div to maintain layout */}
            </div>
        </header>
    )
} 