"use client";
import { useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sneak from "./components/Sneak";
import Review from "./components/Review";
import Feature from "./components/Feature";
import Pricing from './components/Pricing';
import Faq from "./components/Faq";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

import AOS from "aos";
import "aos/dist/aos.css";

function LayerFrame() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        fill="#000"
        d="M5 21.453L2.5 22.5V6.285L17.5 0v3.134L5 8.37v13.082zM27.5 7.5l-15 6.285V30l15-6.285V7.5zM10 12.121l12.5-5.237V3.75l-15 6.285V26.25l2.5-1.047V12.12z"
      ></path>
    </svg>
  );
}

function BoxFrame() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <g clipPath="url(#clip0_1_237)">
        <path
          fill="#000"
          fillRule="evenodd"
          d="M9.899 21.721L3.813 5H1.25A1.247 1.247 0 010 3.75C0 3.06.559 2.5 1.25 2.5h4.313l6.836 18.781a4.369 4.369 0 012.674 1.36l14.072-5.121.855 2.349-13.811 5.026A4.377 4.377 0 0111.875 30 4.377 4.377 0 017.5 25.625c0-1.704.976-3.181 2.399-3.904zm1.976 2.264a1.641 1.641 0 11-.002 3.282 1.641 1.641 0 01.002-3.282zm7.249-15.362l5.959-2.17 3.42 9.397-14.258 5.19-3.42-9.397 5.949-2.166 1.656 4.55 2.349-.856-1.655-4.548zm.671-1.575l-9.398 3.42L7.833 3.42 17.23 0l2.565 7.048z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_1_237">
          <path fill="#fff" d="M0 0H30V30H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function FlowerFrame() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M1.25 18.75c5.094-1.401 11.887.631 13.75 7.5 2.481-7.424 9.941-8.814 13.75-7.5C25.666 20.655 24.379 30 15 30S4.391 20.661 1.25 18.75zM11.504 3.649A3.669 3.669 0 0115.17 0a3.67 3.67 0 013.667 3.649A3.67 3.67 0 0123.831 5a3.668 3.668 0 01-1.327 5 3.668 3.668 0 011.327 5 3.67 3.67 0 01-4.994 1.351A3.669 3.669 0 0115.17 20a3.669 3.669 0 01-3.666-3.649A3.67 3.67 0 016.51 15a3.669 3.669 0 011.328-5A3.669 3.669 0 016.51 5a3.67 3.67 0 014.994-1.351zM15 6.875a3.126 3.126 0 010 6.25 3.126 3.126 0 010-6.25z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);
  return (
    <div>
     <Navbar/>
     <Hero/>
       {/* Features Section (highlighted part) */}
       <div className="bg-[#F7D6E0] py-6 max-w-full w-full px-4">

          <div className="flex flex-col md:flex-row justify-around space-y-4 md:space-y-0 items-center md:items-start">
            {/* First Feature */}
            <div className="flex items-center space-x-4">
              <LayerFrame className="text-3xl text-black" />
              <div className="text-left">
                <h3 className="text-lg font-bold text-black">Variety Available</h3>
                <p className="text-sm text-black">Tons of flower types available</p>
              </div>
            </div>
  
            {/* Second Feature */}
            <div className="flex items-center space-x-4 ml-3 md:ml-0">
              <BoxFrame className="text-3xl text-black" />
              <div className="text-left">
                <h3 className="text-lg font-bold text-black">West Yorkshire</h3>
                <p className="text-sm text-black">Delivery and Collection available</p>
              </div>
            </div>
  
            {/* Third Feature */}
            <div className="flex items-center space-x-4">
              <FlowerFrame className="text-3xl text-black" />
              <div className="text-left">
                <h3 className="text-lg font-bold text-black">Customisable flower</h3>
                <p className="text-sm text-black">Arrangement to specific needs</p>
              </div>
            </div>

          </div>
        </div>

        <Sneak/>
        <Review/>
        <Feature/>
        <Pricing/>
        <Faq/>
        <Testimonials/>
        <Footer/>
    </div>
  );
}
