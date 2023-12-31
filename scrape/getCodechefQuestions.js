const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');

const url = 'https://www.codechef.com/contests';

puppeteer.use(StealthPlugin())

const getCodechefQuestions = async () => {
    try {
        puppeteer.use(StealthPlugin());

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--enable-audio', // Enable audio
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            ],
            executablePath: './.cache/puppeteer/chrome/linux-119.0.6045.105/chrome-linux64/chrome'
        });
        const page = await browser.newPage();

        // Wait for the page to load
        await page.goto(url, { waitUntil: 'networkidle2' });

        const content = await page.content();
        const $ = cheerio.load(content);

        const lastDiv = $('div._table__container_1c9os_331._dark_1c9os_272').last();

        const textInTags = lastDiv.find("a").map((index, element) => $(element).text()).get();

        const transformedTextInTags = textInTags.map(text => {
            const match = text.match(/Starters (\d+)/);
            return match ? match[1] : '';
        }).filter(text => text !== '');

        console.log('Text in Tags:', transformedTextInTags);

        const randomIndex = Math.floor(Math.random() * transformedTextInTags.length);
        const randomText = transformedTextInTags[randomIndex];

        console.log('Random Text:', randomText);

        const contestUrl = `https://www.codechef.com/START${randomText}B?order=desc&sortBy=successful_submissions`;

        // now in the puppeteer browser open this contestUrl and get the problem links

        await page.goto(contestUrl, { waitUntil: 'networkidle2' });

        const contestContent = await page.content();
        const $2 = cheerio.load(contestContent);

        // get all the anchor tags inside $2 and keep only those which have href starting with /problems

        const problemLinks = $2('a').map((index, element) => $(element).attr('href')).get().filter(href => href.startsWith('/problems'));

        problemLinks.splice(-3, 3);

        console.log('Problem Links:', problemLinks);
        // return a random problemLink

        const randomProblemLinkIndex = Math.floor(Math.random() * problemLinks.length);
        const randomProblemLink = problemLinks[randomProblemLinkIndex];

        console.log('Random Problem Link:', randomProblemLink);



        await browser.close();

        // before returning the random Problem Link add the string afte this text https://www.codechef.com/ than return it

        const problemLink = `https://www.codechef.com${randomProblemLink}`;

        return problemLink;
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

module.exports = getCodechefQuestions;