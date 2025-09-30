"use client"

import React, { useState, useContext } from 'react'
import { apiServices } from '@/services/apiServices'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from "next/link";
import CartComponent from './CartComponent'
import { GetLoggedUserCart } from '@/interfaces';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button'
import { ShoppingCart,Loader2} from 'lucide-react'
import { cartContext } from '@/contexts/cartContext'
import { useSession} from 'next-auth/react';





  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  interface InnerCartProps{
    res:GetLoggedUserCart
  }

export default function InnerCart({res}:InnerCartProps) {

    const [innerCartData,setInnerCartData] = useState<GetLoggedUserCart>(res);
    const [clearCart,setClearCart] = useState(false);
    const {setCartCount} = useContext(cartContext)!;
    const {data:session} = useSession();


    const handleRemoveProduct = async (productId:string,setLoading:(value:boolean)=>void) => {
        setLoading(true);
        try {
            await apiServices.removeCartComponent(productId,String(session?.accessToken));
            toast.success("Product removed from cart!");
        } catch (error) {
            console.error("Failed to remove product:", error);
            toast.error("Failed to remove product.");
        } finally {
            setLoading(false);
            const newCartRes=await apiServices.getLoggedUserCart(String(session?.accessToken));
            setInnerCartData(newCartRes);
            if(setCartCount)
            setCartCount(newCartRes.numOfCartItems);
        }
   
    };

      const handleClearCart = async () => {
        try {
            await apiServices.clearCart(String(session?.accessToken));
            toast.success("Cart Cleared!");
            setClearCart(true);
        } catch (error) {
            console.error("Failed to clear cart", error);
            toast.error("Failed to clear cart");
        } finally {
            setClearCart(false);
            const newCartRes=await apiServices.getLoggedUserCart(String(session?.accessToken));
            setInnerCartData(newCartRes);
            if(setCartCount)
            setCartCount(0);
            
        }
   
    };

     if (!innerCartData ) {
      return (
     <div className="mb-52 mx-auto px-4 py-8 text-center ">
          <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty.</h1>
          <p className="text-muted-foreground">Looks like you have not added anything to your cart yet.</p>
          <Link className="mt-6" href={"/"}>Continue Shopping</Link>
        </div>
      );
    }


   const handleUpdateQuantity = async (productId: string, count: number) => {
        try {
            await apiServices.updateCartQuantity(productId, count,String(session?.accessToken));
            toast.success("Cart updated!");
        } catch (error) {
            console.error("Failed to update quantity:", error);
            toast.error("Failed to update quantity.");
        } finally {
            const newCartRes = await apiServices.getLoggedUserCart(String(session?.accessToken));
            setInnerCartData(newCartRes);
            if(setCartCount)
            setCartCount(newCartRes.numOfCartItems);

        }
    };





return (
    <div>
        {innerCartData.data.products.length === 0 ? (
            <div className="container mx-auto px-4 py-8 text-center">
                <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Your cart is empty.</h1>
                <p className="text-muted-foreground">Looks like you have not added anything to your cart yet.</p>
                <Link className="mt-6" href={"/"}>Continue Shopping</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items Section */}
                <div className="lg:col-span-2 space-y-4">
                    {innerCartData.data.products.map((cartItem) => (
                        <CartComponent key={cartItem.product._id} cartItem={cartItem} handleRemoveProduct={handleRemoveProduct} handleUpdateQuantity={handleUpdateQuantity}></CartComponent>
                    ))}
                </div>
                {/* Order Summary Section */}
                <div className="lg:col-span-1">
                    <Card className="p-6">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="flex justify-between items-center text-lg font-medium">
                                <span>Items:</span>
                                <span>{innerCartData.numOfCartItems}</span>
                            </div>
                            <div className="flex justify-between items-center text-2xl font-bold">
                                <span>Total:</span>
                                <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                            </div>
                        </CardContent>
                        <div className="mt-6 flex flex-col gap-2">
                            <Button className="w-full rounded-3xl" asChild>
                                <Link href={"/addAddress"}>Proceed to Checkout</Link>
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full rounded-3xl" 
                                onClick={handleClearCart}
                                disabled={clearCart}
                            >
                                {clearCart ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Clear Cart"}
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        )}
    </div>
);
}
