import React from 'react'
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";



interface addToCartProps{
    productQuantity:number;
    loadingCart:boolean;
    handleAddtoCart:()=>void;
}

export default function AddToCart({productQuantity,loadingCart,handleAddtoCart}:addToCartProps) {
  
  return (
    <>
        <Button
              size="lg"
              className="flex-1"
              disabled={productQuantity===0||loadingCart}
              onClick={handleAddtoCart}
            >
              {loadingCart&&<Loader2 className="animate-spin"/>}
              <ShoppingCart className="h-5 w-5 mr-2"  />
              Add to Cart
            </Button>
            </>
  )
}
