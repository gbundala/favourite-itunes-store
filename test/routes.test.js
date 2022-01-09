// TODO:
// Implement test that will test the api call being made in the routes including the fetch call
// Also see how to expect something for this unit test as a result of the call being made
// Research any other test you can do on the routes, server and any other areas in the backend

// Import Testing framework 'chai'
const chai = require("chai");
const expect = chai.expect;

// Import the request library to make HTTP calls in testing
const request = require("request");

// Testing Routing
describe("iTunes API appropriately called and data is received", function () {
  describe("Status code is correct", function () {
    it("Is the API call successful?", function (done) {
      request("http://localhost:3000/", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    // FIXME: REVISIT THIS
    it("Is the API call with query successful?", function (done) {
      request(
        "http://localhost:3000/?term2=diamond+platnumz&media=music",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });

    // another test
    it("The api call corretly does not respond to the React routes", function (done) {
      request(
        "http://localhost:3000/favourites",
        function (error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
        }
      );
    });

    // FIXME: Check below and delete

    // const server = require("../server");

    // it("Testing GET", function (done) {
    //   request(server)
    //     .get("/")
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //     });

    //   done();
    // });
  });
});
