const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// Function to make a GET request using Axios
const getLeetcodeQuestions = async (url) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);


        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });


        const website_url = "https://leetcode.com/problemset/";
        await page.goto(website_url, { waitUntil: "networkidle2" });
        console.log("Open website");
        await page.emulateMediaType("screen");

        const pageData = await page.evaluate(() => {
            return {
                html: document.documentElement.innerHTML,
            }
        });
        const $ = cheerio.load(pageData.html);

        // seclect the anchor tag with problem of the day of current date
        const filteredAnchorTags = $(`a[href^='/problems/'][href*='/?envType=daily-question&envId=${formattedDate}']`);

        // Log the href attribute of each filtered anchor tag
        const firstHref = filteredAnchorTags.first().attr("href");
        console.log(`Href of the first element: ${firstHref}`);

        const problemOfTheDayLink = `https://leetcode.com${firstHref}`;

        await browser.close();
        if (problemOfTheDayLink) {
            // console.log('Problem of the Day Link:', problemOfTheDayLink);
            return problemOfTheDayLink;
        } else {
            console.log('Problem of the Day Link not found.');
            return null;
        }
    } catch (error) {
        // Handle errors if the request fails
        console.error('Error:', error.message);

        // Re-throw the error to signal that the function has failed
        throw error;
    }
}

module.exports = getLeetcodeQuestions;
