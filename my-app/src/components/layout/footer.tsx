"use client";
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main grid for footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: App Info and Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">TechMart</h3>
            <p className="text-sm">
              Your one-stop shop for all things tech. We're dedicated to bringing you the best products at the best prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Subscribe to our Newsletter</h4>
            <p className="text-sm">Stay up to date with our latest products and promotions.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          &copy; {currentYear} TechMart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
