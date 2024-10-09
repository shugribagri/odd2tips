import React from "react";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./date-formatter";
import { Post } from "@/interfaces/post";

type Props = Post;

export function PostPreview({
  title,
  coverImagePath,
  date,
  excerpt,
  authorName,
  authorImagePath,
  slug,
}: Props) {
  const fullCoverImagePath = coverImagePath.startsWith("http")
    ? coverImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${coverImagePath}`;
  let fullAuthorImagePath = "/logo.png";
  if (authorImagePath) {
    fullAuthorImagePath = authorImagePath.startsWith("http")
      ? authorImagePath
      : `${process.env.NEXT_PUBLIC_BASE_PATH}${authorImagePath}`;
  }

  return (
    <div className="post-preview">
      <div className="mb-5">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          <Image
            src={fullCoverImagePath}
            alt={`Cover Image for ${title}`}
            className="cover-image md:h-[40vh] object-cover hover:shadow-lg transition-shadow duration-200"
            width={1300}
            height={630}
          />
        </Link>
      </div>
      <h3 className="text-3xl mb-3 leading-snug text-teal-500">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4 text-teal-500 font-playfair">
        <DateFormatter dateString={date} />
      </div>
      <Link className="hover:underline" href={`/posts/${slug}`}>
        <p className="text-lg leading-relaxed  mb-4 text-teal-400 ">
          {excerpt}
        </p>
      </Link>
      <div className="author flex items-center">
        <img
          src={fullAuthorImagePath}
          alt={authorName}
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="text-teal-500">{authorName}</span>
      </div>
    </div>
  );
}
