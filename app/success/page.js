"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Success() {
  useEffect(() => {
    // Clear cart items from localStorage after successful payment
    localStorage.removeItem("cartItems");
  }, []);

  return (
    <div className="min-h-screen bg-[#F7D6E0]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Thank You for Your Purchase!</h1>
        <p className="text-xl text-gray-700 mb-8">
          Your order has been successfully processed. We'll send you a confirmation email shortly.
        </p>
        <Link href="/product">
          <button className="bg-[#4A051C] text-white py-3 px-8 rounded-lg hover:bg-[#731635] transition-all">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
} 