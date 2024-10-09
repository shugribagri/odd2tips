import Image from "next/image";
import Link from "next/link";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-slate-800  py-20 w-full mx-auto md:w-[80vw] md:h-[100vh] flex flex-col items-center justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto h-[90%] bg-slate-800 shadow md:text-lg">
        {/* About Section */}
        <div className="flex flex-col text-slate-200 md:pt-[45%] items-center">
          <Image src="/logo.png" alt="Logo-SVG" width={100} height={100} />
          <p className="text-center text-white w-[70%]">
            Get the latest trending news in the football world. Stay updated
            with the latest news, fixtures, and results.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col text-white md:pt-[50%] items-center">
          <h2 className="font-bold text-lg mb-2 text-teal-500">Quick Links</h2>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-4">
            <div>
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="hover:underline">
                  Tipster Rooms
                </Link>
              </li>
              <li>
                <Link href="/betslip" className="hover:underline">
                  Betslip
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  News
                </Link>
              </li>
            </div>

            <div>
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 transition duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-600 transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-indigo-600 transition duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="hover:text-indigo-600 transition duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
            </div>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:pt-[50%]  items-center">
          <h2 className="font-bold text-lg mb-2 text-teal-500">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <BsTwitterX />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaTiktok />
            </a>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col text-teal-500 md:pt-[50%] pb-4 items-center">
          <h2 className="font-bold text-lg mb-2 ">Contact Us</h2>
          <ul>
            <li className="text-white">Email: oddtwotips@gmail.com</li>
            {/*<li>Phone: +254 700 566 210</li>*/}
          </ul>
        </div>
      </div>

      {/* Legal Notice */}
      <div className="text-center mt-8 pt-4 text-teal-500">
        <p>&copy; {new Date().getFullYear()} Odd2Tips. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
