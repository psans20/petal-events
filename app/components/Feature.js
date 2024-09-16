import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function Feature() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and trigger it only once
  }, []);
  return (
    <div className="flex flex-col items-center text-left gap-10 md:gap-0 md:text-left py-12 px-4 md:flex-row md:px-28" id="features">
      
      {/* Image Section for Mobile & Desktop */}
      
      <div className="md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0 order-4">
      <div data-aos="fade-up">
        <Image
          src="https://i.ibb.co/FBKJhMc/image.png" // Image URL for the feature
          alt="Flower Bouquet"
          className="rounded-xl"
          width={500}
          height={500}
          objectFit="cover"
        />
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 md:ml-8 md:order-5">
      <div data-aos="fade-up">
        <h2 className="text-black font-bold text-3xl md:text-4xl">
          100% gurantee on every order
        </h2>
        <p className="text-black font-normal text-lg mt-4">
          We aim for 100% customer satisfaction. If you have any issues, our
          customer support will do everything they can to resolve your issues.
        </p>

        {/* Bullet Points */}
        <ul className="mt-4 space-y-2 hidden md:block">
          <li className="flex items-start space-x-2">
            <span>✅</span>
            <p className="text-black text-lg">Fresh flowers from the country side.</p>
          </li>
          <li className="flex items-start space-x-2">
            <span>✅</span>
            <p className="text-black text-lg">Deep red colour</p>
          </li>
          <li className="flex items-start space-x-2">
            <span>✅</span>
            <p className="text-black text-lg">Suitable for all occasions</p>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}
