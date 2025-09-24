"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { apiServices } from "@/services/apiServices";
import { Loader2, Box, Frown } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface CategoryDetailsI {
  _id: string;
  name: string;
  image: string;
}

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<CategoryDetailsI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      if (!id) return;
      setLoading(true);
      try {
        const categoryData = await apiServices.getCategory(String(id));
        if (!categoryData || !categoryData.data) {
          setError("Category not found.");
        } else {
          setCategory(categoryData.data);
          setError(null);
        }
      } catch (err: any) {
        console.error("Failed to fetch data:", err);
        toast.error("Failed to load data. Please try again.");
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-gray-500">
        <Frown className="h-16 w-16 mb-4" />
        <h2 className="text-xl font-medium">An error occurred.</h2>
        <p className="text-sm mt-2">{error || "Category not found."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center">{category.name}</h1>
        <div className="relative w-full max-w-2xl aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
