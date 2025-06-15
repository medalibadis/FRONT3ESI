/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
            },
            colors: {
                'story-orange': '#ff8c42',
                'story-orange-dark': '#ff6b35',
                'card-yellow': '#fbbf24',
                'card-orange': '#f97316',
                'card-red': '#ef4444',
                'card-green': '#10b981',
                'card-blue': '#3b82f6',
                'card-purple': '#8b5cf6',
            }
        },
    },
    plugins: [],
} 