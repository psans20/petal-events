"use client";

import { Roboto } from "next/font/google";
import { useState, useEffect } from "react";
import yellow from '../images/yellow-flower.png';
import pink from '../images/pink-flower.png';
import red from '../images/red-flower.png';
import rose from '../images/rose-flower.png';
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const flowers = [
  {
    name: "Pink Flower",
    productImage: pink,
    price: 25,
    publicImageUrl: "https://i.ibb.co/VvxBzzg/pink-flower.png"
  },
  {
    name: "Red Flowers",
    productImage: red,
    price: 25,
    publicImageUrl: "https://i.ibb.co/9tGkh3x/red-flower.png"
  },
  {
    name: "Yellow Flowers",
    productImage: yellow,
    price: 30,
    publicImageUrl: "https://i.ibb.co/XSgJYKM/yellow-flower.png"
  },
  {
    name: "Rose Flowers",
    productImage: rose,
    price: 30,
    publicImageUrl: "https://i.ibb.co/9tGkh3x/red-flower.png"
  }
];

export default function Flower() {
  const [selectedVariant, setSelectedVariant] = useState("Yellow Flowers");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(flowers[2]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckout = async () => {
    if (!selectedProduct) return;

    try {
      console.log('Starting checkout with product:', selectedProduct);
      const cartItems = [{
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
        productImage: selectedProduct.publicImageUrl // Use the public URL directly
      }];
      console.log('Cart items being sent:', cartItems);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create Stripe session');
      }

      if (data.id) {
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Stripe failed to load');
        }
        const result = await stripe.redirectToCheckout({ sessionId: data.id });
        if (result.error) {
          throw new Error(result.error.message);
        }
      } else {
        throw new Error('No session ID received from server');
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert(`Failed to start checkout: ${error.message}`);
    }
  };

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

      // Show the modal
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`flex flex-col lg:flex-row items-start lg:items-stretch p-4 mt-10 ${roboto.className} w-full max-w-6xl mx-auto gap-12 md:gap-24`}>
      {/* Left Section: Image Gallery */}
      <div className="flex flex-col gap-4">
        {/* Main Product Image */}
        <Image
          src={selectedProduct ? selectedProduct.productImage : yellow}
          alt={selectedProduct ? selectedProduct.name : "Yellow Flowers"}
          className="w-full h-96 lg:h-[32rem] object-cover rounded-lg product-main-image"
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
        <button   onClick={handleCheckout} className="bg-white text-black font-bold py-3 px-8 rounded-md mt-3 w-full border border-gray-400 hover:bg-gray-100 transition-all">
          Buy Now
        </button>

        {/* Free Shipping Text */}
        <p className="text-sm text-gray-500 mt-4 text-center">Free shipping over £50</p>

        {/* Modal for Add to Cart */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-black text-xl">&times;</button>
              <p className="font-bold mb-2">Product successfully added to your shopping cart</p>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4">
                  <Image src={selectedProduct.productImage} alt={selectedProduct.name} width={64} height={64} className="object-cover rounded-md" />
                </div>
                <div>
                  <p className="font-semibold">{selectedProduct.name}</p>
                  <p>£{selectedProduct.price}</p>
                  <p>Quantity: {quantity}</p>
                </div>
              </div>
              <p className="font-semibold">Subtotal: £{(selectedProduct.price * quantity).toFixed(2)}</p>
              <button onClick={closeModal} className="mt-4 w-full bg-[#540D1A] text-white py-2 px-4 rounded-lg hover:bg-[#3e0a13] transition-all">
                Continue Shopping
              </button>
              <button className="mt-2 w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all">
                Go to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
