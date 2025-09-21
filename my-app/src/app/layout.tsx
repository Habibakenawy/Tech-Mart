import React from 'react'
import { Navbar } from '@/components/layout';
import "./globals.css";
import { Toaster } from 'react-hot-toast';


interface layoutI{
  children:React.ReactNode;
}

export default function layout({children}:layoutI) {
  return (
    <html>
    <body>     
      <Navbar></Navbar>
      <Toaster
     position="top-right"
     reverseOrder={false}
      />
      {children}
    </body>
    </html>
  )
}

