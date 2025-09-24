"use client";

import { useContext } from "react";
import Link from "next/link";
import { ShoppingCartIcon, UserCircleIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cartContext } from "@/contexts/cartContext";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useContext(cartContext);
  const { count } = useSelector((state: any) => state.counter);
  const { data: session, status } = useSession();

  console.log("Navbar session:", session, status);

  return (
    <div className="w-full">
      <NavigationMenu className="mx-auto mt-10 max-w-7xl px-4 flex justify-between items-center">
        {/* Left side: Logo */}
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
            <span className="text-xl font-bold">TechMart </span>
          </Link>
        </div>

        {/* Middle Nav Links */}
        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/" })}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/products" })}
              >
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/brands" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle({ isActive: pathname === "/brands" })}
              >
                Brands
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

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

        {/* Right side: Depends on auth status */}
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              {/* Profile */}
              <Link href="/profile" className="flex items-center gap-1">
                <UserCircleIcon />
                <span className="hidden md:inline">Profile</span>
              </Link>
             <p>Hi {session.user.name}</p>
              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-1 relative">
                <ShoppingCartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:inline">Cart</span>
              </Link>

              {/* Logout button */}
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          )}

          {/* Mobile Menu */}
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
                    <Button variant="ghost" className="w-full justify-start">
                      Home
                    </Button>
                  </Link>
                  <Link href="/products" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      Products
                    </Button>
                  </Link>
                  <Link href="/brands" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      Brands
                    </Button>
                  </Link>
                  <Link href="/categories" passHref>
                    <Button variant="ghost" className="w-full justify-start">
                      Categories
                    </Button>
                  </Link>

                  {/* Extra menu items depending on auth */}
                  {status === "authenticated" ? (
                    <>
                      <Link href="/profile" passHref>
                        <Button variant="ghost" className="w-full justify-start">
                          Profile
                        </Button>
                      </Link>
                      <Link href="/cart" passHref>
                        <Button variant="ghost" className="w-full justify-start">
                          Cart ({cartCount})
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/auth/login" passHref>
                      <Button variant="ghost" className="w-full justify-start">
                        Login
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </NavigationMenu>
    </div>
  );
}
