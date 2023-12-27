# Ranproblem API

Ranproblem is a simple REST API created using Node.js and Express.js to fetch random programming questions from different platforms. The API exposes four endpoints, each serving a unique purpose.

## Endpoints

1. **Get Random Codeforces Question**
    - Endpoint: `/api/randomQuestions/getCodeforces`
    - Returns a random Codeforces question with a rating less than or equal to 1800.
    - Response Format:
        ```json
        {
            "problemUrl": "Link of the question"
        }
        ```

2. **Get LeetCode Problem of the Day**
    - Endpoint: `/api/randomQuestions/getLeetcode`
    - Returns the problem of the day from LeetCode.
    - Response Format:
        ```json
        {
            "problemUrl": "Link of the question"
        }
        ```

3. **Get Random AtCoder Question**
    - Endpoint: `/api/randomQuestions/getAtcoder`
    - Returns a random AtCoder question.
    - Response Format:
        ```json
        {
            "problemUrl": "Link of the question"
        }
        ```

4. **Get Random Question from All Platforms**
    - Endpoint: `/api/randomQuestions/getQuestion`
    - Returns a random question from Codeforces, LeetCode, or AtCoder.
    - Response Format:
        ```json
        {
            "problemUrl": "Link of the question"
        }
        ```

## Usage

1. Clone the repository:
    ```bash
    git clone https://github.com/HarshSharma20503/Ranproblem.git
    ```

2. Install dependencies:
    ```bash
    cd Ranproblem
    npm install
    ```

3. Run the server:
    ```bash
    npm run dev
    ```

4. Access the API at `http://localhost:3000`.

## Dependencies

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Puppeteer**: Headless Chrome browser automation library.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Cheerio**: Fast, flexible, and lean implementation of core jQuery for the server.

## Notes

- Codeforces questions are fetched using the Codeforces API.
- LeetCode and AtCoder questions are scraped using Puppeteer, Axios, and Cheerio.

Feel free to use and modify this API according to your needs! If you encounter any issues or have suggestions for improvement, please create an issue in the repository. Happy coding!
