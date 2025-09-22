"use client";
import { apiServices } from '@/services/apiServices';
import { createContext, ReactNode, useEffect, useState } from 'react';

// Define the type for the cart context
interface CartContextType {
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create the context with a default value
export const cartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
    children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
    // Initialize the cart count state
    const [cartCount, setCartCount] = useState(0);
    async function getCart(){
        const response = await apiServices.getLoggedUserCart();
        setCartCount(response.numOfCartItems);
    }
useEffect(()=>{
    getCart();
},[]);
    return (
        <cartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </cartContext.Provider>
    );
}
