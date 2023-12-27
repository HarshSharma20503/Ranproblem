const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "*",
    optonsSuccessStatus: 200
}

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Middleware to allow other domain to make api request
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send("Welcome root route")
});

app.get('/api/randomQuestion', (req, res) => {

});
app.use("/api/randomQuestion", require("./routes/questionsRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});