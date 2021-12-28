// Import express module
const express = require("express");

// Create an apiRouter object by calling the Router() method
// on the express module
const apiRouter = express.Router();

// Initialize the array that will store items pulled from the
// iTunes Store and Apple Books Store
// TODO: Review the relevance of keeping this as a global variable instead of local to the get handler function
let itunesItemsArray = [];

// ROUTERS

// GET REQUEST to access itunes items requested by user
// as per the search criteria defined in frontend and
// passed through the body of the request
// TODO: REVIEW  the passed through the body part
apiRouter.get("/", function (req, res) {
  // grab the term and media from the url query by destructuring
  const { term, media } = req.query;

  // TODO: find a way to get the req data for term and media, see whether we use req.params or req.body for this
  fetch(`https://itunes.apple.com/search?term=${term}&media=${media}`)
    .then((response) => response.json)
    .then((data) => {
      itunesItemsArray = data;
    });

  // return a json response to the frontend
  return res.json({
    message: "List of items from itunes based on search criteria",
    itunesItemsArray,
  });
});

// Export the apiRouter from this module
module.exports = apiRouter;
