import BlogPost from "../models/BlogPost.mjs";
import BlogPostTest from "../models/BlogPostTest.mjs";
import TwitterDB from "../models/TwitterDB.mjs";
import markdownIt from "markdown-it";

const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getAllPostsTest = async (req, res) => {
  try {
    const posts = await BlogPostTest.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getAllPostsTestSlugs = async (req, res) => {
  try {
    const posts = await BlogPostTest.find().sort({ date: -1 });
    const slugs = posts.map((post) => post.slug);
    res.json(slugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getPostsByToday = async (req, res) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");

    const startOfDay = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    const endOfDay = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

    const posts = await BlogPostTest.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const getPostsByLimit = async (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;

  const offset = (page - 1) * limit;

  try {
    const posts = await BlogPostTest.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    const totalPosts = await BlogPostTest.countDocuments();

    const hasMore = posts.length === limit && offset + limit < totalPosts;

    res.json({
      posts,
      hasMore,
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

const addToTwitterDB = async (req, res) => {
  try {
    const { post } = req.body;

    const newPost = new TwitterDB(post);
    const resp = await newPost.save();
    console.log(resp);
    res.status(201).json({ message: "Post added to TwitterDB successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding post to TwitterDB" });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

const getPostBySlugTest = async (req, res) => {
  try {
    const post = await BlogPostTest.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

const deletePostBySlugTest = async (req, res) => {
  try {
    const post = await BlogPostTest.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

const fetchAndModifyBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();

    blogPosts.forEach(async (post) => {
      if (!post.markdown) {
        post.markdown = post.content;
      }

      if (!post.excerpt) {
        post.excerpt = post.content.slice(0, 200);
      }

      if (!post.fileUrls) {
        post.fileUrls = [post.coverImagePath];
      }

      await post.save();
    });

    console.log("BlogPosts modified successfully");
  } catch (error) {
    console.error("Error modifying BlogPosts:", error);
  }
};

const getRandomAndDeleteFromTwitterDB = async (req, res) => {
  try {
    const posts = await TwitterDB.find();
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts available in TwitterDB" });
    }

    const randomIndex = Math.floor(Math.random() * posts.length);
    const randomPost = posts[randomIndex];

    await TwitterDB.deleteOne({ _id: randomPost._id });

    res.json([randomPost]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching and deleting post from TwitterDB" });
  }
};

const convertContentToMarkdown = async (req, res) => {
  const md = new markdownIt();
  try {
    const blogPosts = await BlogPost.find();

    for (const post of blogPosts) {
      post.content = md.render(post.content);
      await post.save();
    }

    console.log("Content converted to markdown successfully");
    res
      .status(200)
      .json({ message: "Content converted to markdown successfully" });
  } catch (error) {
    console.error("Error converting content to markdown:", error);
    res.status(500).json({ message: "Failed to convert content to markdown" });
  }
};

export {
  getAllPosts,
  getPostBySlug,
  getAllPostsTest,
  getAllPostsTestSlugs,
  getPostsByToday,
  getPostsByLimit,
  getPostBySlugTest,
  fetchAndModifyBlogPosts,
  convertContentToMarkdown,
  deletePostBySlugTest,
  addToTwitterDB,
  getRandomAndDeleteFromTwitterDB,
};
