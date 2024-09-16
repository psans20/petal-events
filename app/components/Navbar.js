"use client";

import { useState, useEffect } from 'react';
import { Roboto } from 'next/font/google'
import AOS from "aos";
import "aos/dist/aos.css";
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
      }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                <img src="https://i.ibb.co/7rRH8P1/image.png" className="w-28 mx-auto" alt="Petal Logo" />
            </div>
       
            
            <div className="flex-1 hidden md:flex justify-end">
                <button className="bg-[#4A051C] border border-[#000] rounded-xl text-white py-2 px-6 ml-4 hover:bg-purple-600 duration-100">Message Us</button>
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
                        <button className="bg-[#4A051C] font-normal text-white w-[80%] py-3 rounded-xl">Message Us</button>
                    </div>
                </div>
            )}
      
        </nav>
    );
}
