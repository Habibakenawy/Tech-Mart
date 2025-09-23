"use client"
import { LoadingSpinner } from '@/components';
import { ProductI } from '@/interfaces';
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components';
import { apiServices } from "@/services/apiServices";
import { toast } from 'react-hot-toast';
import { cartContext } from '@/contexts/cartContext'
import {useContext} from "react";

export default function Products() {
    const {setCartCount,handleAddtoCart} = useContext(cartContext);
    const [products, setProducts] = useState<ProductI[]>([]);
    const [loading, setLoading] = useState(true); // Set initial loading state to true
    const [error, setError] = useState<string | null>(null); // Explicitly type error state
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    async function fetchProducts() {
        setLoading(true); // Start loading before the fetch
        try {
            const data = await apiServices.getProducts();
            setProducts(data.data);
            setError(null); // Clear any previous errors on success
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setProducts([]); // Clear products on error
        } finally {
            setLoading(false); // End loading regardless of outcome
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    // const handleAddtoCart = async (setLoadingCart: (value: boolean) => void, productID: string) => {
    //     setLoadingCart(true);
    //     try {
    //         const data = await apiServices.addToCart(productID);
    //         console.log(data.message);
    //         setCartCount(data.numOfCartItems);
    //         toast.success(data.message);
    //     } catch (err: any) {
    //         console.error(err.message);
    //         toast.error(err.message || 'Failed to add to cart.');
    //     } finally {
    //         setLoadingCart(false);
         
    //     }
    // };
    
    // Conditional Rendering Block
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                </div>
            </div>
        );
    }
    
    if (products && products.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-semibold">No products found.</h2>
                <p className="text-muted-foreground mt-2">Please check back later.</p>
            </div>
        );
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
                    {products && products.map((product) => (
                        <ProductCard
                            key={product._id}
                            handleAddtoCart={handleAddtoCart}
                            quantity={product.quantity}
                            title={product.title}
                            price={product.price}
                            id={product._id}
                            images={product.images}
                            ratingAverage={product.ratingsAverage}
                            category={product.category}
                            description={product.description}
                            inStock={product.quantity > 0}
                            view={viewMode}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}