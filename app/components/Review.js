import { Inter, Roboto } from "next/font/google";
import { FaStar } from "react-icons/fa"; // Import for the star icon
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const inter = Inter({
  weight: ["400", "700", "600"],
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Review() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);
  return (
    <div className={`px-6 py-16 flex flex-col items-center text-center space-y-6 ${inter.className} bg-[#F7D6E0] md:bg-[#F5F5F5]`}>
      {/* Star Rating */}
      <div data-aos="fade-up">
      <div className="flex justify-center space-x-1 text-yellow-400">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      </div>

      {/* Review Text */}
      <div data-aos="fade-up">
      <p className={`font-normal text-lg ${inter.className} max-w-2xl`}>
        "Petall is amazing! The variety of fresh flowers is impressive. Ordering online was easy, and the delivery was right on time. The blooms were vibrant and fragrant, lasting much longer than I expected. Excellent service and beautiful flowers!"
      </p>
      </div>

      {/* Author Details */}
      <div data-aos="fade-up">
      <div className={`${roboto.className} pt-8`}>
        <h2 className="font-bold text-lg">Emily Carter</h2>
        <h3 className="font-normal text-md">Marketing Manager, Bloom Solutions</h3>
      </div>
      </div>
    </div>
  );
}
