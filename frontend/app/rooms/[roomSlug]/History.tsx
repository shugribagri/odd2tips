"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "@/app/utils/dateUtils";
import { motion } from "framer-motion";

interface HistoryEntry {
  date: string | null;
  status: string;
  roomId: string;
  _id: string;
}

interface HistroyProps {
  roomId: string | null;
}

interface Error {
  error: string | null;
}

const History: React.FC<HistroyProps> = ({ roomId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `/api/football/get-history?roomId=${roomId}`,
          { withCredentials: true }
        );

        const formattedHistory = response.data.map((entry: HistoryEntry) => ({
          date: entry.date,
          status: entry.status,
          roomId: entry.roomId.toString(),
        }));
        setHistory(formattedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError({ error: "Failed to fetch history" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [roomId]);

  const getLast7Days = () => {
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(formatDate(date));
    }
    return last7Days;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-white shadow rounded-lg p-4"
    >
      <h3 className="text-lg font-semibold text-teal-700 mb-3">Last 7 Days</h3>
      {isLoading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p className="text-red-500">{error.error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {getLast7Days().map((day) => {
            const historyEntry = history.find((entry) => entry.date === day);
            let textColor = "text-gray-400";

            switch (historyEntry?.status) {
              case "W":
                textColor = "text-green-500";
                break;
              case "L":
                textColor = "text-red-500";
                break;
              case "P":
                textColor = "text-gray-500";
                break;
              default:
                break;
            }

            return (
              <motion.li
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between py-2"
              >
                <span className="text-gray-800">{day}</span>
                <motion.span
                  className={`text-lg font-semibold ${textColor}`}
                  animate={{
                    scale: [1, 1.2, 1], // Dance animation
                    rotate: [0, 180, 0], // Dance animation
                    transition: { duration: 1, repeat: Infinity }, // Repeat the dance animation
                  }}
                >
                  {historyEntry?.status || "-"}
                </motion.span>
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
};

export default History;
