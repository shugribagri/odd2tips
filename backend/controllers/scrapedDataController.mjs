import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";
import Result from "../models/Result.mjs";
import Fixtures from "../models/Fixtures.mjs";
import Prediction from "../models/Prediction.mjs";
import PredictzResults from "../models/PredictzResults.mjs";
import BlogPostTest from "../models/BlogPostTest.mjs";
import fs from "fs";

const fetchFootballResults = async (req, res) => {
  try {
    console.log("Fetching Football Results...");

    const response = await axios.get(
      "https://www.skysports.com/football-results"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    await Result.deleteMany({});

    const results = [];

    $(".fixres__item").each((index, element) => {
      const date =
        $(element).prevAll(".fixres__header1:first").text().trim() +
        " " +
        $(element).prevAll(".fixres__header2:first").text().trim();
      const league = $(element).prevAll(".fixres__header3:first").text().trim();
      const teamOneName = $(element)
        .find(".matches__participant--side1 .swap-text__target")
        .text()
        .trim();
      const teamTwoName = $(element)
        .find(".matches__participant--side2 .swap-text__target")
        .text()
        .trim();
      const resultText = $(element).find(".matches__teamscores").text();
      const resultSplit = resultText
        .split("\n")
        .map((score) => score.trim())
        .filter((score) => score !== "");
      const scoreOne = resultSplit[0];
      const scoreTwo = resultSplit[1];

      results.push({
        date,
        league,
        teamOne: { name: teamOneName, score: scoreOne },
        teamTwo: { name: teamTwoName, score: scoreTwo },
      });
    });

    await Result.insertMany(results);

    res
      .status(200)
      .json({ message: "Football results fetched and stored successfully." });
  } catch (error) {
    console.error("Error fetching football results:", error);
    res.status(500).json({
      message: "Failed to fetch football results",
      error: error.message,
    });
  }
};

const fetchFootballFixtures = async (req, res) => {
  try {
    console.log("Fetching Football Fixtures...");

    await Fixtures.deleteMany({});

    const response = await axios.get(
      "https://www.skysports.com/football-fixtures"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const fixturesToSave = [];

    $(".fixres__item").each((index, element) => {
      const header1 = $(element)
        .prevAll(".fixres__header1:first")
        .text()
        .trim();
      const header2 = $(element)
        .prevAll(".fixres__header2:first")
        .text()
        .trim();
      const fullDate = `${header1} ${header2}`;
      const teamOne = $(element)
        .find(".matches__participant--side1 .swap-text__target")
        .text()
        .trim();
      const teamTwo = $(element)
        .find(".matches__participant--side2 .swap-text__target")
        .text()
        .trim();
      const matchId = $(element).attr("data-item-id");
      const time = $(element).find(".matches__date").text().trim();
      const league = $(element).prevAll(".fixres__header3:first").text().trim();
      const location = $(element).find(".matches__item").attr("data-location");
      const status = $(element).find(".matches__item").attr("data-status");

      const fixtureData = new Fixtures({
        fullDate,
        teamOne,
        teamTwo,
        time,
        league,
        location,
        status,
        matchId,
      });

      fixturesToSave.push(fixtureData.save());
    });

    await Promise.all(fixturesToSave);

    console.log("All fixtures have been successfully updated.");
    res.status(200).send("Fixtures updated successfully.");
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};

const fetchFootballNews = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    await page
      .goto("https://www.skysports.com/football/news", {
        waitUntil: "networkidle0",
        timeout: 0,
      })
      .catch((e) => console.log("Navigation error:", e));
    await page.waitForSelector(".sdc-site-tile--item", { timeout: 30000 });

    const newsItems = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll(".sdc-site-tile--item").forEach((el) => {
        const title = el
          .querySelector(".sdc-site-tile__headline-text")
          ?.textContent.trim();
        const link = el.querySelector(".sdc-site-tile__headline-link")?.href;
        const imageUrl = el.querySelector("img")?.src;
        items.push({ title, link, imageUrl });
      });
      return items;
    });

    await browser.close();
    res.status(200).json({ newsItems });
  } catch (error) {
    console.error("Error fetching football news:", error);
    await browser?.close();
    res
      .status(500)
      .json({ message: "Failed to fetch football news", error: error.message });
  }
};

const scrapePredictions = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.predictz.com/predictions/today", {
      waitUntil: "networkidle0",
    });

    await Prediction.deleteMany({});

    const predictionsData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".pttr.ptcnt"));
      return rows
        .map((row) => {
          const matchUrl = row.querySelector(".pttd.ptclick .btntsm")
            ? row.querySelector(".pttd.ptclick .btntsm").href
            : null;

          let countryName = "Unknown Country";
          let competitionName = "Unknown Competition";
          if (matchUrl) {
            const pathSegments = new URL(matchUrl).pathname.split("/");
            if (pathSegments.length >= 3) {
              countryName = pathSegments[2];
              competitionName = pathSegments[3];
            }
          }

          const homeTeamElement = row.querySelector(".pttd.ptmobh");
          const awayTeamElement = row.querySelector(".pttd.ptmoba");
          const oddsElements = Array.from(
            row.querySelectorAll(".pttd.ptodds a")
          );

          if (!homeTeamElement || !awayTeamElement || oddsElements.length < 3) {
            return null;
          }

          const homeTeam = homeTeamElement.innerText.trim();
          const awayTeam = awayTeamElement.innerText.trim();
          const odds = oddsElements.map((link) => link.innerText.trim());

          let homeOdd = parseFloat(odds[0] || "0");
          let drawOdd = parseFloat(odds[1] || "0");
          let awayOdd = parseFloat(odds[2] || "0");

          const last5home = Array.from(
            row.querySelector(".ptlast5wh .last5box").children
          ).map((el) => el.innerText.trim());
          const last5away = Array.from(
            row.querySelector(".ptlast5wa .last5box").children
          ).map((el) => el.innerText.trim());
          let predictionRaw = row.querySelector(".pttd.ptprd .ptpredboxsml")
            ? row.querySelector(".pttd.ptprd .ptpredboxsml").innerText.trim()
            : null;

          let prediction;
          if (predictionRaw.includes("Home")) {
            prediction = "Home win";
          } else if (predictionRaw.includes("Away")) {
            prediction = "Away win";
          } else if (predictionRaw.includes("Draw")) {
            prediction = "Draw";
          } else {
            prediction = "Unknown";
          }

          const date = document
            .querySelector(".bclink li:last-child")
            ?.innerText.trim()
            .replace("Today - ", "");

          return {
            countryName,
            competitionName,
            homeTeam,
            awayTeam,
            last5home,
            last5away,
            prediction,
            matchUrl,
            homeOdd,
            drawOdd,
            awayOdd,
            date,
          };
        })
        .filter(Boolean);
    });

    const predictions = await Promise.all(
      predictionsData.map((data) => {
        const prediction = new Prediction(data);
        return prediction.save();
      })
    );

    res.status(200).json({ predictions });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch predictions", error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const fetchPredictzResults = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    );

    async function fetchResults(url) {
      await page.goto(url, { waitUntil: "networkidle0" });
      return page.evaluate(() => {
        return Array.from(document.querySelectorAll("table.pztable tr")).map(
          (row) => {
            const league = row.querySelector("td a")
              ? row.querySelector("td a").innerText.trim()
              : "Unknown League";
            const matchUrl = row.querySelector("td a")
              ? row.querySelector("td a").href
              : null;
            const teamsScores = row.querySelectorAll("td")[3]
              ? row.querySelectorAll("td")[3].innerText.trim()
              : "Unknown";

            const matchPattern = /^(.*?)\s(\d+)\s(.*?)\s(\d+)$/;
            const match = teamsScores.match(matchPattern);
            const teamOne = match ? match[1] : "Unknown Team One";
            const scoreOne = match ? match[2] : "0";
            const teamTwo = match ? match[3] : "Unknown Team Two";
            const scoreTwo = match ? match[4] : "0";

            let status = "Draw";
            if (parseInt(scoreOne) > parseInt(scoreTwo)) status = "Home win";
            else if (parseInt(scoreTwo) > parseInt(scoreOne))
              status = "Away win";

            return {
              league,
              matchUrl,
              teamOne,
              scoreOne,
              teamTwo,
              scoreTwo,
              status,
            };
          }
        );
      });
    }

    const yesterdayResults = await fetchResults(
      "https://www.predictz.com/results/yesterday"
    );
    const todayResults = await fetchResults(
      "https://www.predictz.com/results/"
    );

    const combinedResults = yesterdayResults.concat(todayResults);

    await PredictzResults.deleteMany({});
    await PredictzResults.insertMany(combinedResults);

    res.status(200).json({
      message:
        "Results for yesterday and today fetched and stored successfully.",
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({
      message: "Failed to fetch results",
      error: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeBBCSport = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/sport/football", {
      waitUntil: "networkidle2",
    });

    const title = await page.evaluate(() => {
      const mainHeading = document.querySelector(".ssrcss-1c92cct-Heading");
      return mainHeading ? mainHeading.textContent.trim() : null;
    });

    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll(
        ".ssrcss-1dr5icq-ListItem"
      ); // Select all article elements
      const articles = [];

      articleElements.forEach((element) => {
        const headline = element.querySelector(".ssrcss-1nzemmm-PromoHeadline");
        const link = element.querySelector(".ssrcss-zmz0hi-PromoLink");

        if (headline && link) {
          let articleLink = link.getAttribute("href"); // Extract the link attribute
          if (articleLink.startsWith("/")) {
            articleLink = `https://www.bbc.com${articleLink}`; // Add the base URL if the link is relative
          }
          articles.push({
            headline: headline.textContent.trim(), // Extract and trim the headline text content
            link: articleLink,
          });
        }
      });

      return articles;
    });

    const livePromo = await page.evaluate(() => {
      const livePromoElement = document.querySelector(
        '.ssrcss-18mhvre-Promo[data-testid="promo"][type="live"]'
      );
      if (!livePromoElement) {
        return null;
      }

      const headline = livePromoElement.querySelector(
        ".ssrcss-1nzemmm-PromoHeadline"
      );
      const link = livePromoElement.querySelector(".ssrcss-vdnb7q-PromoLink");

      let liveLink = link ? link.getAttribute("href") : null;
      if (liveLink && liveLink.startsWith("/")) {
        liveLink = `https://www.bbc.com${liveLink}`; // Add the base URL if the link is relative
      }

      return {
        headline: headline ? headline.textContent.trim() : null,
        link: liveLink,
      };
    });

    fs.writeFileSync(
      "articles.json",
      JSON.stringify({ title, articles, livePromo }, null, 2)
    );
    res.status(200).json({ title, articles, livePromo });
  } catch (error) {
    console.error("Error scraping BBC Sport:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeLegaSerieA = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.legaseriea.it/en/latest", {
      waitUntil: "networkidle2",
    });

    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll(
        ".hm-grid-news-wall-main a, .hm-block-grid-3 a, .hm-block-grid-2 a"
      );
      const articles = [];

      articleElements.forEach((element) => {
        const headline =
          element.querySelector("h5") || element.querySelector("p.black");
        const link = element.getAttribute("href");

        if (headline && link) {
          let articleLink = link.startsWith("/")
            ? `https://www.legaseriea.it${link}`
            : link;
          articles.push({
            headline: headline.textContent.trim(),
            link: articleLink,
          });
        }
      });

      return articles;
    });

    fs.writeFileSync("articles.json", JSON.stringify({ articles }, null, 2));
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error scraping Lega Serie A:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeBBCArticles = async (req, res) => {
  let browser;
  try {
    const rawData = fs.readFileSync("./articles.json");
    const articlesStructure = JSON.parse(rawData);
    const articles = articlesStructure.articles;

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let extractedData = [];

    for (const article of articles) {
      if (article.link.includes("/articles/")) {
        const existingArticle = await BlogPostTest.findOne({
          title: article.headline,
        });

        if (!existingArticle) {
          await page.goto(article.link, { waitUntil: "networkidle2" });

          const articleData = await page.evaluate(() => {
            const articleWrapper = document.querySelector(".e1nh2i2l3");
            if (!articleWrapper) {
              return null;
            }

            const title = articleWrapper.querySelector("h1").innerHTML;
            const timestamp = articleWrapper.querySelector("time").innerText;
            const contentBlocks = articleWrapper.querySelectorAll(
              ".ssrcss-uf6wea-RichTextComponentWrapper p"
            );
            const content = Array.from(contentBlocks)
              .map((block) => block.innerText)
              .join("\n");
            const imageElements = articleWrapper.querySelectorAll(
              ".ssrcss-xza2yt-ComponentWrapper img"
            );
            const imageUrls = Array.from(imageElements).map((img) => img.src);

            return { title, timestamp, content, imageUrls };
          });

          if (articleData) {
            extractedData.push(articleData);
          }
        } else {
          console.log(
            `Article titled "${article.headline}" already exists in the database. Skipping...`
          );
        }
      }
    }

    // Write extracted data to fullArticles.json
    fs.writeFileSync(
      "./fullArticles.json",
      JSON.stringify(extractedData, null, 2)
    );

    res.status(200).json(extractedData);
  } catch (error) {
    console.error("Error scraping articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeBBCLiveArticles = async (req, res) => {
  let browser;
  try {
    // Read articles from articles.json file
    const rawData = fs.readFileSync("./articles.json");
    const articlesStructure = JSON.parse(rawData);
    const articles = articlesStructure.articles;

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let extractedData = [];

    for (const article of articles) {
      if (article.link.includes("/live/")) {
        // Check if the article title exists in the database
        const existingArticle = await BlogPostTest.findOne({
          slug: article.headline.replace(/\s+/g, "-"),
        });

        if (!existingArticle) {
          await page.goto(article.link, { waitUntil: "networkidle2" });

          const articleData = await page.evaluate(() => {
            const articleWrapper = document.querySelector(".e1nh2i2l3");
            if (!articleWrapper) {
              return null;
            }

            const title = articleWrapper.querySelector(
              ".ssrcss-1xjjfut-BoldText.e5tfeyi3"
            ).innerHTML;
            console.log(title);
            const timestamp = new Date().toLocaleString();
            console.log(timestamp);
            const contentBlocks = articleWrapper.querySelectorAll(
              ".ssrcss-5rhf4g-RichTextComponentWrapper p"
            );
            console.log(contentBlocks);
            const content = Array.from(contentBlocks)
              .map((block) => block.innerText)
              .join("\n");
            const imageElements = articleWrapper.querySelectorAll(
              ".ssrcss-1pyuwv1-ComponentWrapper img"
            );
            const imageUrls = Array.from(imageElements).map((img) => img.src);

            return { title, timestamp, content, imageUrls };
          });

          if (articleData) {
            extractedData.push(articleData);
          }
        } else {
          console.log(
            `Article titled "${article.headline}" already exists in the database. Skipping...`
          );
        }
      }
    }

    // Write extracted data to fullArticles.json
    fs.writeFileSync(
      "./fullArticles.json",
      JSON.stringify(extractedData, null, 2)
    );

    res.status(200).json(extractedData);
  } catch (error) {
    console.error("Error scraping live articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeBundesligaArticles = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.bundesliga.com/en/bundesliga/news", {
      waitUntil: "networkidle2",
    });

    const baseUrl = "https://www.bundesliga.com";

    const articles = await page.evaluate((baseUrl) => {
      return Array.from(
        document.querySelectorAll("dfl-editorial-teaser a")
      ).map((article) => ({
        title: article.querySelector(".body h2")
          ? article.querySelector(".body h2").textContent.trim()
          : null,
        link: article.href.startsWith("/")
          ? baseUrl + article.href
          : article.href,
      }));
    }, baseUrl);

    // Write articles to articles.json
    fs.writeFileSync(
      "./articles.json",
      JSON.stringify(articles, null, 2),
      "utf-8"
    );

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error scraping Bundesliga articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeBundesligaFullArticles = async (req, res) => {
  let browser;
  try {
    const articlesData = fs.readFileSync("./articles.json", "utf-8");
    const articles = JSON.parse(articlesData);

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (const article of articles) {
      const existingArticle = await BlogPostTest.findOne({
        title: article.title,
      });

      if (existingArticle) {
        console.log(
          `Article titled "${article.title}" already exists in the database. Skipping...`
        );
        continue;
      }
      await page.goto(article.link, {
        waitUntil: "networkidle2",
      });

      const articleContent = await page.evaluate(() => {
        const baseurl = window.location.origin;

        const articleElement = document.querySelector(
          "article.bl-article.container.web.ng-star-inserted"
        );
        if (!articleElement) return { content: "", fileUrls: [] };
        const imageUrls = Array.from(
          document.querySelectorAll("dfl-media-wrapper picture source")
        )
          .map((source) => source.srcset)
          .filter((url) => url.includes("750"))
          .map((url) => url.split("?")[0]);

        const contentParagraphs = Array.from(
          articleElement.querySelectorAll("p")
        ).map((p) => p.textContent.trim());
        const content = contentParagraphs.join("\n");

        return {
          content,
          imageUrls,
        };
      });

      article.imageUrls = articleContent.imageUrls;
      article.content = articleContent.content;
    }

    fs.writeFileSync(
      "./fullArticles.json",
      JSON.stringify(articles, null, 2),
      "utf-8"
    );

    console.log("Articles scraped and saved successfully.");
    res
      .status(200)
      .json({ message: "Articles scraped and saved successfully." });
  } catch (error) {
    console.error("Error scraping full articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeSERIEAArticles = async (req, res) => {
  let browser;
  try {
    const rawData = fs.readFileSync("./articles.json");
    const articlesStructure = JSON.parse(rawData);
    const articles = articlesStructure.articles;

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let extractedData = [];

    for (const article of articles) {
      const existingArticle = await BlogPostTest.findOne({
        title: article.headline,
      });

      if (!existingArticle) {
        await page.goto(article.link, { waitUntil: "networkidle2" });

        const articleData = await page.evaluate(() => {
          const articleWrapper = document.querySelector(".hm-container-post");
          if (!articleWrapper) {
            return null;
          }

          const titleElement = document.querySelector(
            ".hm-gradient .container-fluid .content .title-post"
          );
          const title = titleElement ? titleElement.textContent.trim() : null;

          const contentBlocks =
            articleWrapper.querySelectorAll(".hm-content-text p");
          const content = Array.from(contentBlocks)
            .map((block) => block.innerText)
            .join("\n");
          const header = document.querySelector(".hm-header-compact");
          const imgElement = header.querySelector("img");
          const imageUrl = imgElement ? imgElement.src : null;

          const imageUrls = [];

          if (imageUrl) {
            imageUrls.push(imageUrl);
          }

          console.log(imageUrls);

          return { title, content, imageUrls };
        });

        if (articleData) {
          extractedData.push(articleData);
        }
      } else {
        console.log(
          `Article titled "${article.headline}" already exists in the database. Skipping...`
        );
      }
    }

    // Write extracted data to fullArticles.json
    fs.writeFileSync(
      "./fullArticles.json",
      JSON.stringify(extractedData, null, 2)
    );

    res.status(200).json(extractedData);
  } catch (error) {
    console.error("Error scraping articles:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const cleanData = (req, res) => {
  try {
    // Read data from fullArticles.json
    const rawData = fs.readFileSync("./fullArticles.json", "utf8");
    const articles = JSON.parse(rawData);

    // Filter and clean articles
    const cleanedArticles = articles
      .filter((article) => article.imageUrls && article.imageUrls.length > 0) // Remove articles with empty imageUrls array
      .map(cleanArticle);

    // Write cleaned data to a new file (optional)
    fs.writeFileSync(
      "./cleanedArticles.json",
      JSON.stringify(cleanedArticles, null, 2)
    );

    return res.status(200).json(cleanedArticles);
  } catch (error) {
    console.error("Error cleaning data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

function cleanArticle(article) {
  if (!article) return null; // Skip missing articles

  // Clean title (remove HTML tags)
  const title = article.title.replace(/<[^>]*>/g, "");

  // Clean content (remove HTML elements, \n, and convert to markdown)
  const content = article.content.replace(/<[^>]*>/g, ""); // Remove HTML tags

  return {
    title: title,
    timestamp: article.timestamp,
    content: content,
    imageUrls: article.imageUrls,
  };
}

export {
  fetchFootballResults,
  fetchFootballFixtures,
  fetchFootballNews,
  scrapePredictions,
  fetchPredictzResults,
  scrapeBBCSport,
  scrapeBBCArticles,
  scrapeSERIEAArticles,
  cleanData,
  scrapeBBCLiveArticles,
  scrapeBundesligaArticles,
  scrapeBundesligaFullArticles,
  scrapeLegaSerieA,
};
