"use client";
import { apiServices } from "@/services/apiServices";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ProductI } from "@/interfaces";


export interface WishlistContextType {
  wishlist: ProductI[] | undefined;
  loadingWishlist: boolean;
  getWishlist: () => Promise<void>;
  handleAddtoWishlist: (productId: string) => Promise<void>;
  handleRemoveFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  setWishlist: React.Dispatch<React.SetStateAction<ProductI[] | undefined>>;
  count:number;
  setWishlistCount:  React.Dispatch<React.SetStateAction<number>>;
}


export const WishlistContext = createContext<WishlistContextType | null>(null);

interface WishlistContextProviderProps {
  children: ReactNode;
}

export default function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<ProductI[]>();
  const [count, setWishlistCount] = useState(0);
  const { data: session } = useSession();


  async function getWishlist() {
    if (!session?.accessToken) return;
    try {
      setLoadingWishlist(true);
      const res = await apiServices.getLoggedUserWishlist(
        String(session.accessToken)
      );
      if (res.status === "success") {
        setWishlist(res.data);
        setWishlistCount(res.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoadingWishlist(false);
    }
  }

  useEffect(() => {
    if (session?.accessToken) {
      getWishlist();
    }
  }, [session]);

  async function handleAddtoWishlist(productId: string) {
    if (!session?.accessToken) {
      alert("You need to log in first");
      return;
    }
    try {
      const data = await apiServices.addToWishList(
        productId,
        session.accessToken
      );
      toast.success(data.message);
      setWishlistCount(data.data.length);
      await getWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  }


  async function handleRemoveFromWishlist(productId: string) {
    if (!session?.accessToken) {
      alert("You need to log in first");
      return;
    }
    try {
      const data = await apiServices.removeWishlist(
        productId,
        session.accessToken
      );
      if (data.status === "success" || data.message === "success") {
        toast.success("Removed from wishlist");
        setWishlist((prev) =>
          prev?.filter((item) => item._id !== productId)
        );
          setWishlistCount(data.data.length);
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  }

  const isInWishlist = (productId: string) => {
    return wishlist?.some((item) => item._id === productId) ?? false;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loadingWishlist,
        getWishlist,
        handleAddtoWishlist,
        handleRemoveFromWishlist,
        isInWishlist,
        setWishlist,
        count,
        setWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
