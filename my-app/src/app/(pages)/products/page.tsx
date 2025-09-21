"use client"
import { LoadingSpinner } from '@/components';
import { ProductI } from '@/interfaces'
import { Button } from "@/components/ui/button";
import {Grid, List } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { ProductCard } from '@/components';
import { apiServices } from "@/services/apiServices";

export default function Products() {
    const [products,setProducts] = useState<ProductI[]>([]);
    const [Loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    


  async function fetchProducts() {
  setLoading(true);
    try {
        const data = await apiServices.getProducts();
        setProducts(data.data);
    } catch (err:any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  
}
    useEffect(()=>{fetchProducts();},[]);

    if(Loading&&products.length==0){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(error){
         <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
        </div>
      </div>
    }

  return (
 
<div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className='flex justify-center'>
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {products.map((product)=>(
            <ProductCard title={product.title} price={product.price} id={product._id} key={product._id} images={product.images} ratingAverage={product.ratingsAverage} category={product.category} description={product.description} inStock={product.quantity>0} view={viewMode}/>
        ))}
      </div>
      </div>
    </div>
  )
}
