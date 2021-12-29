// IMPORTS

// Import express module
const express = require("express");

// Import helmet module for security
const helmet = require("helmet");

// Import path module for deployment
const path = require("path");

// TODO: remember to call in the body parser if at all needed

// Import apiRoutes from the routes file
const apiRoutes = require("./routes");

// EXPRESS APP INITIALIZATION

// Create the app object from the top-level express function call
// to initialize the express app
const app = express();

// MIDDLEWARES

// Calling helmet middleware which helps secure the App
// by setting various HTTP headers
app.use(helmet());

// Express JSON middleware
// To enable the server to accept requests from the Body of
// a request in a json format.
app.use(express.json());

// Use the apiRoutes
app.use("/api", apiRoutes);

// ERROR HANDLING

// For general error handling inline with the gist below
// We use the "*" wildcard to capture any errors
// https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd#generalized-error-handling
// Then we respond with the message if the use enters
// a different route not specified here
app.get("*", function (req, res, next) {
  let err = new Error();

  // we set the status code to 404
  err.statusCode = 404;

  // In order to enable our middleware to redirect
  // we set the shouldRedirect property on the err
  // object to true
  err.shouldRedirect = true;
  next(err);
});

// Our error handling middleware
// We place our error handling middleware at the end after all
// routes and middleware in order to be able to catch any
// errors occuring the processes above
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Oops something is wrong!?!?");
});

// DYNAMIC PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`App server is listening on PORT ${PORT}`);
});
