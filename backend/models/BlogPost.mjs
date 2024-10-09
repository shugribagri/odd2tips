import mongoose from "mongoose";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

const blogPostSchema = new mongoose.Schema({
  title: String || null,
  content: String || null,
  markdown: String || null,
  authorName: String || null,
  excerpt: String || null,
  fileUrls: [String] || null,
  coverImagePath: String || null,
  authorImagePath: String || null,
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
});

blogPostSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
