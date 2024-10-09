import React from "react";
import "easymde/dist/easymde.min.css";
import BlogContentForm from "./blogContentForm";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

const BlogUpload = async () => {
  return (
    <>
      <GoogleTagManager gtmId="G-2242Y4EH8R" />
      <Navbar />
      <main className="container mx-auto p-4 text-teal-500">
        <h1 className="text-3xl font-bold text-center py-4 ">
          Upload your Blog
        </h1>
        <BlogContentForm />
      </main>
      <Footer />
    </>
  );
};

export default BlogUpload;
