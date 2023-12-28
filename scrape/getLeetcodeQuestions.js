const axios = require('axios');
const cheerio = require('cheerio');
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Function to make a GET request using Axios
const getLeetcodeQuestions = async (url) => {
    try {

        console.log("Entered the scraping function")

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        console.log("got todays date - ", formattedDate);

        console.log("launching puppeteer");
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: './.cache/puppeteer/chrome/linux-119.0.6045.105/chrome-linux64/chrome',
            args: [
                '--disable-web-security',          // Disable web security
                '--no-sandbox',                   // Disable sandboxing
                '--disable-setuid-sandbox',       // Disable setuid sandbox (Linux)
                '--disable-dev-shm-usage',        // Disable /dev/shm usage (Linux)
                '--disable-gpu',                  // Disable GPU acceleration
                '--disable-software-rasterizer',  // Disable software rasterizer
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding',
                '--disable-breakpad',             // Disable crash reports
                '--disable-client-side-phishing-detection',
                '--disable-ipc-flooding-protection',
                '--disable-infobars',             // Disable info bars
                '--disable-notifications',        // Disable notifications
                '--disable-offer-store-unmasked-wallet-cards',
                '--disable-popup-blocking',       // Disable popup blocking
                '--disable-prompt-on-repost',
                '--disable-sync',                 // Disable syncing to a Google account
                '--enable-automation',            // Enable automation
                '--mute-audio',                   // Mute audio
                '--hide-scrollbars',              // Hide scrollbars
                '--ignore-certificate-errors',    // Ignore certificate errors
                '--ignore-certificate-errors-spki-list',
                '--window-size=1366x768',         // Set window size
                '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            ]
        });
        const page = await browser.newPage();
        console.log("puppeteer launched");

        console.log("opening leetcode website");
        await page.goto("https://leetcode.com/problemset/", { waitUntil: "networkidle2" });
        console.log("website opened");

        const pageData = await page.evaluate(() => {
            return {
                html: document.documentElement.innerHTML,
            }
        });
        const $ = cheerio.load(pageData.html);

        const filteredAnchorTags = $("a[href^='/problems/'][href*='/?envType=daily-question&envId=']");

        const linksArray = [];
        filteredAnchorTags.each((index, element) => {
            const link = $(element).attr('href');
            console.log(link);
            linksArray.push(link);
        });

        const lastLink = linksArray.length > 0 ? linksArray[linksArray.length - 1] : null;

        console.log(lastLink);
        const problemOfTheDayLink = `https://leetcode.com${lastLink}`;
        console.log(problemOfTheDayLink);

        await browser.close();
        if (problemOfTheDayLink) {
            return problemOfTheDayLink;
        } else {
            console.log('Problem of the Day Link not found.');
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = getLeetcodeQuestions;
