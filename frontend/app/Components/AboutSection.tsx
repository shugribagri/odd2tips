"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="px-4 pb-12 h-full md:h-[80vh] flex flex-col items-center justify-center"
    >
      <motion.div
        variants={containerVariants}
        className="text-center mb-4 bg-opacity-20 bg-cover bg-center bg-no-repeat rounded-lg p-6 "
      >
        <motion.h1
          variants={containerVariants}
          className="drop-shadow-lg font-montserrat text-4xl sm:text-5xl md:text-9xl font-extrabold tracking-5 leading-wider md:pr-8 animate-pulse text-teal-500 "
        >
          ODD 2 TIPS
        </motion.h1>
      </motion.div>
      <motion.div
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center font-montserrat "
      >
        <motion.p
          variants={containerVariants}
          className="drop-shadow-lg text-2xl md:text-5xl text-teal-500  mb-4 tracking-wider leading-wider "
        >
          Tipster-led rooms, exclusive odds, and dynamic betslip downloads.
          Subscribe for insights, growth hacks, and digital edge.
        </motion.p>
        <Link href="/rooms">
          <motion.a
            variants={containerVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-block tracking-tighter text-md sm:text-lg md:text-2xl bg-teal-500 text-[whitesmoke] rounded-lg px-4 py-2 font-bold shadow-lg  hover:scale-110 transition-colors"
          >
            Explore Tipsters
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
