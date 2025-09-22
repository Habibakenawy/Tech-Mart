import React from 'react'
import { apiServices } from '@/services/apiServices'
import { CartProductI, CartDataI } from '@/interfaces/cart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, Loader2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link";

export default async function Cart() {


  async function getCart() {

  const data = await apiServices.getLoggedUserCart();
  return data;
 
  }
  const res= await getCart();



  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleRemoveProduct = (productId: string) => {

    console.log(`Removing product with ID: ${productId}`);
  };

  const handleUpdateQuantity = (productId: string, count: number) => {

    console.log(`Updating quantity for product ${productId} to ${count}`);
  };

  
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-4">
          {res.data.products.map((cartItem) => (
            <Card key={cartItem.product._id} className="flex flex-col md:flex-row items-center p-4">
              <div className="relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border">
                <Image
                  src={cartItem.product.imageCover}
                  alt={cartItem.product.title}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="flex-grow p-4">
                <h2 className="text-lg font-bold">{cartItem.product.title}</h2>
                <p className="text-sm text-muted-foreground">{cartItem.product.category.name}</p>
                <p className="text-xl font-semibold mt-2">{formatPrice(cartItem.price)}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                {/* <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem.product._id, cartItem.count - 1)} disabled={cartItem.count <= 1}>
                  <Minus className="h-4 w-4" />
                </Button> */}
                  <Button variant="outline" size="icon" >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium text-lg w-8 text-center">{cartItem.count}</span>
                {/* <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem.product._id, cartItem.count + 1)}>
                  <Plus className="h-4 w-4" />
                </Button> */}
                   <Button variant="outline" size="icon" >
                  <Plus className="h-4 w-4" />
                </Button>
                {/* <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(cartItem.product._id)}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button> */}
                    <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </Card>
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
      </div>
    </div>
  );
}
