import React from 'react'
import Navbar from '@/components/Navbar'

import "@/app/globals.css";
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar/>
      <main className="font-work-sans">
        
        { children }
        <Toaster />
      </main>
    </>
  )
}