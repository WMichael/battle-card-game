import './globals.css'
import './layout.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Battle | The card game',
  description: 'A card game made in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Battle</h1>
          <h2>The card game</h2>
        </header>

        {children}</body>
    </html>
  )
}
