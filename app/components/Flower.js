"use client";

import { Roboto } from "next/font/google";
import { useState, useEffect } from "react";
import yellow from '../images/yellow-flower.png';
import pink from '../images/pink-flower.png';
import red from '../images/red-flower.png';
import rose from '../images/rose-flower.png';
import Image from "next/image";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const flowers = [
  {
    name: "Pink Flower",
    productImage: pink,
    price: 25
  },
  {
    name: "Red Flowers",
    productImage: red,
    price: 25
  },
  {
    name: "Yellow Flowers",
    productImage: yellow,
    price: 30
  },
  {
    name: "Rose Flowers",
    productImage: rose,
    price: 30
  }
];

export default function Flower() {
  const [selectedVariant, setSelectedVariant] = useState("Yellow Flowers");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(flowers[2]);

  useEffect(() => {
    // Fetch product from localStorage on component mount
    const product = localStorage.getItem('selectedProduct');
    if (product) {
      setSelectedProduct(JSON.parse(product));
    }
  }, []);

  useEffect(() => {
    // Update selectedProduct whenever selectedVariant changes
    const product = flowers.find(flower => flower.name === selectedVariant);
    if (product) {
      setSelectedProduct(product);
    }
  }, [selectedVariant]);

  const isMobile = () => {
    return window.innerWidth <= 768; // Assume mobile if screen width is 768px or less
  };

  const addToCart = () => {
    if (selectedProduct) {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const newCartItem = { ...selectedProduct, quantity };
      const existingItemIndex = cartItems.findIndex(item => item.name === newCartItem.name);
      
      if (existingItemIndex !== -1) {
        // Update the quantity if item already exists in the cart
        cartItems[existingItemIndex].quantity += newCartItem.quantity;
      } else {
        cartItems.push(newCartItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Dispatch an event to notify Navbar of cart updates
      const cartUpdatedEvent = new CustomEvent('cartUpdated', {
        detail: { showCart: true, isMobile: isMobile() }
      });
      window.dispatchEvent(cartUpdatedEvent);
    }
  };

  return (
    <div className={`flex flex-col lg:flex-row items-start lg:items-stretch p-4 mt-10 ${roboto.className} w-full max-w-6xl mx-auto  gap-12 md:gap-24`}>
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main Product Image */}
        <Image
          src={selectedProduct ? selectedProduct.productImage : yellow}
          alt={selectedProduct ? selectedProduct.name : "Yellow Flowers"}
          className="w-full h-96 lg:h-[32rem] object-cover rounded-lg"
          width={300}
          height={300}
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="flex flex-col w-full max-w-lg">
        {/* Product Name and Price */}
        <h2 className="font-bold text-4xl">{selectedProduct ? selectedProduct.name : "Yellow Flowers"}</h2>
        <p className="text-2xl text-gray-700 mt-2 font-bold">£{selectedProduct ? selectedProduct.price : "24.99"}</p>

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
          Our {selectedProduct ? selectedProduct.name : "Yellow Wedding Flowers"} add a radiant touch to your special day, symbolizing joy and happiness. Handpicked for their vibrant colour and delicate beauty, they are perfect for bouquets, centrepieces, and venue decor.
        </p>

        {/* Variant Selection */}
        <label htmlFor="variant" className="mt-6 text-md font-normal">Select Your Flower Type</label>
        <div className="relative w-full mt-2">
          <select
            id="variant"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="p-3 border rounded-xl w-full appearance-none pr-10"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27black%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 class=%27feather feather-chevron-down%27%3E%3Cpolyline points=%276 9 12 15 18 9%27/%3E%3C/svg%3E')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1rem 1rem" }}
          >
            {flowers.map((flower) => (
              <option key={flower.name} value={flower.name}>{flower.name}</option>
            ))}
          </select>
        </div>

        {/* Quantity Selection */}
        <label htmlFor="quantity" className="mt-6 text-md font-normal">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="mt-2 p-3 border rounded-md w-full"
        />

        {/* Add to Cart and Buy Now Buttons */}
        <button onClick={addToCart} className="bg-[#540D1A] text-white font-bold py-3 px-8 rounded-md mt-6 w-full hover:bg-[#3e0a13] transition-all">
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
              Illuminate your special day with our exquisite {selectedProduct ? selectedProduct.name : "Yellow Wedding Flowers"}. These vibrant blooms, symbolizing joy, friendship, and happiness, are a timeless choice for couples looking to infuse their wedding with warmth and elegance. Perfectly suited for both intimate ceremonies and grand celebrations, these radiant flowers bring an air of sophistication and cheer.
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
              We want you to be completely satisfied with your purchase! If you're not fully happy with your {selectedProduct ? selectedProduct.name : "Yellow Wedding Flowers"}, we offer a hassle-free return policy. You can return your order within 30 days for a full refund or exchange.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
