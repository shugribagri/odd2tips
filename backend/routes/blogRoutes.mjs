import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  getAllPostsTest,
  getAllPostsTestSlugs,
  getPostsByToday,
  getPostsByLimit,
  deletePostBySlugTest,
  getPostBySlugTest,
  fetchAndModifyBlogPosts,
  convertContentToMarkdown,
  addToTwitterDB,
  getRandomAndDeleteFromTwitterDB,
} from "../controllers/blogController.mjs";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:slug", getPostBySlug);
router.get("/posts-test", getAllPostsTest);
router.get("/posts-test-slugs", getAllPostsTestSlugs);
router.get("/posts-limit", getPostsByLimit);
router.get("/posts-test/:slug", getPostBySlugTest);
router.get("/fetch-modify-posts", fetchAndModifyBlogPosts);
router.get("/convert-content-to-markdown", convertContentToMarkdown);
router.get("/posts-today-test", getPostsByToday);
router.delete("/posts-test/:slug", deletePostBySlugTest);
router.post("/add-to-twitter-db", addToTwitterDB);
router.get("/random-post", getRandomAndDeleteFromTwitterDB);

export default router;
