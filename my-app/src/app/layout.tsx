import React from 'react'
import { Navbar } from '@/components/layout';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import CartContextProvider from '@/contexts/cartContext';


interface layoutI{
  children:React.ReactNode;
}

export default function layout({children}:layoutI) {
  return (
    <html>
    <body>    
      <CartContextProvider>
      <Navbar></Navbar>
      {children}</CartContextProvider> 
          <Toaster
     position="top-right"
     reverseOrder={false}
      />
    </body>
    </html>
  )
}

