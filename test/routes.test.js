// Import Testing framework 'chai'
const chai = require("chai");
const expect = chai.expect;

// Import the request library to make HTTP calls in testing
const request = require("request");

// Testing Routing
describe("Custom API and iTunes API appropriately called and data is received", function () {
  describe("Status Code and Body Response is correct", function () {
    // API call should succeed to provide a response and
    // a 200 OK status
    it("Is the API call successful?", function (done) {
      request("http://localhost:8080/api", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a("string");

        done();
      });
    });

    // When provided with query keys and values
    // the API key should succeed and return the appropriate
    // response from iTunes API
    it("Is the API call successful with queries?", function (done) {
      const searchTerm = "diamond+platnumz";
      const mediaType = "music";
      request(
        `http://localhost:8080/api/?term=${searchTerm}&media=${mediaType}`,
        function (error, response, body) {
          // HACK: We run JSON.parse on the body in order to
          // be able to convert the json response to an object
          // and be able to access the properties in the first
          // Object from the returned array
          const resBody = JSON.parse(body);
          const firstObjectFromRes = resBody.itunesItemsArrayWithIds[0];

          // Assertions
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.be.a("string");
          expect(resBody).to.be.an("object");
          expect(firstObjectFromRes.artistName).to.equal(
            "Diamond Platnumz & Miri Ben-Ari"
          );
          expect(firstObjectFromRes.collectionArtistName).to.equal(
            "Diamond Platnumz"
          );
          expect(firstObjectFromRes.collectionName).to.equal(
            "A Boy From Tandale"
          );
          done();
        }
      );
    });

    // Testing on the failure if the /api param is not specified
    // after the root url ("/")
    it("Should fail when the 'api' param is not specified after the root url", function (done) {
      request("http://localhost:8080/", function (error, response, body) {
        expect(response.statusCode).to.equal(500);
        done();
      });
    });
  });
});
