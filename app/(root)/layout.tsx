import React from 'react'
import Navbar from '../components/Navbar'

import "../globals.css";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body>
        <Navbar/>
        <main className="font-work-sans">
          
          { children }
        </main>
      </body>
    </html>
    
  )
}