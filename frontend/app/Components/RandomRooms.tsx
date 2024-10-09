import React from "react";
import VisitRoomButton from "../rooms/VisitRoomButton";
import ShareRoomButton from "../rooms/ShareRoomButton";
import { fetchRandomRoom } from "@/lib/api";
import { Room } from "@/interfaces/room";

const RoomsList = async () => {
  const rooms: Room[] = await fetchRandomRoom();
  return (
    <div className=" h-full w-full ">
      <div className="  ">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="p-4 border  shadow-lg bg-teal-800  h-[35vh] w-full  overflow-y-auto"
          >
            <h3 className="md:text-xl text-md font-bold text-[whitesmoke]">
              {room.title}
            </h3>
            <p className="text-gray-400 mt-2 md:h-[15vh] h-[10vh] md:overflow-hidden text-sm md:text-lg">
              {room.description}
            </p>
            <div className="mt-2">
              <span className="px-1 py-1 text-[8px] sm:text-[12px] md:text-xs rounded bg-slate-300 text-gray-800">
                {room.privacy.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <VisitRoomButton
                roomId={room._id}
                adminId={room.adminId}
                roomTitle={room.title}
                roomSlug={room.slug}
              />
              <ShareRoomButton
                roomId={room._id}
                roomSlug={room.slug}
                adminId={room.adminId}
                roomTitle={room.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
