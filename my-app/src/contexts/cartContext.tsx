"use client";
import { apiServices } from '@/services/apiServices';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Define the type for the cart context
interface CartContextType {
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
    handleAddtoCart: (productId: string) => Promise<void>;
    cartId:string
}

// Create the context with a default value
export const cartContext = createContext<CartContextType | null>(null);

interface CartContextProviderProps {
    children: ReactNode;
}

export default function CartContextProvider({ children }: CartContextProviderProps) {
    // Initialize the cart count state
    const [cartCount, setCartCount] = useState(0);
    const [loadingCart,setLoadingCart] = useState(false);
    const [cartId,setCartId] = useState("");
async function getCart() {
  const response = await apiServices.getLoggedUserCart();
  setCartCount(response.numOfCartItems);

  if (response.cartId) {
    setCartId(response.cartId);  
  } else if (response.data && response.data._id) {
    setCartId(response.data._id); 
  }
}

useEffect(()=>{
    getCart();
},[]);


  async function handleAddtoCart(productId:string){
    setLoadingCart(true);
    const data=await apiServices.addToCart(productId);
    console.log(data.message);
    toast.success(data.message);
    setCartCount(data.numOfCartItems);
    setLoadingCart(false)
  }
    return (
        <cartContext.Provider value={{ cartCount, setCartCount,handleAddtoCart,cartId}}>
            {children}
        </cartContext.Provider>
    );
}
