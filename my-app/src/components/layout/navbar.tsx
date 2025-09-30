"use client";

import { useContext } from "react";
import Link from "next/link";
import { ShoppingCartIcon, Heart, MenuIcon } from "lucide-react";
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
import { useSession, signOut } from "next-auth/react";
import clsx from "clsx";
import { WishlistContext } from "@/contexts/wishListContext";

export function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useContext(cartContext)!;
  const wishlistCtx = useContext(WishlistContext);
  const { data: session, status } = useSession();

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
            <span className="text-xl font-bold">TechMart</span>
          </Link>
        </div>

        {/* Middle Nav Links */}
        <NavigationMenuList className="hidden md:flex">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={clsx(
                  navigationMenuTriggerStyle(),
                  pathname === "/" && "bg-accent text-accent-foreground"
                )}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink
                className={clsx(
                  navigationMenuTriggerStyle(),
                  pathname === "/products" && "bg-accent text-accent-foreground"
                )}
              >
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/brands" legacyBehavior passHref>
              <NavigationMenuLink
                className={clsx(
                  navigationMenuTriggerStyle(),
                  pathname === "/brands" && "bg-accent text-accent-foreground"
                )}
              >
                Brands
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/categories" legacyBehavior passHref>
              <NavigationMenuLink
                className={clsx(
                  navigationMenuTriggerStyle(),
                  pathname === "/categories" &&
                    "bg-accent text-accent-foreground"
                )}
              >
                Categories
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Right side: Authenticated / Not Authenticated */}
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center gap-1 relative"
              >
                <Heart className="h-5 w-5 text-red-500" />
                {wishlistCtx?.wishlist?.length &&
                  wishlistCtx.wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                      {wishlistCtx.count}
                    </span>
                  )}
                <span className="hidden md:inline">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-1 relative">
                <ShoppingCartIcon />
                {cartCount! > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:inline">Cart</span>
              </Link>

              {/* Logout */}
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
                    <Button
                      variant="ghost"
                      className={clsx(
                        "w-full justify-start",
                        pathname === "/" && "bg-accent text-accent-foreground"
                      )}
                    >
                      Home
                    </Button>
                  </Link>
                  <Link href="/products" passHref>
                    <Button
                      variant="ghost"
                      className={clsx(
                        "w-full justify-start",
                        pathname === "/products" &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      Products
                    </Button>
                  </Link>
                  <Link href="/brands" passHref>
                    <Button
                      variant="ghost"
                      className={clsx(
                        "w-full justify-start",
                        pathname === "/brands" &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      Brands
                    </Button>
                  </Link>
                  <Link href="/categories" passHref>
                    <Button
                      variant="ghost"
                      className={clsx(
                        "w-full justify-start",
                        pathname === "/categories" &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      Categories
                    </Button>
                  </Link>

                  {/* Extra items when logged in */}
                  {status === "authenticated" ? (
                    <>
                      <Link href="/wishlist" passHref>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Wishlist ({wishlistCtx?.wishlist?.length ?? 0})
                        </Button>
                      </Link>

                      <Link href="/cart" passHref>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
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
