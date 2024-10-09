import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import TwitterTrends from "../../models/TwitterTrends.mjs";

const scrapeTrends24 = async (req, res) => {
  const countriesData = JSON.parse(fs.readFileSync("./countries.json", "utf8"));

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let trends = [];
    let attempts = 0;
    const maxAttempts = 5;
    let selectedCountry;

    while (trends.length === 0 && attempts < maxAttempts) {
      const randomCountry =
        countriesData[Math.floor(Math.random() * countriesData.length)];
      selectedCountry = randomCountry.country;
      const url = randomCountry.url;

      console.log(
        `Attempting to scrape trends for ${selectedCountry} (Attempt ${
          attempts + 1
        }/${maxAttempts})`
      );

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      trends = await page.evaluate(() => {
        const trendContainer = document.querySelector(
          ".trend-data-container .tabs-container #timeline .list-container"
        );
        if (!trendContainer) return [];

        return Array.from(
          trendContainer.querySelectorAll("li .trend-name a")
        ).map((anchor) => ({
          title: anchor.innerText.trim(),
          url: anchor.href,
        }));
      });

      attempts++;
    }

    if (trends.length > 0) {
      console.log(`Saving trends for ${selectedCountry}:`, trends);
      await TwitterTrends.deleteMany({ country: selectedCountry });

      const newTrends = new TwitterTrends({
        country: selectedCountry,
        timestamp: new Date(),
        trends,
      });
      await newTrends.save();

      res.status(200).json({
        message: `Trends saved successfully for ${selectedCountry}`,
        newTrends: trends,
      });
    } else {
      console.log(`No valid trends found after ${maxAttempts} attempts`);
      res
        .status(500)
        .json({ message: "No valid trends found after multiple attempts" });
    }
  } catch (error) {
    console.error("Error scraping Trends24:", error);
    res.status(500).json({ message: "Error scraping Trends24" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const scrapeTrends24Test = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://trends24.in/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const html = await page.content();
    res.status(200).send(html);
  } catch (error) {
    console.error("Error scraping Trends24:", error);
    res.status(500).json({ message: "Error scraping Trends24" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { scrapeTrends24, scrapeTrends24Test };
