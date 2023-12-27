const express = require("express");
const router = express.Router();

const {
    getCodeforces,
    getLeetcode,
    getAtcoder,
    getQuestion,
} = require("../controllers/questionsControllers");

// Defining routes and associating them with controller methods
router.route("/getCodeforces").get(getCodeforces)
router.route("/getLeetcode").get(getLeetcode)
router.route("/getAtcoder").get(getAtcoder)
router.route("/getQuestion").get(getQuestion)

// Exporting the router for use in other parts of the application
module.exports = router;