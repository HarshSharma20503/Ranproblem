const axios = require('axios');

// Function to make a GET request using Axios
const getCodeforcesQuestions = async (url) => {
  try {
    // Make a GET request using Axios
    const response = await axios.get(url);

    // Access the response data
    const responseData = response.data;

    // Access the 'result' object from the response data
    const result = responseData.result;

    // Access the 'problems' array from the 'result' object
    const problems = result.problems;

    // Return the array of problems
    return problems;
  } catch (error) {
    // Handle errors if the request fails
    console.error('Error:', error.message);

    // Re-throw the error to signal that the function has failed
    throw error;
  }
}

module.exports = getCodeforcesQuestions;
