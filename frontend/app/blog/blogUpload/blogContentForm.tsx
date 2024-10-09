"use client";

import React, { useState, useEffect, use } from "react";

import "easymde/dist/easymde.min.css";
import { markdownToHtml } from "../../utils/markdown";
import Markdown from "react-markdown";
import { CodeBlock } from "../_components/Code";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import { handleFileUploader } from "@/app/utils/handleFileUploader";
import { uploadBlog } from "../../utils/markdown";
import Loading from "@/app/Components/Loading";
import dynamic from "next/dynamic";
import CoverImage from "../_components/cover-image";

type FormData = {
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  markdown: string;
  fileUrls: string[];
};

// Dynamically import the SimpleMDE editor with SSR disabled
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const BlogContentForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const options = { code: CodeBlock };

  useEffect(() => {
    const fileUrls = localStorage.getItem("fileUrls");
    if (fileUrls) {
      const urls = JSON.parse(fileUrls);
      if (Array.isArray(urls)) {
        setFileUrls(urls);
      }
    }
  }, [files]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    {
      /*const metadata = `---
    title: ${title}
    excerpt: ${excerpt}
    authorName: ${authorName}
    fileUrls: ${fileUrls}
    ---\n
  `;*/
    }
    //const metadatadContent = metadata + content;
    // const html = await markdownToHtml(metadatadContent);

    const formData = {
      title,
      excerpt,
      content: "",
      authorName,
      coverImagePath: coverImage,
      fileUrls,
      markdown: content,
    };
    await uploadBlog(formData as FormData);
    localStorage.removeItem("fileUrls");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (e.target.files) {
      const file = e.target.files[0];

      try {
        const url = await handleFileUploader(e.target.files[0]);
        setFiles([...files, url]);
        localStorage.setItem("fileUrls", JSON.stringify([...files, url]));
        setContent((prevContent) => `${prevContent}\n![${file.name}](${url})`);
      } catch (error) {
        console.error("Error uploading file", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFileUrls([]);
    localStorage.removeItem("fileUrls");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center h-full">
      <form
        onSubmit={handleFormSubmit}
        className="w-full h-full max-w-screen-sm flex flex-col justify-around"
      >
        <div className="flex flex-wrap -mx-3 mb-6 justify-around gap-4 flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Cover Image
          </label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Cover Image url from cloudinary"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Excerpt
          </label>
          <textarea
            className="p-2 border border-gray-300 rounded"
            placeholder="Excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
          <div className="w-full px-3">
            <h4 className="text-lg font-bold mb-2">Content</h4>
            <SimpleMDE value={content} onChange={setContent} />
          </div>
          <div>
            {fileUrls.map((url) => (
              <div key={url} className="flex items-center">
                <span className="ml-2 text-sm">{url}</span>
              </div>
            ))}
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Author Name
          </label>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Upload Image to get back link
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            SUBMIT
          </button>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="reset"
          >
            RESET IMAGES
          </button>
        </div>
      </form>

      {content && (
        <div className="w-full max-w-screen-sm mt-8">
          <h2 className="text-xl font-bold mb-4">Markdown Preview:</h2>
          <Markdown
            className="prose prose-invert min-w-full"
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
      )}
    </div>
  );
};

export default BlogContentForm;
