import './globals.css'

export const metadata = {
  title: 'Autonomous Financial Advisor & Trading Bot',
  description: 'AI-powered financial analysis and trading platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}