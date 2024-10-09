import cloudinary from "../utils/cloudinaryConfig.mjs";

const uploadFile = async (req, res) => {
  let blogImage = null;

  try {
    if (req.files) {
      const blogImageUrl = req.files.file[0].path;

      const result = await cloudinary.uploader.upload(blogImageUrl);

      blogImage = result.url;
    }
    res.status(200).json({ url: blogImage });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default uploadFile;
