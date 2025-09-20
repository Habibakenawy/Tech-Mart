"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { StarIcon, HeartIcon, EyeIcon, ShoppingCartIcon } from "lucide-react";

export function ProductCard({
  title,
  price,
  images,
  ratingAverage,
  category,
  description,
  inStock,
  view
}) {
  const roundedRating = Math.round(ratingAverage * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    <>
    {view=='grid' ? ( <Card className="flex flex-col h-full w-full max-w-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Image
          src={images[0]}
          alt={title}
          width={400}
          height={400}
          className="object-cover w-full h-48"
        />
        <Badge className="absolute top-2 right-2 rounded-full px-2 py-1 text-xs">
          {category.name}
        </Badge>
      </div>

      {/* This new div acts as a flex container to push the footer down */}
      <div className="flex flex-col flex-grow p-4">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-xl font-bold line-clamp-2">{title}</CardTitle>
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < fullStars ? "fill-current" : ""
                } ${
                  i === fullStars && hasHalfStar ? "half-star" : ""
                } text-yellow-400`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">({ratingAverage.toFixed(1)})</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-2 text-sm text-gray-600">
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardContent>

        <CardFooter className="flex flex-col w-full gap-2 p-0 pt-4 mt-auto">
          <div className="flex w-full items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
            <Badge
              className={`text-xs ${inStock ? 'bg-green-500 text-white' : 'bg-destructive'}`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          
          <div className="flex w-full gap-2">
            <Button className="flex-1" disabled={!inStock}>
              <ShoppingCartIcon className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <HeartIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <EyeIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>) :  (
        // List View Layout
        <Card className="flex w-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative w-40 h-40 flex-shrink-0">
            <Image
              src={images[0]}
              alt={title}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
            <Badge className="absolute top-2 right-2 rounded-full px-2 py-1 text-xs">
              {category.name}
            </Badge>
          </div>

          <div className="flex flex-col flex-grow p-4 md:flex-row md:items-center md:justify-between">
            {/* Left side: Content */}
            <div className="flex flex-col flex-grow">
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < fullStars ? "fill-current" : ""} ${
                      i === fullStars && hasHalfStar ? "half-star" : ""
                    } text-yellow-400`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">({ratingAverage.toFixed(1)})</span>
              </div>
              <CardDescription className="text-sm text-gray-600 mt-2 line-clamp-2 md:line-clamp-none">
                {description}
              </CardDescription>
            </div>

            {/* Right side: Price and Actions */}
            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
              <Badge
                className={`text-xs ${inStock ? 'bg-green-500 text-white' : 'bg-destructive'}`}
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </Badge>
              <div className="flex items-center gap-2 mt-2">
                <Button disabled={!inStock}>
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span className="ml-2">Add to Cart</span>
                </Button>
                <Button variant="outline" size="icon">
                  <HeartIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
  
    </>
  );
}