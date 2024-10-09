"use client";

import React from "react";
import Link from "next/link";

interface VisitRoomButtonProps {
  roomId: string;
  adminId: string;
  roomTitle: string;
  roomSlug: string;
}

const VisitRoomButton: React.FC<VisitRoomButtonProps> = ({
  roomId,
  adminId,
  roomTitle,
  roomSlug,
}) => {
  return (
    <Link
      href={`/rooms/${encodeURIComponent(
        roomSlug
      )}?roomId=${roomId}&adminId=${adminId}&roomTitle=${roomTitle}&roomSlug=${roomSlug}`}
    >
      <button className="text-sm md:text-md mt-4 px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-200 transition-colors">
        Visit Room
      </button>
    </Link>
  );
};

export default VisitRoomButton;
