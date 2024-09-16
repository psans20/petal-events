"use client";

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Inter } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    'What types of flowers are in season?',
    'What is the cost of the flowers and overall floral services?',
    'Can you work with my wedding theme or color scheme?',
    'How far in advance should I place my order?',
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);

  return (
    <div className={`flex flex-col items-center text-center py-12 px-6 ${inter.className}`} id="faq">
           <div data-aos="fade-up" className="space-y-6">
      <h1 className="text-black font-bold text-4xl">FAQs</h1>
      <p className="text-black font-normal text-lg mt-2">
        Give a quick introduction to your FAQs
      </p>
      </div>
      
      <div className="w-full max-w-xl mt-6 space-y-8">
      <div data-aos="fade-up" className="space-y-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#4A051C] bg-[#F7D6E0] p-4 rounded-2xl cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-black font-medium">{faq}</h3>
              {openIndex === index ? <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 20 16" fill="none" transform="rotate(180)">
  <g clip-path="url(#clip0_5_266)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3708 3.38892L10 12.3727L0.650833 3.38892L0 3.77579L10 13.3889L20 3.76954L19.3708 3.38892Z" fill="#2F5244"/>
  </g>
  <defs>
    <clipPath id="clip0_5_266">
      <rect width="15" height="20" fill="white" transform="matrix(0 1 -1 0 20 0.888916)"/>
    </clipPath>
  </defs>
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 20 16" fill="none">
  <g clip-path="url(#clip0_5_266)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3708 3.38892L10 12.3727L0.650833 3.38892L0 3.77579L10 13.3889L20 3.76954L19.3708 3.38892Z" fill="#2F5244"/>
  </g>
  <defs>
    <clipPath id="clip0_5_266">
      <rect width="15" height="20" fill="white" transform="matrix(0 1 -1 0 20 0.888916)"/>
    </clipPath>
  </defs>
</svg>}
            </div>
            {openIndex === index && (
              <div className="mt-4 text-left text-gray-700">
                {/* Placeholder text, you can replace it with actual content */}
                <p>
                  This is where the answer to the question will be placed. You can provide as detailed an answer as necessary.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
