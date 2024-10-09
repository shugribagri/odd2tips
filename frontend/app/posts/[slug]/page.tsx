import Header from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import PostComponent from "./PostsComponent.tsx";
import { getPostBySlug } from "@/lib/api";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Football latest trending news",
  description:
    "Get the latest trending news in the football world. Stay updated with the latest news, fixtures, and results. Top Leagues - English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
  keywords: [
    "football, news, trending, fixtures, results, premier league, la liga, serie a, bundesliga, ligue 1",
  ],
};

interface Post {
  slug: string;
}

interface Params {
  params: {
    slug: string;
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const BASE_URL = process.env.BASE_API_URL;
  const posts = await fetch(`${BASE_URL}/api/blog/posts-test-slugs`, {
    cache: "no-store",
  }).then((res) => res.json());

  return posts.map((post: Post) => ({
    slug: post,
  }));
}

const PostPage = async ({ params }: Params) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div>&quot;Post not found&quot;</div>;
  }

  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Header />
      <main>
        <PostComponent post={post} />
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
