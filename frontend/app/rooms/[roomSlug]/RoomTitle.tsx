"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface RoomTitleComponentProps {
  roomTitle: string;
  userId: string | null;
  roomId: string;
}

const RoomTitleComponent: React.FC<RoomTitleComponentProps> = ({
  roomTitle,
  userId,
  roomId,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    email: string;
    profilePicture: string;
  } | null>(null);
  const [members, setMembers] = useState<string[] | null>(null);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(
          `/api/rooms/isFollowing?userId=${userId}&roomId=${roomId}`
        );
        setIsFollowing(response.data.isFollowing);
        setUserProfile(response.data.profile);
        setMembers(response.data.members);
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [userId, isFollowing]);

  const handleFollow = async () => {
    if (userId) {
      try {
        await axios.get(
          `/api/rooms/updateMembers?userId=${userId}&roomId=${roomId}`
        );

        setIsFollowing(true);
      } catch (error) {
        console.error("Error following the room:", error);
      }
    } else {
      alert("Please sign up and log in to follow this room.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex md:flex flex-col justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-teal-700">{roomTitle}</h1>
      <h1 className="text-teal-700">Members: {members}</h1>
      {isFollowing && userProfile ? (
        <div className="flex items-center space-x-4">
          {/*if(userProfile.profilePicture){" "}
          {
            <Image
              src={userProfile.profilePicture}
              alt="Profile Picture"
              width={50}
              height={50}
              className="rounded-full"
            />
          }{" "}
        else {<FaUserCircle className="text-3xl text-gray-500" />}*/}
          <div>
            <p className="text-lg font-semibold">{userProfile.name}</p>
            <p className="text-sm text-gray-500">{userProfile.email}</p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleFollow}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default RoomTitleComponent;
