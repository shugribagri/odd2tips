import React from "react";
import Container from "@/app/blog/_components/container";
import { PostBody } from "@/app/blog/_components/post-body";
import { PostHeader } from "@/app/blog/_components/post-header";
import { Post } from "@/interfaces/post";
interface PostComponentProps {
  title: string;
  coverImagePath: string;
  date: string;
  authorName: string;
  authorImagePath: string;
  markdown: string;
}

const PostsComponent = ({ post }: { post: Post }) => {
  return (
    <Container>
      <article className="pb-32 pt-4">
        <PostHeader
          title={post.title}
          coverImage={post.coverImagePath}
          date={new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          author={{
            name: post.authorName,
            picture: post.authorImagePath || "/logo.png",
          }}
        />
        <PostBody content={post.markdown} />
      </article>
    </Container>
  );
};

export default PostsComponent;
