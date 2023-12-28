const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

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
                '--enable-audio',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            ]
        });
        const page = await browser.newPage();
        console.log("puppeteer launched");

        console.log("opening leetcode website");
        const website_url = "https://leetcode.com/problemset/";
        await page.goto(website_url, { waitUntil: "networkidle2" });
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
