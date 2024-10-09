"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DownloadBanner: React.FC = () => {
  const titleVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const infoVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section className="max-w-4xl mx-auto p-6 text-center">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4"
      >
        <motion.h1
          variants={titleVariants}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-teal-600"
        >
          Create & Customize Your Betslips
        </motion.h1>
        <motion.p
          variants={infoVariants}
          transition={{ duration: 0.8 }}
          className="text-lg text-teal-600"
        >
          Download high-quality betslips tailored to your style without
          registration.
        </motion.p>
        <motion.div
          variants={infoVariants}
          transition={{ duration: 0.8 }}
          className="inline-block"
        >
          <Image
            src="/assets/betslip/betslip-banner.png"
            alt="Betslip Banner"
            width={500}
            height={300}
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DownloadBanner;
