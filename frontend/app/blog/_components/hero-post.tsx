import React from "react";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import Image from "next/image";
import cn from "classnames";

export function HeroPost({ post }: { post: Post }) {
  return (
    <section className="hero-post">
      <div className="mb-8">
        <Image
          src={post.coverImagePath}
          alt={`Cover Image for ${post.title}`}
          className={cn(
            "shadow-sm w-full md:h-[60vh] object-cover object-top",
            {
              "hover:shadow-lg transition-shadow duration-200": post.slug,
            }
          )}
          width={1300}
          height={630}
        />
      </div>
      <h3 className="md:text-4xl text-lg md:font-bold font-semibold leading-8 tracking-wide text-teal-500">
        <Link className="hover:underline" href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      </h3>
      <div className="text-lg mb-4 text-teal-500 font-playfair mt-2">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <Link className="hover:underline" href={`/posts/${post.slug}`}>
          <p
            className="text-teal-400 leading-7 tracking-wide mt-2 first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold 
  first-letter:mr-3 first-letter:float-left"
          >
            {post.excerpt}
          </p>
        </Link>
        <div className="author flex items-center mt-4">
          <Link className="hover:underline" href={`/posts/${post.slug}`}>
            <img
              src={post.authorImagePath || "/logo.png"}
              alt={post.authorName}
              className="w-10 h-10 rounded-full mr-4"
            />
          </Link>
          <span className="text-teal-500">{post.authorName}</span>
        </div>
      </div>
    </section>
  );
}
