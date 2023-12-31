// Importing the express-async-handler library to handle asynchronous errors in Express middleware
const asyncHandler = require("express-async-handler");
const getCodeforcesQuestions = require("../scrape/getCodeforcesQuestions");
const getLeetcodeQuestions = require("../scrape/getLeetcodeQuestions");

//@desc Get random question from Codeforces
//@route GET /api/contacts
//@access public
// Async function using asyncHandler to handle asynchronous operations and errors
const getCodeforces = asyncHandler(async (req, res) => {
    try {
        // Fetch problems from the Codeforces API
        const problems = await getCodeforcesQuestions("https://codeforces.com/api/problemset.problems");

        // Filter problems based on the rating criterion (<= 1800)
        const filteredProblems = problems.filter(problem => problem.rating <= 1800);

        // If no problems match the criteria, return a 404 response
        if (filteredProblems.length === 0) {
            res.status(404).json({ error: 'No problems found within the specified rating range.' });
            return;
        }

        // Generate a random index to pick a random problem from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredProblems.length);
        const randomProblem = filteredProblems[randomIndex];

        // Extract contestId and index from the randomly selected problem
        const { contestId, index } = randomProblem;

        // Create the URL for the randomly selected problem
        const problemUrl = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
        console.log("Codeforces ProblemUrl: ", problemUrl);
        // Return the URL in a JSON response
        res.status(200).json({ "problemUrl": problemUrl });
    } catch (error) {
        // Handle any errors that occur during the execution of the function
        res.status(500).json({ error: error.message });
    }
});

//@desc Get random question from Leetcode
//@route POST /api/contacts
//@access public
const getLeetcode = asyncHandler(async (req, res) => {
    try {
        const problemUrl = await getLeetcodeQuestions("https://leetcode.com/problemset/")
        console.log("Leetcode ProblemUrl: ", problemUrl);
        if (problemUrl == null) {
            res.status(500).json({ "problemUrl": null });
        }
        res.status(200).json({ "problemUrl": problemUrl });
    } catch (error) {
        // Handle any errors that occur during the execution of the function
        res.status(500).json({ error: error.message });
    }
});

//@desc Get random question from Atcoder
//@route GET /api/contacts/:id
//@access public
const getAtcoder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Atcoder Question" });
});

//@desc get one random question from from one of the 3 platform
//@route PUT /api/contacts/:id
//@access public
const getQuestion = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get random Question" });
});

// Exporting the controller methods for use in other parts of the application
module.exports = {
    getCodeforces,
    getLeetcode,
    getAtcoder,
    getQuestion,
};