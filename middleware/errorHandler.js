// Importing constants from the constants module
const { constants } = require("../constants");

// Error handling middleware function
const errorHandler = (err, req, res, next) => {
  // Get the status code from the response or default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Handling different error cases based on the status code
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All good !");
      break;
  }
};

// Exporting the errorHandler middleware for use in other parts of the application
module.exports = errorHandler;
