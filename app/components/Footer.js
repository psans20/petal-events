import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function Footer() {
    return (
        <div className="bg-[#F7D6E0] py-8 px-4 text-black">
            {/* Main footer content */}
            <div className="flex flex-col items-center space-y-4">
                {/* Logo */}
                <div className="text-4xl font-bold text-black flex flex-col items-center">
                    <img src="https://i.ibb.co/7rRH8P1/image.png" className="w-28 mb-2" alt="Petal Logo" />
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4 text-2xl">
                    <a href="https://www.instagram.com/petall.events/" target="_blank"><FaInstagram className="cursor-pointer hover:text-gray-700" /></a>

                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6 font-semibold text-center">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">Features</a>
                    <a href="#" className="hover:underline">Pricing</a>
                    <a href="#" className="hover:underline">FAQ</a>
                </nav>
            </div>

            {/* Footer Bottom Links */}
            <div className="flex flex-col items-center space-y-2 mt-6 text-sm">
                <div className="flex space-x-4">
                    <a href="#" className="underline">Privacy Policy</a>
                    <a href="#" className="underline">Terms of Service</a>
                    <a href="#" className="underline">Refund Policy</a>
                </div>
                <p className="text-center">© 2024 Petall. All rights reserved. Developed by Weblift Services</p>
            </div>
        </div>
    );
}
