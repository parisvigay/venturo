import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar/NavBar'
import Providers from '@/components/Providers/Providers'
import Footer from '@/components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Venturo',
  description: 'Venturo travel blogging platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div >
            <NavBar/> 
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

require('dotenv').config();