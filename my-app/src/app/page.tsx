"use client";
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-6">
        Welcome to TechMart
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-600 mb-8 max-w-2xl">
        Your one-stop shop for the latest and greatest in technology. Explore our extensive catalog of products and discover new categories to find exactly what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/products" passHref>
          <Button size="lg" className="w-full sm:w-auto">View All Products</Button>
        </Link>
        <Link href="/categories" passHref>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">Browse Categories</Button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage;