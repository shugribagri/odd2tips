"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import { IoIosMenu } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ro } from "date-fns/locale";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`/api/auth/checkAuth`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        // console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [router.pathname]);
  setTimeout(() => {
    console.log(isAuthenticated);
  }, 3000);
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navLinks = (
    <>
      <Link
        href="/"
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]   transition-all ease-in-out duration-200 font-semibold md:text-md" // Style changes here
        onClick={() => setIsModalOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/rooms"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-md" // Style changes here
        onClick={() => setIsModalOpen(false)}
      >
        Tipster Rooms
      </Link>
      <Link
        href="/betslip"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        Betslip
      </Link>
      <Link
        href="/blog"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        News
      </Link>
      <Link
        href="/about"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        About Us
      </Link>
      <Link
        href="/contact"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        Contact Us
      </Link>
      <Link
        href="/terms-of-service"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        Terms of Service
      </Link>
      <Link
        href="/policy"
        scroll={false}
        className="block px-4 py-2 text-teal-500 md:text-teal-600 hover:text-[#5e17eb]  transition-all ease-in-out duration-200 font-semibold md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        Privacy Policy
      </Link>

      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="block px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/login"
            scroll={false}
            className="block bg-teal-500 hover:bg-teal-600 rounded-md 0 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
            onClick={() => setIsModalOpen(false)}
          >
            <button className=" text-[whitesmoke] font-bold py-3 px-5 rounded inline-flex items-center">
              <FcGoogle className="mr-2" />
              Login
            </button>
          </Link>
          <Link
            href="/register"
            scroll={false}
            className="block px-4 py-3 mt-2 md:mt-0 rounded-md bg-teal-500 text-white hover:bg-teal-600 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
            onClick={() => setIsModalOpen(false)}
          >
            <button className=" text-[whitesmoke] font-bold rounded inline-flex items-center">
              <FcGoogle className="mr-2" />
              SignUp
            </button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className=" bg-slate-800 pb-4 relative flex flex-col justify-center items-center h-[30vh] md:px-[10vw]  mx-auto">
      <div className=" mx-auto flex justify-between items-center h-[45%] shadow md:shadow-lg w-full bg-slate-800">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              className="cursor-pointer"
              alt="Logo-SVG"
              width={80}
              height={80}
            />
          </Link>
        </div>
        <button
          onClick={toggleModal}
          className="2xl:hidden z-30 text-teal-500 focus:outline-none"
        >
          <IoIosMenu size={45} />
        </button>
        {/* Modal for small screens */}
        {isModalOpen && (
          <div
            className={`fixed top-0 right-0 2xl:hidden w-3/4 bg-white text-black p-4 rounded-md shadow-lg z-20 transition-transform duration-300 ease-in-out ${
              isModalOpen
                ? "translate-x-0 bg-cover bg-no-repeat bg-center"
                : "translate-x-full"
            }`}
            style={{
              marginTop: `calc(10vh + 1rem)`,
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/logo.png')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            {navLinks}
          </div>
        )}
        {/* Static display for larger screens */}
        <div className="hidden 2xl:flex 2xl:items-center 2xl:justify-center 2xl:space-x-4 2xl:pr-4">
          {navLinks}
        </div>
      </div>
      <div className="bg-teal-600 text-[whitesmoke]  font-extrabold text-sm md:text-md 3xl:text-lg flex justify-around items-center flex-wrap    h-[50%] w-[95%] md:w-full">
        <Link href="/rooms">
          <span className="p-2">Predictions</span>
        </Link>
        <Link href="/football/fixtures">
          <span className="p-2">Fixtures</span>
        </Link>
        <Link href="/football/results">
          <span className="p-2">Results</span>
        </Link>
        <Link href="/blog">
          <span className="p-2">Latest News</span>
        </Link>
        <Link href="/betslip">
          <span className="p-2">Create Betslip</span>
        </Link>
        <Link href="/rooms/create">
          <span>Own Room</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
