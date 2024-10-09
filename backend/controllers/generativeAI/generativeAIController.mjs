import fs from "fs";
// import GenerativeAIService from "../../services/generativeAIService.mjs";
import BlogPostTest from "../../models/BlogPostTest.mjs";

// const generativeAIService = new GenerativeAIService();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

{
  /* const formatArticles = async (req, res) => {
  try {
    const rawData = fs.readFileSync("cleanedArticles.json", "utf8");
    const articles = JSON.parse(rawData);

    for (const article of articles) {
      const formattedContent = await generativeAIService.formatContent(
        article.content,
        article.title
      );
      article.formattedContent = formattedContent;

      // Sleep for 20 seconds
      await sleep(20000);

      const excerpt = await generativeAIService.generateExcerpt(
        article.content,
        article.title
      );
      article.excerpt = excerpt;

      // Sleep for another 15 seconds
      await sleep(15000);
    }

    fs.writeFileSync(
      "./formattedArticles.json",
      JSON.stringify(articles, null, 2)
    );
    console.log("Articles formatted and saved successfully.");
    res.status(200).json({ message: "Articles formatted successfully" });
  } catch (error) {
    console.error("Error formatting articles:", error);
    res.status(500).json({ message: "Error formatting articles" });
  }
}; */
}

const addImageUrlsAndSaveToDatabase = async (req, res) => {
  try {
    // Read the JSON file (optional, can be used for initial data)
    let articles = [];
    try {
      const rawData = fs.readFileSync("./formattedArticles.json", "utf8");
      articles = JSON.parse(rawData);
    } catch (error) {
      console.warn("Error reading formatted articles from JSON:", error);
    }

    // Iterate through each article
    articles.forEach((article) => {
      let paragraphs = article.formattedContent.split("\n\n");
      let imageIndex = 0;
      let newContent = ""; // Stores the final formatted content

      // Iterate through each paragraph
      for (let i = 0; i < paragraphs.length; i++) {
        // Add paragraph
        newContent += paragraphs[i];

        // Check if there are remaining images (up to 3) and append image
        if (imageIndex < article.imageUrls.length && imageIndex < 3) {
          newContent += `\n\n![Image](${article.imageUrls[imageIndex]})`;
          imageIndex++;
        }

        // Add newline after content and image (except for the last iteration)
        if (i < paragraphs.length - 1) {
          newContent += "\n\n";
        }
      }

      // Update article content with the new format
      article.formattedContent = newContent;
    });

    // Write updated articles with image URLs to the JSON file
    fs.writeFileSync(
      "./formattedArticles.json",
      JSON.stringify(articles, null, 2)
    );
    console.log(
      "Image URLs added and articles written to JSON file successfully."
    );

    res
      .status(200)
      .json({ message: "Image URLs added and articles saved successfully" });
  } catch (error) {
    console.error("Error processing articles:", error);
    res.status(500).json({ message: "Error processing articles", error });
  }
};

const saveJsonArticles = async (req, res) => {
  try {
    // Read the updated JSON file
    const rawData = fs.readFileSync("./formattedArticles.json", "utf8");
    const updatedArticles = JSON.parse(rawData);

    const savedArticles = []; // Stores saved articles with unique titles

    for (const article of updatedArticles) {
      // Check if article has image URLs before saving
      if (article.imageUrls && article.imageUrls.length > 0) {
        const isUniqueTitle = !savedArticles.some(
          (savedArticle) => savedArticle.title === article.title
        );

        if (isUniqueTitle) {
          const newArticle = new BlogPostTest({
            title: article.title || "",
            content: article.content || "",
            markdown: article.formattedContent || "",
            authorName: "Admin",
            excerpt: article.excerpt || "",
            fileUrls: article.imageUrls || [],
            coverImagePath: article.imageUrls?.[0], // Use optional chaining
            authorImagePath: "",
          });

          const savedArticle = await newArticle.save();
          savedArticles.push(savedArticle);
          console.log(
            "Article with image URLs saved to database:",
            savedArticle
          );
        } else {
          console.log("Article skipped (duplicate title):", article.title);
        }
      } else {
        console.log("Article skipped (no image URLs):", article.title);
      }
    }

    console.log(
      "Saved",
      savedArticles.length,
      "articles with unique titles successfully."
    );
    res.status(200).json({ message: "Articles processed" });
  } catch (error) {
    console.error("Error saving articles to database:", error);
    res.status(500).json({ message: "Error saving articles to database" });
  }
};

export { addImageUrlsAndSaveToDatabase, saveJsonArticles };
