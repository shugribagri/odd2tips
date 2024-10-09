import puppeteer from "puppeteer";
import { setTimeout } from "node:timers/promises";

const odd2tipsController = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.setGeolocation({ latitude: 59.95, longitude: 30.31667 });

    await page.goto("https://www.odd2tips.com", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Function to close pop-ups
    const closePopUps = async () => {
      const popUpSelector = ".pl-d4db06bc86d5410193a1ac45bef7482a__content"; // Replace with the actual selector of the pop-up
      const closeButtonSelector =
        ".pl-d4db06bc86d5410193a1ac45bef7482a__closelink"; // Replace with the actual selector of the pop-up close button

      const popUp = await page.$(popUpSelector);
      if (popUp) {
        const closeButton = await page.$(closeButtonSelector);
        if (closeButton) {
          await closeButton.click();
          await setTimeout(2000);
        }
      }
    };

    // Function to scroll smoothly
    const smoothScroll = async (direction) => {
      await page.evaluate(async (direction) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const scrollStep = 100;
        const scrollDelay = 100;

        if (direction === "down") {
          for (
            let i = window.scrollY;
            i < document.body.scrollHeight;
            i += scrollStep
          ) {
            window.scrollBy(0, scrollStep);
            await delay(scrollDelay);
          }
        } else if (direction === "up") {
          for (let i = window.scrollY; i > 0; i -= scrollStep) {
            window.scrollBy(0, -scrollStep);
            await delay(scrollDelay);
          }
        }
      }, direction);
    };

    // Scroll to the bottom of the page slowly
    await smoothScroll("down");
    await setTimeout(2000);

    // Close any pop-ups if they appear
    await closePopUps();

    // Pause at the bottom
    await setTimeout(2000);

    // Scroll back to the top of the page slowly
    await smoothScroll("up");
    await setTimeout(2000);

    // Get the HTML content of the new page
    const html = await page.content();
    res.send(html);
  } catch (error) {
    console.error("Error scraping odd2tips:", error);
    res.status(500).json({ message: "Failed to scrape odd2tips" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { odd2tipsController };
