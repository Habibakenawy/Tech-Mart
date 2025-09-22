"use client"

import React, { useState } from 'react'
import { apiServices } from '@/services/apiServices'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from "next/link";
import CartComponent from './CartComponent'
import { GetLoggedUserCart } from '@/interfaces';
import { toast } from 'react-hot-toast';



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
    const handleRemoveProduct = async (productId:string,setLoading:(value:boolean)=>void) => {
        setLoading(true);
        try {
            await apiServices.removeCartComponent(productId);
            toast.success("Product removed from cart!");
        } catch (error) {
            console.error("Failed to remove product:", error);
            toast.error("Failed to remove product.");
        } finally {
            setLoading(false);
            const newCartRes=await apiServices.getLoggedUserCart();
            setInnerCartData(newCartRes);
        }
   
    };

  return (
    <div> <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {innerCartData.data.products.map((cartItem) => (
          <CartComponent key={cartItem.product._id} cartItem={cartItem} handleRemoveProduct={handleRemoveProduct}></CartComponent>
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
            <div className="mt-6 flex justify-center">
              <Link className="w-full bg-black text-white text-center rounded-3xl border-2 border-amber-50" href={"/"}>Proceed to Checkout</Link>
            </div>
          </Card>
        </div>
      </div></div>
  )
}
