"use client";

import React, { useState, useRef, useEffect, use } from "react";
import axios from "axios";
import { connectSocket, sendMessage, useSocket } from "../utils/socket";
import LoginModal from "./LoginModal";
import { CgProfile } from "react-icons/cg";

const Chat = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { IoMdArrowDropdown } = require("react-icons/io");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`/api/auth/checkAuth`);
        setIsAuthenticated(response.data.isAuthenticated);
        setToken(response.data.token);
      } catch (error) {
        // console.error("Error checking authentication status:", error);
      }
    };
    checkAuthStatus();
    connectSocket(token);
  }, [token]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `/api/chat/messages?page=${currentPage}`
        );

        setMessages(response.data.messages.concat(messages));
        if (!response.data.hasMore) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [currentPage]);
  useEffect(() => {}, []);

  useSocket("chat message", (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  /* useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);*/

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {showLoginModal && <LoginModal onClose={handleModalClose} />}

      <div className="flex flex-col h-screen w-full  mx-auto rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-teal-400 p-4 text-white font-semibold flex justify-between items-center">
          <span>Fan Zone</span>
          <div className="flex items-center bg-white text-blue-800 rounded-full px-3 py-1 text-xs font-bold">
            <span className="text-sm md:text-md p-1">Live</span>
            <span className="animate-pulse bg-red-500 rounded-full w-3 h-3 mr-2"></span>
          </div>
        </div>

        <div
          className="flex-1 p-4 overflow-y-auto"
          style={{
            backgroundImage: "url('/football_bg.jpg')",
            backgroundSize: "cover",
          }}
        >
          {hasMore && (
            <button
              onClick={loadMoreMessages}
              className="mx-auto my-2 text-white bg-blue-500 hover:bg-blue-600 font-semibold py-1 px-4 rounded inline-flex items-center"
            >
              <IoMdArrowDropdown className="mr-2" />
              Load more messages
            </button>
          )}
          <ul>
            {messages.map((msg, index) => (
              <li
                key={index}
                className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-md mb-2 shadow"
              >
                <div className="flex items-center p-2">
                  {msg.userProfilePicture ? (
                    <img
                      src={msg.userProfilePicture}
                      alt={msg.userName || "User"}
                      className="rounded-full w-8 h-8 mr-2"
                    />
                  ) : (
                    <CgProfile className="w-8 h-8 mr-2 text-[whitesmoke]" />
                  )}
                  <span className="font-semibold mr-2 text-[whitesmoke]">
                    {msg.userName || msg.user}
                  </span>
                  {msg.createdAt ? (
                    <span className="ml-auto text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  ) : (
                    <span className="ml-auto text-xs text-gray-500">
                      A long time ago
                    </span>
                  )}
                </div>
                <div className="px-2 pb-2 text-white">{msg.content}</div>
              </li>
            ))}

            <div ref={messagesEndRef} />
          </ul>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-gray-50">
          <div className="flex items-center space-x-3">
            <input
              className="flex-1 border p-2 w-full rounded-lg text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
