import ShortenedLink from "../../models/ShortenedLinks.mjs";
import crypto from "crypto";

const createShortenedLink = async (req, res) => {
  const { originalUrl } = req.body;

  try {
    const existingLink = await ShortenedLink.findOne({
      originalUrl,
      active: true,
    });

    if (existingLink) {
      return res.status(200).json({ shortUrl: existingLink.shortUrl });
    }

    let shortUrl = crypto.randomBytes(4).toString("hex");
    shortUrl = "tipster/" + shortUrl;

    const newShortenedLink = new ShortenedLink({
      originalUrl,
      shortUrl,
    });

    await newShortenedLink.save();
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating shortened link:", error);
    res.status(500).json({ message: "Failed to create shortened link" });
  }
};

const getShortenedLink = async (req, res) => {
  let { shortUrl } = req.params;
  shortUrl = "tipster/" + shortUrl;

  try {
    const link = await ShortenedLink.findOne({ shortUrl });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    res.status(200).json({ originalUrl: link.originalUrl });
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    res.status(500).json({ message: "Failed to redirect to original URL" });
  }
};

export { createShortenedLink, getShortenedLink };
