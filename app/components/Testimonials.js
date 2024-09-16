import { Inter } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);
  return (
    <div className={`bg-[#F7D6E0] md:bg-[#F5F5F5] py-12 px-6 ${inter.className}`}>
      <div className="text-center space-y-4 md:space-y-8 mt-4 md:mt-12">
      <div data-aos="fade-up" className="space-y-4">
        <h2 className="text-black font-bold text-4xl">Customer testimonials</h2>
        <p className="text-black text-lg">
          Here are what our customers said about our products.
        </p>
        </div>
      </div>

      {/* Container for Testimonials */}
      <div className="mt-8 md:mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-24">
        {/* First Testimonial */}
        <div data-aos="fade-up" className="space-y-4">
        <div className="bg-[#FCF1F4] md:bg-transparent border border-black p-6 rounded-xl md:rounded-none md:py-12 shadow-lg">
          <div className="flex justify-center mb-4">
            {/* Star Ratings */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFD700"
                  viewBox="0 0 24 24"
                  strokeWidth={0.5}
                  stroke="#4A051C"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2.25l2.528 7.79h8.185l-6.614 4.804 2.528 7.79L12 17.79l-6.614 4.804L7.914 15.09 1.3 10.286h8.185L12 2.25z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-black text-lg">
            "Absolutely thrilled with my purchase! The flowers arrived fresh and
            beautifully arranged. The website was easy to navigate, and the
            delivery was timely. Will definitely order again soon!"
          </p>
          <div className="mt-4">
            <h3 className="text-black font-bold">Sarah Mitchell</h3>
            <p className="text-black">Creative Director, Essence Designs</p>
          </div>
          </div>
        </div>

        {/* Second Testimonial */}
        <div data-aos="fade-up">
        <div className="bg-[#FCF1F4] md:bg-transparent border border-black p-6 rounded-xl md:rounded-none md:py-12 shadow-lg">
          <div className="flex justify-center mb-4">
            {/* Star Ratings */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFD700"
                  viewBox="0 0 24 24"
                  strokeWidth={0.5}
                  stroke="#4A051C"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2.25l2.528 7.79h8.185l-6.614 4.804 2.528 7.79L12 17.79l-6.614 4.804L7.914 15.09 1.3 10.286h8.185L12 2.25z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-black text-lg">
            "The service was excellent, and the flowers were stunning. They
            stayed fresh for days, and the arrangement was just as pictured.
            Highly recommend this online flower shop!"
          </p>
          <div className="mt-4">
            <h3 className="text-black font-bold">Jason Reed</h3>
            <p className="text-black">Operations Manager, Floral Harmony Co.</p>
          </div>
        </div>
        </div>

        {/* Third Testimonial */}
        <div data-aos="fade-up">
        <div className="bg-[#FCF1F4] md:bg-transparent border border-black p-6 rounded-xl md:rounded-none md:py-12 shadow-lg">
          <div className="flex justify-center mb-4">
            {/* Star Ratings */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FFD700"
                  viewBox="0 0 24 24"
                  strokeWidth={0.5}
                  stroke="#4A051C"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2.25l2.528 7.79h8.185l-6.614 4.804 2.528 7.79L12 17.79l-6.614 4.804L7.914 15.09 1.3 10.286h8.185L12 2.25z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-black text-lg">
            "The flowers were beautiful, and the service was fantastic. They
            lasted for days, and the arrangement looked exactly like the
            photos. I highly recommend this flower shop for any occasion!"
          </p>
          <div className="mt-4">
            <h3 className="text-black font-bold">Charlie Huska</h3>
            <p className="text-black">Floral Agriculturist</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
