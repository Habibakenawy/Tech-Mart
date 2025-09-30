"use client"
import CartContextProvider from '@/contexts/cartContext';
import WishlistContextProvider from "@/contexts/wishListContext"; 
import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux';


export default function ProviderContainer({children}:{children:ReactNode;}) {
  return (
<SessionProvider>
<Provider store={store}>
<WishlistContextProvider>
<CartContextProvider>{children}</CartContextProvider>
</WishlistContextProvider>
</Provider>
</SessionProvider>
  )
}
