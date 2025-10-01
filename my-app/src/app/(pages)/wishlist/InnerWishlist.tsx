"use client";

import React, { useState, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Heart, ShoppingCart, Loader2, Trash2 } from "lucide-react";
import { GetLoggedUserWishlistResponse, ProductI } from "@/interfaces";
import { apiServices } from "@/services/apiServices";
import { useSession } from "next-auth/react";
import { cartContext } from "@/contexts/cartContext";
import { WishlistContext } from "@/contexts/wishListContext";

interface InnerWishlistProps {
  res: GetLoggedUserWishlistResponse;
}

export default function InnerWishlist({ res }: InnerWishlistProps) {
  const [wishlistData, setWishlistData] = useState<GetLoggedUserWishlistResponse>(res);
  const { data: session } = useSession();
  const { setCartCount } = useContext(cartContext)!;
  const wishlistCtx = useContext(WishlistContext);
  const [loadingRemove, setLoadingRemove] = useState<string | null>(null);
  const [loading,setLoading]  = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    setLoadingRemove(productId);
    try {
      await apiServices.removeWishlist(productId, String(session?.accessToken));
      toast.success("Removed from wishlist ❤️‍🔥");
setWishlistData((prev) => {
  const updatedData = prev.data.filter((item) => item._id !== productId);
  wishlistCtx?.setWishlistCount(updatedData.length);
  return { ...prev, data: updatedData };
});
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setLoadingRemove(null);
    }
  };

  const handleAddToCart = async (productId: string) => {
    setLoading(productId);
    try {
      await apiServices.addToCart(productId, String(session?.accessToken));
      toast.success("Added to cart 🛒");
      const newCart = await apiServices.getLoggedUserCart(
        String(session?.accessToken)
      );
      if (setCartCount) setCartCount(newCart.numOfCartItems);
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setLoading(null);
    }
  };

  if (!wishlistData.data || wishlistData.data.length === 0) {
    return (
       <div className="container mx-auto px-4 py-8 text-center h-[70vh]">
        <Heart className="h-20 w-20 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty.</h1>
        <p className="text-muted-foreground">
          Looks like you haven’t saved any products yet.
        </p>
        <Link className="mt-6 inline-block text-blue-600 hover:underline" href="/">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistData.data.map((product: ProductI) => (
        <Card
          key={product._id}
          className="flex flex-col overflow-hidden hover:shadow-lg transition"
        >
          <Link href={`/products/${product._id}`}>
            <div className="relative w-full h-56">
              <Image
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <CardContent className="p-4 flex flex-col gap-2">
            <h2 className="font-bold text-lg line-clamp-2">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.category?.name}</p>
            <p className="text-xl font-semibold">${product.price}</p>

            <div className="flex gap-2 mt-2">
              {/* Add to Cart */}
              <Button
                className="flex-1"
                onClick={() => handleAddToCart(product._id)}
                disabled={loading === product._id}
              >
                {loading === product._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                Add to Cart
              </Button>

              {/* Remove from Wishlist */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemove(product._id)}
                disabled={loading === product._id}
              >
                {loadingRemove === product._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 text-red-500" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
