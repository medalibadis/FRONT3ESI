import "./globals.css"
import { Poppins } from "next/font/google"

// Initialize the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  title: "ESI-STORE | Inventory Management",
  description: "Inventory management system for ESI-STORE",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins">{children}</body>
    </html>
  )
}
