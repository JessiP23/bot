import './globals.css'

export const metadata = {
  title: 'Advanced Crypto Trader AI',
  description: 'AI-powered cryptocurrency trading platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  )
}