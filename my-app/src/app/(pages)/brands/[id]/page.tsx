"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { apiServices } from "@/services/apiServices";
import { Loader2, Frown } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { BrandI } from '@/interfaces';




export default function BrandPage() {
  const { id } = useParams();
  const [brand, setBrand] = useState<BrandI| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrand() {
      if (!id) return;
      setLoading(true);
      try {
        const brandData = await apiServices.getBrand(String(id));
        if (!brandData) {
          setError("Brand not found.");
        } else {
          setBrand(brandData.data);
          setError(null);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load data. Please try again.");
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBrand();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !brand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-gray-500">
        <Frown className="h-16 w-16 mb-4" />
        <h2 className="text-xl font-medium">An error occurred.</h2>
        <p className="text-sm mt-2">{error || "Brand not found."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center">{brand.name}</h1>
        <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
