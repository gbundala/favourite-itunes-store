// Import express module
const express = require("express");

// Import node-fetch to be able to pull data from itunes API
const fetch = require("node-fetch");

// Create an apiRouter object by calling the Router() method
// on the express module
const apiRouter = express.Router();

// We create a function to generate unique number IDs
// Below is a reference to MDN on random number generation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// We create a UniqueID here because that one is not generated
// from the itunes API as the trackId is not applicable
// to all media types hence no consistent uniqueId from the
// itunes API
function createNewId() {
  const newID = Math.floor(Math.random() * Date.now());
  return newID;
}

// ROUTERS

// GET REQUEST to access itunes items requested by user
// as per the search criteria defined in frontend and
// passed through the request query object
apiRouter.get("/", async function (req, res) {
  // Initialize the array that will store items pulled from the
  // iTunes Store and Apple Books Store
  let itunesItemsArrayWithIds = [];

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
    const itunesItemsArray = data.results;

    // iterate over the array to be able to include the IDs
    // and then return an new arrayWithId that include the
    // unique ids.
    itunesItemsArrayWithIds = itunesItemsArray.map((item) => {
      // Create unique IDs for each item in the array
      // by invoking the createNewID method
      const uniqueId = createNewId();

      // Return the content of the objects with uniqueId
      // for each element
      return { ...item, uniqueId };
    });
  } catch (err) {
    console.error("Error on fetching itunes store: ", err);
  }

  // return a json response to the frontend
  return res.json({
    message: "List of items from itunes based on search criteria",
    itunesItemsArrayWithIds,
  });
});

// Export the apiRouter from this module
module.exports = apiRouter;
