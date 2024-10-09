"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/app/Components/Loading";

const Tipster = () => {
  const { shorturl } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortenedLink = async () => {
      try {
        const response = await axios.get(`/api/shortenedLinks/${shorturl}`);
        const originalUrl = response.data.originalUrl;
        if (originalUrl) {
          router.push(originalUrl);
        } else {
          console.error("Original URL not found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching shortened link:", error);
        setLoading(false);
      }
    };

    fetchShortenedLink();
  }, [shorturl, router]);

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p>Original URL not found. Please check the link and try again.</p>
    </div>
  );
};

export default Tipster;
