import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import AOS from "aos";
import pink from '../images/pink-flower.png';
import red from '../images/red-flower.png';
import rose from '../images/rose-flower.png';
import yellow from '../images/yellow-flower.png';
import "aos/dist/aos.css";
import { useEffect } from 'react';

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function SneakPeek() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);
  return (
    <div className={`flex flex-col items-center text-center py-12 px-4 ${inter.className}`}>
      {/* Header Section */}
      <div data-aos="fade-up">
      <div className="space-y-4 mt-6">
        <h2 className="text-black font-bold text-4xl">Sneak Peek</h2>
        <p className="text-black font-normal text-lg">
          Here you show your best flower products for the user to quickly see what you sell
        </p>
      </div>
      </div>

      {/* Product Cards */}
      <div data-aos="fade-up">
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-16 md:mt-20">
        {/* First Product */}
        <div className="bg-[#F7D6E059] rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={pink}
              alt="Pink Flowers"
              className="rounded-lg object-cover"
              fill
            />
          </div>
          <h3 className="text-black font-medium text-lg mt-4">PINK FLOWERS</h3>
          <p className="text-gray-600 text-sm">Variant</p>
          
          <Link href="/product" passHref>
  <button className="mt-6 bg-[#4A051C] text-white font-medium py-2 px-32 md:px-20 rounded-lg w-full hover:bg-[#731635] duration-100">
    Buy Now
  </button>
</Link>
        </div>

        {/* Second Product */}
        <div className="bg-[#F7D6E059] rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={rose}
              alt="Red Flowers"
              className="rounded-lg object-cover"
              fill
            />
          </div>
          <h3 className="text-black font-medium text-lg mt-4">RED FLOWERS</h3>
          <p className="text-gray-600 text-sm">Variant</p>
          <Link href="/product" passHref>
  <button className="mt-6 bg-[#4A051C] text-white font-medium py-2 px-32 md:px-20 rounded-lg w-full hover:bg-[#731635] duration-100">
    Buy Now
  </button>
</Link>
        </div>

          {/* Third Product */}
          <div className="bg-[#F7D6E059] rounded-lg shadow-md p-6 flex flex-col items-center">
          <div className="relative w-[300px] h-[300px]">
            <Image
              src={yellow}
              alt="Yellow Flowers"
              className="rounded-lg object-cover"
              fill
            />
          </div>
          <h3 className="text-black font-medium text-lg mt-4">YELLOW FLOWERS</h3>
          <p className="text-gray-600 text-sm">Variant</p>
          <Link href="/product" passHref>
  <button className="mt-6 bg-[#4A051C] text-white font-medium py-2 px-32 md:px-20 rounded-lg w-full hover:bg-[#731635] duration-100">
    Buy Now
  </button>
</Link>
        </div>

      </div>
      </div>
    </div>
  );
}
