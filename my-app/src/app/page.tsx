import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1>Welcome to TechMart</h1>
      <p className="w-full md:w-3/4 lg:w-1/2">
        Welcome to TechMart, your premier destination for a curated selection of the latest and greatest! Discover everything you need to power your life—from cutting-edge gadgets and electronics to stylish apparel and home essentials. Get ready to find your next favorite thing and shop with confidence. Happy shopping! 🛒
      </p>
      
      <div className="flex flex-wrap items-center gap-2 md:flex-row mt-6">
        <Button>Shop Now</Button>
        <Button variant="secondary" >Browse Categories</Button>
      </div>
    </div>
  );
}