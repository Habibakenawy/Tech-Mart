import React from 'react'
import { Navbar } from '@/components/layout';
import "./globals.css";


interface layoutI{
  children:React.ReactNode;
}

export default function layout({children}:layoutI) {
  return (
    <html>
    <body>     
      <Navbar></Navbar>
      {children}
    </body>
    </html>
  )
}

