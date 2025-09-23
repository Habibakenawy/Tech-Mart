"use client"
import CartContextProvider from '@/contexts/cartContext';
import { store } from '@/redux/store';
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux';


export default function ProviderContainer({children}:{children:ReactNode;}) {
  return (
<Provider store={store}>
<CartContextProvider>{children}</CartContextProvider>
</Provider>
  )
}
