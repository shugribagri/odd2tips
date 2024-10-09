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

const blogPostTestSchema = new mongoose.Schema({
  title: String || null,
  content: String || null,
  markdown: String || null,
  authorName: String || null,
  excerpt: String || null,
  fileUrls: [String] || null,
  coverImagePath: String || "",
  authorImagePath: String || null,
  date: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
});

blogPostTestSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title);
  }
  next();
});

const BlogPostTest = mongoose.model("BlogPostTest", blogPostTestSchema);

export default BlogPostTest;
