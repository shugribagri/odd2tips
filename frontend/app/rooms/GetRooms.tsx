import React from "react";
import VisitRoomButton from "./VisitRoomButton";
import ShareRoomButton from "./ShareRoomButton";
import { Room } from "@/interfaces/room";

const RoomsList = async ({ rooms }: { rooms: Room[] }) => {
  return (
    <div className="container mx-auto p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4 text-teal-800">
        Tipster Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   ">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="p-4 border rounded-lg shadow-lg bg-teal-800  h-[35vh]  overflow-y-auto"
          >
            <h3 className="md:text-xl text-md font-bold text-[whitesmoke]">
              {room.title}
            </h3>
            <p className="text-gray-400 mt-2 md:h-[15vh] h-[10vh] overflow-scroll md:overflow-hidden text-sm md:text-lg">
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
