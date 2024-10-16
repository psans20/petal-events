"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShoppingCart } from 'react-icons/fa'; // Import Cart Icon
import Image from "next/image";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartDropdown, setCartDropdown] = useState(false); // State for Cart Dropdown
    const [cartItems, setCartItems] = useState([]); // State for Cart Items

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
        
        // Load cart items from localStorage on component mount
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }

        // Listen for cart updates from other components
        const handleCartUpdate = () => {
            const updatedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItems(updatedItems);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
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
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        const cartUpdatedEvent = new CustomEvent('cartUpdated');
        window.dispatchEvent(cartUpdatedEvent);
    };

    return (
        <nav className={`flex justify-between items-center p-2 px-4 md:px-10 bg-[#F2B5D4] ${roboto.className}`}>
            <div className="flex-1 hidden md:flex justify-start text-black font-normal">
                <a href="#home" className="hover:text-gray-700 px-4">Home</a>
                <a href="#features" className="hover:text-gray-700 px-4">Features</a>
                <a href="#pricing" className="hover:text-gray-700 px-4">Pricing</a>
                <a href="#faq" className="hover:text-gray-700 px-4">FAQ</a>
            </div>

            <div className="flex justify-center">
                <Link href="/">
                    <img src="https://i.ibb.co/7rRH8P1/image.png" className="w-28 mx-auto hover:cursor-pointer" alt="Petal Logo" />
                </Link>
            </div>

            <div className="flex-1 hidden md:flex justify-end relative">
                <button
                    className="bg-[#4A051C] border border-[#000] rounded-xl text-white py-2 px-6 ml-4 hover:bg-purple-600 duration-100 flex items-center gap-2"
                    onClick={toggleCartDropdown}
                >
                    <FaShoppingCart /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </button>
                {cartDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
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
                                        <button
                                            className="text-red-500 ml-4"
                                            onClick={() => removeFromCart(index)}
                                        >
                                            &times;
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No items in cart.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Icon */}
            <svg
                onClick={toggleMenu}
                className="cursor-pointer md:hidden"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                    fill="black"
                />
            </svg>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#F2B5D4] text-black z-50">
                    <div className="flex justify-between p-2 px-4 items-center bg-[#F2B5D4]" id="nav">
                        <img src="https://i.ibb.co/7rRH8P1/image.png" className="w-28" alt="Petal Logo" />
                        <button onClick={toggleMenu} className="text-black text-2xl">✕</button>
                    </div>
                    <div className="flex flex-col items-center space-y-6 mt-10">
                        <a href="#home" onClick={toggleMenu} className="text-xl">Home</a>
                        <a href="#features" onClick={toggleMenu} className="text-xl">Features</a>
                        <a href="#pricing" onClick={toggleMenu} className="text-xl">Pricing</a>
                        <a href="#faq" onClick={toggleMenu} className="text-xl">FAQ</a>
                        <div className="relative w-[80%]">
                            <button className="bg-[#4A051C] font-normal text-white w-full py-3 rounded-xl flex items-center gap-2 justify-center" onClick={toggleCartDropdown}>
                                <FaShoppingCart /> Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                            </button>
                            {cartDropdown && (
                                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
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
                                                    <button
                                                        className="text-red-500 ml-4"
                                                        onClick={() => removeFromCart(index)}
                                                    >
                                                        &times;
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No items in cart.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
