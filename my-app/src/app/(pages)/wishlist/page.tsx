import React from "react";
import { apiServices } from "@/services/apiServices";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Heart } from "lucide-react";
import InnerWishlist from "./InnerWishlist";

export default async function Wishlist() {
  async function getWishlist() {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) return null;
    return await apiServices.getLoggedUserWishlist(String(session.accessToken));
  }

  const res = await getWishlist();

  if (!res || !res.data || res.data.length === 0) {
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
    <div className="container mx-auto px-4 py-8">
      <InnerWishlist res={res} />
    </div>
  );
}
