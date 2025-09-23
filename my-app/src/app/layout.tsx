import React from 'react'
import { Navbar } from '@/components/layout';
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import ProviderContainer from '@/components/ProviderContainer';


interface layoutI{
  children:React.ReactNode;
}

export default function layout({children}:layoutI) {
  return (
    <html>
    <body>    
     <ProviderContainer>
      <Navbar></Navbar>
      {children}
      </ProviderContainer>
          <Toaster
     position="top-right"
     reverseOrder={false}
      />
    </body>
    </html>
  )
}

