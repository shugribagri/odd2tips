import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import { HeroPost } from "@/app/blog/_components/hero-post";
import { MoreStories } from "@/app/blog/_components/more-stories";
export const dynamicParams = true;

interface FetchProps {
  heroPost: Post;
  morePosts: Post[];
}

const Fetch = async ({ heroPost, morePosts }: FetchProps) => {
  return (
    <>
      <HeroPost post={heroPost} />
      <MoreStories posts={morePosts} />
    </>
  );
};

export default Fetch;
