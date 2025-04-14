import React from 'react'
import Navbar from '@/app/components/Navbar'

import "@/app/globals.css";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar/>
      <main className="font-work-sans">
        
        { children }
      </main>
    </>
  )
}