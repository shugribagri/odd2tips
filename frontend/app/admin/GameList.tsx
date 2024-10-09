import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import { getAllPosts } from "@/lib/api";
export const dynamicParams = true;

const GameList: React.FC = async () => {
  const posts = await getAllPosts();

  return <PostList posts={posts} />;
};

export default GameList;
