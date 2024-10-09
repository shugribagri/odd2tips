"use client";

import { useEffect } from "react";
import io from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  console.log("Connecting to socket...");

  socket = io("https://odd2tips.onrender.com", {
    withCredentials: true,
    query: { token: token },
  });

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });
};

export const useSocket = (eventName, cb) => {
  useEffect(() => {
    if (!socket) {
      console.log("No socket connection");
      return;
    }

    socket.on(eventName, cb);

    return () => {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);
};

export const sendMessage = (message) => {
  if (socket) socket.emit("chat message", message);
};
