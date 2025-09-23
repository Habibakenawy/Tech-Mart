"use client";
import { useState, useEffect ,useContext} from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ProductI } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import { LoadingSpinner } from '@/components';
import Link from "next/link";
import { StarIcon} from "lucide-react";
import { apiServices } from "@/services/apiServices";
import { toast } from 'react-hot-toast';
import AddToCart from "@/components/addToCart";
import { cartContext } from '@/contexts/cartContext'



export default function ProductDetailPage() {
  const { id } = useParams();
   const {setCartCount,handleAddtoCart} = useContext(cartContext)!;
  const [product, setProduct] = useState<ProductI|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loadingCart,setLoadingCart] = useState<boolean>(false);

  async function fetchProductDetails(){
  setLoading(true);
    try {
        const data = await apiServices.getProduct(String(id));
        setProduct(data.data);
    } catch (err:any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  
  }
  useEffect(()=>{fetchProductDetails()},[id])

const roundedRating = Math.round((product?.ratingsAverage ?? 0) * 2) / 2;
const fullStars = Math.floor(roundedRating);
const hasHalfStar = roundedRating % 1 !== 0;


  if (loading) { 
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // async function handleAddtoCart(){
  //   setLoadingCart(true);
  //   const data=await apiServices.addToCart(product!._id)
  //   console.log(data.message);
  //   toast.success(data.message);
  //   setCartCount(data.numOfCartItems);
  //   setLoadingCart(false)
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={selectedImage??product.imageCover}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Thumbnail Images */}
          {product?.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    selectedImage === image
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="text-sm text-muted-foreground uppercase tracking-wide">
            <Link
              href={`/brands/${product.brand._id}`}
              className="hover:text-primary hover:underline transition-colors"
            >
              {product.brand.name}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {    <div className="flex items-center gap-1 text-yellow-500">
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
            <span className="text-sm text-gray-500 ml-1">({product.ratingsAverage?.toFixed(1)})</span>
          </div>}
              <span className="ml-2 text-sm text-muted-foreground">
                {roundedRating} ({product.ratingsQuantity} reviews)
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{product.sold} sold</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Category & Subcategory */}
          <div className="flex flex-wrap gap-2">
            <Link
                 href={`/categories/${product.category._id}`}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
            >
              {product.category.name}
            </Link>
            {product?.subcategory?.map((sub) => (
              <span
                key={sub._id}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              >
                {sub.name}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Stock:</span>
            <span
              className={`text-sm ${
              product.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.quantity> 0
                ? `${product.quantity} available`
                : "Out of stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
           <AddToCart  productQuantity={product.quantity}  handleAddtoCart={()=>handleAddtoCart(product._id)}  />
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Secure Payment</p>
                <p className="text-xs text-muted-foreground">
                  100% secure checkout
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}