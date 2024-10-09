import React from "react";
import "easymde/dist/easymde.min.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import { CodeBlock } from "../_components/Code";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  const options = { code: CodeBlock };
  return (
    <div
      className="max-w-2xl mx-auto text-teal-500 leading-10 tracking-wide first-line:uppercase first-line:tracking-widest
  md:first-letter:text-7xl first-letter:text-4xl first-letter:font-bold 
  first-letter:mr-1 first-letter:float-left"
    >
      <Markdown
        className="prose min-w-full"
        components={options}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSanitize,
          [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
        ]}
      >
        {content}
      </Markdown>
    </div>
  );
}
