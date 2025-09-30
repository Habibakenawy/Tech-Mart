"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Frown, Box } from "lucide-react";
import { apiServices } from "@/services/apiServices";
import { toast } from "react-hot-toast";
import { BrandI } from "@/interfaces";



export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      setLoading(true);
      try {
        const {data} = await apiServices.getBrands();
        if (data) {
          setBrands(data);
          setError(null);
        } else {
          setBrands([]);
          setError("No brands found.");
        }
      } catch (err: unknown) {
        console.error("Failed to fetch brands:", err);
        toast.error("Failed to load brands. Please try again.");
        setError("Failed to load brands.");
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-gray-500">
        <Frown className="h-16 w-16 mb-4" />
        <h2 className="text-xl font-medium">An error occurred.</h2>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-gray-500">
        <Box className="h-16 w-16 mb-4" />
        <h2 className="text-xl font-medium">No Brands Found</h2>
        <p className="text-sm mt-2">Check back later for new brands.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={brand.image}
                alt={brand.name}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="bg-white p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}