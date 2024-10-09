import { Post } from "@/interfaces/post";

const BASE_URL = "http://localhost:8888";
// const BASE_URL = "https://odd2tips.onrender.com";

export async function getAllPosts() {
  const res = await fetch(`${BASE_URL}/api/blog/posts-test`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function deletePostBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/blog/posts-test/${slug}`, {
    method: "DELETE",
  });
  return res.ok;
}

export async function addToTwitterDB(post: Post) {
  const res = await fetch(`${BASE_URL}/api/blog/add-to-twitter-db`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.ok;
}
