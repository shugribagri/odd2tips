import cloudinary from "../utils/cloudinaryConfig.mjs";
import BlogPost from "../models/BlogPostTest.mjs";

const handleFileUpload = async (req, res) => {
  try {
    const {
      title,
      content,
      authorName,
      coverImagePath,
      excerpt,
      markdown,
      fileUrls,
    } = req.body;

    const blogPost = new BlogPost({
      title,
      content,
      authorName,
      coverImagePath,
      fileUrls,
      excerpt,
      markdown,
    });

    await blogPost.save();

    res.status(200).json({
      message: "Files uploaded and post saved successfully!",
      data: blogPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving the blog post" });
  }
};

export { handleFileUpload };
