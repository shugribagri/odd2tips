"use client";

import React, { useState } from "react";
import axios from "axios";

interface ShareRoomButtonProps {
  roomId: string;
  roomSlug: string;
  adminId: string;
  roomTitle: string;
}

const ShareRoomButton: React.FC<ShareRoomButtonProps> = ({
  roomId,
  roomSlug,
  adminId,
  roomTitle,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleShare = async () => {
    const currentUrl = window.location.origin;
    const roomUrl = `${currentUrl}/rooms/${encodeURIComponent(
      roomSlug
    )}?roomId=${roomId}&roomTitle=${roomTitle}&adminId=${adminId}`;

    try {
      const response = await axios.post("/api/shortenedLinks", {
        originalUrl: roomUrl,
      });

      const shortUrl = window.location.origin + "/" + response.data.shortUrl;
      setShortenedUrl(shortUrl);
      setShowModal(true);

      navigator.clipboard.writeText(shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleShare}
        className="text-sm md:text-md mt-4 px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-200 transition-colors"
      >
        Share Room
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-slate-800 p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Share Room</h2>
            <p className="mb-4">Here is your shortened URL:</p>
            <input
              type="text"
              value={shortenedUrl}
              readOnly
              className="border p-2 w-full text-black"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareRoomButton;
