import './globals.css'

export const metadata = {
  title: 'AlgoTrader AI',
  description: 'AI-powered algorithmic trading platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}