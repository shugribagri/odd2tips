import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

const Contact: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <div className="max-w-4xl mx-auto rounded-lg  h-full  bg-gray-200 text-gray-700 py-24">
        <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
          <div className="pb-8 flex flex-col justify-center items-center">
            <p className="text-3xl sm:text-5xl font-Inter font-bold inline text-teal-600">
              Contact
            </p>
            <p className="py-6 text-1xl font-playfair text-slate-800">
              Submit the form below to get in touch with us
            </p>
          </div>

          <div className=" flex justify-center items-center">
            <form
              action="https://getform.io/f/ae834033-cf08-4bdf-abdc-879e5999abb2"
              method="POST"
              className=" flex flex-col w-full md:w-3/4"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                className="my-4 p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-m focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Enter your message"
                rows={10}
                className="p-2 bg-gray-700 text-[whitesmoke] border-2 rounded-md focus:outline-none"
              ></textarea>

              <button className="text-[whitesmoke] bg-teal-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
                Let&apos;s talk
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
