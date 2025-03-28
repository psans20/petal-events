"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShoppingCart } from "react-icons/fa"; // Import Cart Icon
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
 
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
 
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51QpVHxPNmoPysQ0GvmGLk1wWp8c3X2WxUvoskY1qm1GBcGQtfcyPkYrfS3AZmm2EMbdEF1feJUa8t1O608Jjy2pP00Lx3BYUMo");
 
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
 
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
 
    // Load cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      try {
        const parsedCartItems = JSON.parse(storedCartItems);
        if (Array.isArray(parsedCartItems)) {
          setCartItems(parsedCartItems);
        } else {
          console.error("Cart items are not an array:", parsedCartItems);
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        setCartItems([]);
      }
    }
 
    // Listen for cart updates from other components
    const handleCartUpdate = (e) => {
      const updatedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(updatedItems);
      if (e.detail?.showCart) {
        setCartDropdown(true);
      }
    };
 
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);
 
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
 
  const toggleCartDropdown = () => {
    setCartDropdown(!cartDropdown);
  };
 
  const removeFromCart = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };
 
  // 🔥 Stripe Checkout Function
  const handleCheckout = async () => {
    console.log("Cart items before checkout:", cartItems);
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Map flower names to their Stripe-compatible image URLs
      const flowerImages = {
        "Pink Flower": "https://i.ibb.co/VvxBzzg/pink-flower.png",
        "Red Flowers": "https://i.ibb.co/9tGkh3x/red-flower.png",
        "Yellow Flowers": "https://i.ibb.co/XSgJYKM/yellow-flower.png",
        "Rose Flowers": "https://i.ibb.co/9tGkh3x/red-flower.png"
      };

      const cartItemsFormatted = cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productImage: flowerImages[item.name] // Use the mapped image URL
      }));

      console.log('Formatted cart items:', cartItemsFormatted);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItemsFormatted }),
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
 
  return (
    <nav className={`flex justify-between items-center p-2 px-4 md:px-10 bg-[#F2B5D4] ${roboto.className}`}>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu} 
        className="md:hidden text-black"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className="flex-1 hidden md:flex justify-start text-black font-normal">
        <a href="#home" className="hover:text-gray-700 px-4">Home</a>
        <a href="#features" className="hover:text-gray-700 px-4">Features</a>
        <a href="#pricing" className="hover:text-gray-700 px-4">Pricing</a>
        <a href="#faq" className="hover:text-gray-700 px-4">FAQ</a>
      </div>

      {/* Logo */}
      <div className="flex-1 flex justify-center">
        <Link href="/">
          <img src="https://i.ibb.co/7rRH8P1/image.png" className="w-28 mx-auto hover:cursor-pointer" alt="Petal Logo" />
        </Link>
      </div>

      {/* Cart Button - Desktop */}
      <div className="flex-1 hidden md:flex justify-end relative">
        <button 
          className="bg-[#4A051C] border border-[#000] rounded-xl text-white py-2 px-6 ml-4 hover:bg-purple-600 duration-100 flex items-center gap-2" 
          onClick={toggleCartDropdown}
        >
          <FaShoppingCart /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
        </button>
        {cartDropdown && (
          <div className="absolute right-0 mt-2 top-8 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
            <p className="font-bold mb-2">Your Cart</p>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <div className="w-12 h-12 mr-3">
                      <Image src={item.productImage} alt={item.name} width={50} height={50} className="object-cover rounded-md" />
                    </div>
                    <div className="flex-1">
                      <p className="text-black font-bold">{item.name}</p>
                      <p className="text-gray-700">£{item.price} x {item.quantity}</p>
                      <p className="font-bold">£{item.price * item.quantity}</p>
                    </div>
                    <button className="text-red-500 ml-4" onClick={() => removeFromCart(index)}>&times;</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items in cart.</p>
            )}
            {cartItems.length > 0 && (
              <button onClick={handleCheckout} className="mt-4 w-full bg-[#540D1A] text-white py-2 px-4 rounded-lg hover:bg-[#3e0a13] transition-all">
                Go to Checkout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Cart Button - Mobile */}
      <div className="md:hidden relative">
        <button 
          className="text-black p-2" 
          onClick={toggleCartDropdown}
        >
          <FaShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#4A051C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
        {cartDropdown && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Your Cart</h2>
                <button onClick={toggleCartDropdown} className="text-gray-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              {cartItems.length > 0 ? (
                <ul className="space-y-4">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex items-center border-b pb-4">
                      <div className="w-16 h-16 mr-3">
                        <Image src={item.productImage} alt={item.name} width={64} height={64} className="object-cover rounded-md" />
                      </div>
                      <div className="flex-1">
                        <p className="text-black font-bold">{item.name}</p>
                        <p className="text-gray-700">£{item.price} x {item.quantity}</p>
                        <p className="font-bold">£{item.price * item.quantity}</p>
                      </div>
                      <button className="text-red-500 ml-4" onClick={() => removeFromCart(index)}>&times;</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No items in cart.</p>
              )}
              {cartItems.length > 0 && (
                <button 
                  onClick={handleCheckout} 
                  className="mt-4 w-full bg-[#540D1A] text-white py-3 px-4 rounded-lg hover:bg-[#3e0a13] transition-all"
                >
                  Go to Checkout
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={toggleMenu} className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <nav className="space-y-4">
              <a href="#home" className="block text-black hover:text-gray-700">Home</a>
              <a href="#features" className="block text-black hover:text-gray-700">Features</a>
              <a href="#pricing" className="block text-black hover:text-gray-700">Pricing</a>
              <a href="#faq" className="block text-black hover:text-gray-700">FAQ</a>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}