import React from 'react'
import { apiServices } from '@/services/apiServices'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, Loader2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link";
import CartComponent from './CartComponent'
import InnerCart from './InnerCart'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Cart() {


  async function getCart() {
 const session = await getServerSession(authOptions);
  const data = await apiServices.getLoggedUserCart(String(session?.accessToken));
  return data;
 
  }
  const res= await getCart();

  console.log("Cart API response:", res);
  if (!res || res.data.products.length===0 ) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty.</h1>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Link className="mt-6"  href={"/"}>Continue Shopping</Link>
      </div>
    );
  }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {res.data.products.map((cartItem) => (
          <CartComponent key={cartItem.product._id} cartItem={cartItem}></CartComponent>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex justify-between items-center text-lg font-medium">
                <span>Items:</span>
                <span>{res.numOfCartItems}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span>{formatPrice(res.data.totalCartPrice)}</span>
              </div>
            </CardContent>
            <div className="mt-6 flex justify-center">
              <Link className="w-full bg-black text-white text-center rounded-3xl border-2 border-amber-50" href={"/"}>Proceed to Checkout</Link>
            </div>
          </Card>
        </div>
      </div> */}
      <InnerCart res={res}></InnerCart>
      
    </div>
  );
}
