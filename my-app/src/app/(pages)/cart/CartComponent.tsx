"use client"

import React, { useState } from 'react'
import { apiServices } from '@/services/apiServices'
import { Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react'
import Image from 'next/image'





export default function CartComponent({cartItem,handleRemoveProduct}) {
    const [Loading,setLoading] = useState(false);
    
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
// const handleRemoveProduct = async () => {
//         setLoading(true);
//         try {
//             await apiServices.removeCartComponent(cartItem.product._id);
//             toast.success("Product removed from cart!");
//         } catch (error) {
//             console.error("Failed to remove product:", error);
//             toast.error("Failed to remove product.");
//         } finally {
//             setLoading(false);
//         }
//     };
    const handleUpdateQuantity = (productId: string, count: number) => {

    console.log(`Updating quantity for product ${productId} to ${count}`);
  };


  return (
    <> <Card key={cartItem?.product?._id} className="flex flex-col md:flex-row items-center p-4">
              <div className="relative flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border">
                <Image
                  src={cartItem?.product?.imageCover}
                  alt={cartItem?.product?.title}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              <div className="flex-grow p-4">
                <h2 className="text-lg font-bold">{cartItem?.product?.title}</h2>
                <p className="text-sm text-muted-foreground">{cartItem?.product?.category?.name}</p>
                <p className="text-xl font-semibold mt-2">{formatPrice(cartItem?.price)}</p>
              </div>
              <div className="flex items-center gap-2 mt-4 md:mt-0 flex-shrink-0">
                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem.product._id, cartItem.count - 1)} disabled={cartItem.count <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                  {/* <Button variant="outline" size="icon" >
                  <Minus className="h-4 w-4" />
                </Button> */}
                <span className="font-medium text-lg w-8 text-center">{cartItem?.count}</span>
                <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(cartItem.product._id, cartItem.count + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                   {/* <Button variant="outline" size="icon" >
                  <Plus className="h-4 w-4" />
                </Button> */}
                <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(cartItem.product._id,setLoading)}>
                  {Loading?(<Loader2/>) :<Trash2 className="h-5 w-5 text-destructive" />}
                </Button>
                    {/* <Button variant="ghost" size="icon">
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button> */}
              </div>
            </Card></>
  )
}
