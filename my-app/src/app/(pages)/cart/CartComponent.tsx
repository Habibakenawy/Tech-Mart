"use client"

import React, { useContext, useState } from 'react'
import { Card} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { cartContext } from '@/contexts/cartContext'






export default function CartComponent({cartItem,handleRemoveProduct,handleUpdateQuantity}) {
    const [Loading,setLoading] = useState(false);
    const [count,setCount]=useState(cartItem.count);
    const [timeOutId,setTimeOutId] = useState<NodeJS.Timeout>();

    const {setCartCount} = useContext(cartContext)
    
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  async function  handleUpdateQuantityNumber(counter:number){
  setCount(counter);
  clearTimeout(timeOutId);
  const id=setTimeout(()=>{
    handleUpdateQuantity(cartItem.product._id,counter);
    setCartCount(counter);
  },500);
  setTimeOutId(id);
  }




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
               <Button variant="outline" size="icon" onClick={() =>  handleUpdateQuantityNumber(count-1)} disabled={cartItem.count <= 1}>
                 <Minus className="h-4 w-4" />
                </Button>
      
                <span className="font-medium text-lg w-8 text-center">{count}</span>
            <Button variant="outline" size="icon" onClick={() =>  handleUpdateQuantityNumber(count+1)} disabled={cartItem.count== cartItem.product.quantity}>
                  <Plus className="h-4 w-4" />
                </Button>
         
                <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(cartItem.product._id,setLoading)}>
                  {Loading?(<Loader2  className="h-4 w-4 animate-spin"/>) :<Trash2 className="h-5 w-5 text-destructive" />}
                </Button>
            
              </div>
            </Card></>
  )
}
