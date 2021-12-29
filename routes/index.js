// Import express module
const express = require("express");

// Import node-fetch to be able to pull data from itunes API
const fetch = require("node-fetch");

// Create an apiRouter object by calling the Router() method
// on the express module
const apiRouter = express.Router();

// Initialize the array that will store items pulled from the
// iTunes Store and Apple Books Store
// TODO: Review the relevance of keeping this as a global variable instead of local to the get handler function
// let itunesItemsArray = [];

// ROUTERS

// GET REQUEST to access itunes items requested by user
// as per the search criteria defined in frontend and
// passed through the body of the request
// TODO: REVIEW  the passed through the body part
apiRouter.get("/", async function (req, res) {
  // Initialize the array that will store items pulled from the
  // iTunes Store and Apple Books Store
  let itunesItemsArray = [];

  // grab the term and media from the url query by destructuring
  const { term, media } = req.query;

  //   FIXME: DELETE
  console.log(req.query);

  //   FIXME: NOT THIS ONE BUT THE PREVIOUS TASK: SEE IF THERE IS A NEED TO CONVERT THE FETCH CALLS IN FRONDEND TO USE ASYNC AWAIT AS BELOW

  //   Fetch the data from the itunes API using async-await and in a
  // try-catch block
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=${media}`
    );

    const data = await response.json();
    itunesItemsArray = data.results;
  } catch (err) {
    console.error("Error on fetching itunes store: ", err);
  }

  // return a json response to the frontend
  return res.json({
    message: "List of items from itunes based on search criteria",
    itunesItemsArray,
  });
});

// Export the apiRouter from this module
module.exports = apiRouter;
