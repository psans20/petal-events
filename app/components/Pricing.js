"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import pink from '../images/pink-flower.png';
import red from '../images/red-flower.png';
import rose from '../images/rose-flower.png';
import yellow from '../images/yellow-flower.png';
import { useEffect } from 'react';

export default function FeaturedProducts() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);

  // Calculate the number of cards dynamically after DOM is fully rendered
  useLayoutEffect(() => {
    const total = scrollRef.current?.children.length || 0;
    setTotalCards(total);
  }, []);

  // Scroll to the left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  // Scroll to the right
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  // Detect current card index based on scroll position
  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.children[0].offsetWidth + 16; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-12 bg-[#F7D6E0] md:bg-[#F5F5F5] px-6" id="pricing">
      {/* Heading */}
      <div data-aos="fade-up" className="space-y-6">
      <h2 className="text-black font-bold text-lg">For All Events</h2>
      <h1 className="text-black font-bold text-4xl">Featured Products</h1>
      <p className="text-black font-normal text-lg">
        The world of plants is at your fingertips: jump in and explore today.
      </p>
      </div>

      {/* Product Container */}
      <div className="relative w-full">
        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-4 md:space-x-7 overflow-x-scroll no-scrollbar mt-5"
        >
          {/* Product Cards */}
           <div data-aos="fade-up">
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src={pink}
              alt="Pink Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Ensures the image fits within a fixed ratio
            />
            <h3 className="text-black font-bold mt-2">PINK FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£25</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button>
          </div>
          </div> 

           <div data-aos="fade-up"> {/* Additional Product Cards */}
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src={yellow}
              alt="Yellow Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Same size and ratio
            />
            <h3 className="text-black font-bold mt-2">YELLOW FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£30</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button>
          </div>
          </div> 
  <div data-aos="fade-up">
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src={rose}
              alt="Rose Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Consistent size
            />
            <h3 className="text-black font-bold mt-2">ROSE FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£30</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button> 
          </div>
          </div> 
  <div data-aos="fade-up">
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src="https://i.ibb.co/FBKJhMc/image.png"
              alt="Yellow Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Consistent size
            />
            <h3 className="text-black font-bold mt-2">YELLOW FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£30</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button>
          </div>
          </div> 

          <div data-aos="fade-up">
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src={rose}
              alt="Rose Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Consistent size
            />
            <h3 className="text-black font-bold mt-2">ROSE FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£30</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button> 
          </div>
          </div> 


          <div data-aos="fade-up">
          <div className="min-w-[250px] md:min-w-[350px] bg-[#FBDFE7] rounded-lg shadow-xl p-4">
            <Image
              src={rose}
              alt="Rose Flowers"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-[250px]"  // Consistent size
            />
            <h3 className="text-black font-bold mt-2">ROSE FLOWERS</h3>
            <p className="text-gray-600">Variant</p>
            <p className="text-black font-bold">£30</p>
            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-400 duration-100">
              Message Us
            </button> 
          </div>
          </div> 
        </div>

        {/* Dots and Arrows Container */}
        <div className="flex items-center justify-between mt-6 space-x-6">
          {/* Dots for Pagination */}
          <div className="flex space-x-2 md:opacity-0">
            {Array.from({ length: totalCards }, (_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full ${idx === currentIndex ? "bg-black" : "bg-gray-300"}`}
              ></div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-4">
            <button
              className="bg-transparent border border-black rounded-full p-4 px-4 shadow-md"
              onClick={scrollLeft}
            >
              <FaArrowLeft />
            </button>
            <button
              className="bg-transparent border border-black rounded-full p-4 px-4 shadow-md"
              onClick={scrollRight}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
