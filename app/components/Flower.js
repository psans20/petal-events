"use client";

import { Roboto } from "next/font/google";
import { useState } from "react";
import yellow from '../images/yellow-flower.png';
import Image from "next/image";


const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Flower() {
  const [selectedVariant, setSelectedVariant] = useState("Select");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={`flex flex-col lg:flex-row items-start lg:items-stretch p-4 mt-10 ${roboto.className} w-full max-w-6xl mx-auto  gap-12 md:gap-24`}>
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col gap-4">
        {/* Thumbnail Images */}
        
        {/* Main Product Image */}
        <Image
  src={yellow}
  alt="Yellow Flowers"
 
  className="w-full h-96 lg:h-[32rem] object-cover rounded-lg"
/>
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col w-full max-w-lg">
        {/* Product Name and Price */}
        <h2 className="font-bold text-4xl">Yellow Flowers</h2>
        <p className="text-2xl text-gray-700 mt-2 font-bold">£24.99</p>

        {/* Rating */}
        <div className="flex items-center mt-4">
          <div className="flex text-yellow-500">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="text-xl">★</span>
              ))}
          </div>
          <p className="ml-2 text-black text-lg">(5 stars) - 10 reviews</p>
        </div>

        {/* Product Description */}
        <p className="text-black font-normal text-md mt-4">
          Our Yellow Wedding Flowers add a radiant touch to your special day, symbolizing joy and happiness. Handpicked for their vibrant colour and delicate beauty, they are perfect for bouquets, centrepieces, and venue decor.
        </p>

        {/* Variant Selection */}
        <label htmlFor="variant" className="mt-6 text-md font-normal">Wedding Style Flowers / For All Occasions</label>
        <div className="relative w-full mt-2">
          <select
            id="variant"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="p-3 border rounded-xl w-full appearance-none pr-10"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 class=%27feather feather-chevron-down%27%3E%3Cpolyline points=%276 9 12 15 18 9%27/%3E%3C/svg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1rem 1rem" }}
          >
            <option value="Select" disabled>Select</option>
            <option value="Option One">Option One</option>
            <option value="Option Two">Option Two</option>
            <option value="Option Three">Option Three</option>
          </select>
        </div>

        {/* Variant Options as Buttons */}
        <div className="grid grid-cols-3 gap-4 mt-4 w-full">
          <button
            className={`py-2 px-4 rounded-full border ${selectedVariant === 'Option One' ? 'bg-[#540D1A] text-white border-[#540D1A]' : 'bg-transparent text-black border-black'}`}
            onClick={() => setSelectedVariant('Option One')}
          >
            Option one
          </button>
          <button
            className={`py-2 px-4 rounded-full border ${selectedVariant === 'Option Two' ? 'bg-[#540D1A] text-white border-[#540D1A]' : 'bg-transparent text-black border-black'}`}
            onClick={() => setSelectedVariant('Option Two')}
          >
            Option Two
          </button>
          <button
            className={`py-2 px-4 rounded-full border ${selectedVariant === 'Option Three' ? 'bg-gray-400 text-white border-gray-400' : 'bg-transparent text-gray-400 border-gray-400'}`}
            onClick={() => setSelectedVariant('Option Three')}
            disabled
          >
            Option Three
          </button>
        </div>

        {/* Quantity Selection */}
        <label htmlFor="quantity" className="mt-6 text-md font-normal">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-2 p-3 border rounded-md w-full"
        />

        {/* Add to Cart and Buy Now Buttons */}
        <button className="bg-[#540D1A] text-white font-bold py-3 px-8 rounded-md mt-6 w-full hover:bg-[#3e0a13] transition-all">
          Add To Cart
        </button>
        <button className="bg-white text-black font-bold py-3 px-8 rounded-md mt-3 w-full border border-gray-400 hover:bg-gray-100 transition-all">
          Buy Now
        </button>

        {/* Free Shipping Text */}
        <p className="text-sm text-gray-500 mt-4 text-center">Free shipping over £50</p>

        {/* Accordion Sections */}
        <div className="w-full mt-6">
          {/* Details Section */}
          <details className="border-t py-4">
            <summary className="font-semibold text-lg cursor-pointer">Details</summary>
            <p className="mt-2 text-md text-gray-700">
              Illuminate your special day with our exquisite Yellow Wedding Flowers. These vibrant blooms, symbolizing joy, friendship, and happiness, are a timeless choice for couples looking to infuse their wedding with warmth and elegance. Perfectly suited for both intimate ceremonies and grand celebrations, these radiant flowers bring an air of sophistication and cheer.
            </p>
          </details>

          {/* Shipping Section */}
          <details className="border-t py-4">
            <summary className="font-semibold text-lg cursor-pointer">Shipping</summary>
            <p className="mt-2 text-md text-gray-700">
              All orders are carefully packaged to preserve the beauty and quality of your blooms. You'll receive tracking details once your order ships, so you can follow the journey right to your door. In case of any issues, our customer support team is here to assist you every step of the way!
            </p>
          </details>

          {/* Returns Section */}
          <details className="border-t py-4">
            <summary className="font-semibold text-lg cursor-pointer">Returns</summary>
            <p className="mt-2 text-md text-gray-700">
              We want you to be completely satisfied with your purchase! If you're not fully happy with your Yellow Wedding Flowers, we offer a hassle-free return policy. You can return your order within 30 days for a full refund or exchange.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
