"use client";

import { Inter, Roboto } from "next/font/google";
import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});



  export default function Hero() {
    useEffect(() => {
      AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
    }, []);
    return (
      <div
        className={`flex flex-col md:flex-row justify-between items-center text-center md:text-left ${inter.className} bg-[#F2B5D4] py-12 px-6 md:px-14`} id="home"
      >
        {/* Text Section */}
        <div data-aos="fade-up">
        <div className="md:w-1/2 flex flex-col space-y-6 items-center md:items-start">
          <h2 className="text-[#4A051C] font-bold text-lg md:text-black">
            Your Favourite Flower Shop
          </h2>
          <h2 className="text-[#4A051C] font-bold text-5xl md:text-black">
            Petall is Here
          </h2>
          <p className="text-[#4A051C] font-normal text-lg md:text-black">
            This flower shop fits all your occasions. We will cater to all your
            events and we specialise in wedding and bridal events.
          </p>
  
          {/* Buttons Section */}
          <div className={`flex space-x-4 ${roboto.className}`}>
            <button className="bg-black text-white py-2.5 px-5 rounded-xl font-normal md:bg-[#4A051C] md:border md:border-black hover:bg-gray-900 md:hover:bg-purple-600 duration-100">
              Our Products
            </button>
            <button className="border border-[#4A051C] text-[#4A051C] py-2.5 px-5 rounded-xl font-normal md:border-black md:text-black hover:bg-pink-200 duration-100">
              Message Us
            </button>
          </div>
        </div>
        </div>
       

  
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-11 md:mt-0">
          {/* For mobile use the first image, and for desktop screens, switch to the provided one */}
          <div data-aos="fade-up">
          <Image
            src="https://i.ibb.co/n3gqV6N/image.png" // Mobile image
            alt="Flower Bouquet"
            className="rounded-xl block md:hidden"
            width={500}
            height={500}
            objectFit="cover"
          />
          </div>  
          <div data-aos="fade-up">
          <Image
            src="https://i.ibb.co/FBKJhMc/image.png" // Desktop image
            alt="Flower Bouquet Desktop"
            className="rounded-xl hidden md:block"
            width={675}
            height={700}
            objectFit="cover"
          />
        </div>
        </div>
        </div>
    );
  }
  