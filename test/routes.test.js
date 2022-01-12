// Import Testing framework 'chai'
const chai = require("chai");
const expect = chai.expect;

// Import the request library to make HTTP calls in testing
const request = require("request");

// Testing Routing
describe("Custom API and iTunes API appropriately called and data is received", function () {
  describe("Status Code and  Body Response is correct", function () {
    it("Is the API call successful?", function (done) {
      request("http://localhost:8080/api", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.a("string");

        done();
      });
    });

    // RESEARCH: On testing asyc calls
    // https://stackoverflow.com/questions/26571328/how-do-i-properly-test-promises-with-mocha-and-chai

    // Also in docs
    // https://mochajs.org/#using-async-await

    // It helps to avoid the error below that occurs sometimes
    // but also reduces significantly the test running time

    // ERROR MESSAGE (when async/await is not used) that occurs sometimes
    // Error: Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/Users/gabrielbundala/Desktop/favourite-itunes-store/test/routes.test.js)

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
    it("Should fail when the api param is not specified after the root url", function (done) {
      request("http://localhost:8080/", function (error, response, body) {
        expect(response.statusCode).to.equal(500);
        done();
      });
    });
  });
});
