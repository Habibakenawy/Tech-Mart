"use client"

import {useContext,useEffect} from "react"
import Link from "next/link"
import { ShoppingCartIcon, UserCircleIcon, MenuIcon } from "lucide-react" // Import MenuIcon
import { usePathname } from "next/navigation";
import { cartContext } from '@/contexts/cartContext'
import { apiServices } from "@/services/apiServices";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname();
     const {cartCount} = useContext(cartContext);

  return (
    <div className="w-full">
      <NavigationMenu className="mx-auto mt-10 max-w-7xl px-4 flex justify-between items-center">
        {/* Left side: Logo and App Name */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-bag"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="text-xl font-bold">TechMart</span>
          </Link>
        </div>
        
        {/* Middle: Regular Navigation Links (visible on md screens and larger) */}
        <NavigationMenuList className="hidden md:flex">
          {/* Home Link */}
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/" })}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Products Link */}
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/products" })}
              >
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Brands Link */}
          <NavigationMenuItem>
            <Link href="/brands" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/brands" })}
              >
                Brands
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* Categories Link */}
          <NavigationMenuItem>
            <Link href="/categories" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/categories" })}
              >
                Categories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Right side: Cart, Profile and Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-1">
            <Link href="/profile" className="flex items-center gap-1">
            <UserCircleIcon />
            <span className="hidden md:inline">Profile</span>
          </Link>     
              {/* Display the cart count as a badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
          
        
     <ShoppingCartIcon />
            <span className="hidden md:inline">Cart</span>
          {/* Mobile Menu Button (visible on small screens) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>TechMart Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-2">
                  <Link href="/" passHref>
                    <Button variant="ghost" className="w-full justify-start">Home</Button>
                  </Link>
                  <Link href="/products" passHref>
                    <Button variant="ghost" className="w-full justify-start">Products</Button>
                  </Link>
                  <Link href="/brands" passHref>
                    <Button variant="ghost" className="w-full justify-start">Brands</Button>
                  </Link>
                  <Link href="/categories" passHref>
                    <Button variant="ghost" className="w-full justify-start">Categories</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </NavigationMenu>
    </div>
  )
}