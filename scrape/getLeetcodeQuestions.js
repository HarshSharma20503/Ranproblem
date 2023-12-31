const { spawn } = require('child_process');

const getLeetcodeQuestions = async (url) => {
    try {
        const childProcess = spawn('python3', ['scrape/getLeetcodePOTD.py']);
        let output = 'https://leetcode.com'; // variable to hold the data

        childProcess.stdout.on('data', (data) => {
            console.log('Getting from python stdout:', data.toString());
            output += data.toString(); // append the data to the output variable
            //remove last character from output string
            output = output.slice(0, -1);
        });

        childProcess.stderr.on('data', (data) => {
            console.error('Getting from python stderr:', data.toString());
        });

        await new Promise((resolve, reject) => {
            childProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(output); // resolve the Promise with the output
                } else {
                    reject(new Error(`Child process exited with code ${code}`));
                }
            });
        });

        return output; // return the output received from the python file
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

module.exports = getLeetcodeQuestions;