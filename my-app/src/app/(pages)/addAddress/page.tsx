"use client";
import { useState,useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartContext } from '@/contexts/cartContext'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiServices } from '@/services/apiServices';
import { userAddressI } from '@/interfaces';
import { toast } from 'react-hot-toast';
import { Loader2 } from "lucide-react";
import { scheme } from "@/schema/addressSchema";
import { useSession } from "next-auth/react";

export default function UserAddressPage() {
  const { cartId,setCartCount} = useContext(cartContext); 
  const {data:session} = useSession();


  const form = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "Cairo", // Set a default city from the enum
    },
  });

  // Function to handle Visa payment
  async function handleVisaCheckout() {
    const isValid = await form.trigger();
    if (!isValid) return;

    const values = form.getValues();
    try {
      const res= await apiServices.addAddresses(values,String(session?.accessToken));
      console.log(res);
      console.log("why",cartId)
      const checkoutRes = await apiServices.checkOutSession(cartId,String(session?.accessToken),values.details,values.phone,values.city);
      location.href = checkoutRes.session.url;
      setCartCount(0);
    } catch (error: any) {
      toast.error(error.message || "Failed to process your Visa payment.");
    }
  }

//   Function to handle Cash on Delivery payment
  async function handleCashCheckout() {
    const isValid = await form.trigger();
    if (!isValid) return;

    const values = form.getValues();
    try {
      await apiServices.addAddresses(values,String(session?.accessToken));
      const checkoutRes = await apiServices.cashOrder(cartId,String(session?.accessToken) ,values.details, values.phone, values.city);
      toast.success(checkoutRes.message || "Order placed successfully!");
      setCartCount(0);
      location.href="/allorders"
    } catch (error: any) {
      toast.error(error.message || "Failed to place your cash on delivery order.");
    }
  }


  const cities = scheme.shape.city.options;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">Get Address</h1>
        <p className="text-center text-sm text-gray-500">
          Please fill in the details below to add a new shipping address.
        </p>
        <Form {...form}>
          <form className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Home, Work, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Details Field */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street & Building Details</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Example St, Apt 4B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="01012345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City Field (now a Select component) */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <Button 
                type="button" 
                className="w-full" 
                onClick={handleVisaCheckout}
              >
                Pay with Visa
              </Button>
              <Button 
                type="button" 
                variant="outline"
                className="w-full" 
               onClick={handleCashCheckout}
              >
                Pay on Delivery
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
