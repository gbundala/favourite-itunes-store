// Import libraries and frameworks
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import testRenderer from "react-test-renderer";

// Import Component to be tested
import ItunesStore from "./ItunesStore";

// FIXME: Check at the relevance of setupTest.js file

/**
 *
 * TODO: Write this top level description
 * This test cut across even to the child component ItunesItems as it tests that the fetch data is appropriately rendered on the page
 */

let targetContainerEl = null;
const fakeData = [
  {
    wrapperType: "track",
    kind: "song",
    artistId: 129335935,
    collectionId: 647928068,
    trackId: 647928086,
    artistName: "Wale",
    collectionName: "The Gifted",
    trackName: "Bad (Remix) [feat. Rihanna]",
    collectionCensoredName: "The Gifted",
    trackCensoredName: "Bad (Remix) [feat. Rihanna]",
    artistViewUrl: "https://music.apple.com/us/artist/wale/129335935?uo=4",
    collectionViewUrl:
      "https://music.apple.com/us/album/bad-remix-feat-rihanna/647928068?i=647928086&uo=4",
    trackViewUrl:
      "https://music.apple.com/us/album/bad-remix-feat-rihanna/647928068?i=647928086&uo=4",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/79/ec/24/79ec241b-95c5-d746-8252-5d554e9be008/mzaf_1312633516429125863.plus.aac.p.m4a",
    artworkUrl30:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/a9/e0/2ba9e01e-ceaf-adab-e95f-a6661656b2a7/source/30x30bb.jpg",
    artworkUrl60:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/a9/e0/2ba9e01e-ceaf-adab-e95f-a6661656b2a7/source/60x60bb.jpg",
    artworkUrl100:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/a9/e0/2ba9e01e-ceaf-adab-e95f-a6661656b2a7/source/100x100bb.jpg",
    collectionPrice: 9.99,
    trackPrice: 1.29,
    releaseDate: "2013-06-03T07:00:00Z",
    collectionExplicitness: "explicit",
    trackExplicitness: "explicit",
    discCount: 1,
    discNumber: 1,
    trackCount: 16,
    trackNumber: 10,
    trackTimeMillis: 238827,
    country: "USA",
    currency: "USD",
    primaryGenreName: "Hip-Hop/Rap",
    contentAdvisoryRating: "Explicit",
    isStreamable: true,
    uniqueId: 748860378379,
  },
];

// Setting up and Tearing down the the target element
// in order to isolate the effects of the test to itself

// SetUp
beforeEach(() => {
  // Setting up the targetElement for rendering during the tests
  // Then appending it to the body of the HTML
  targetContainerEl = document.createElement("div");
  document.body.appendChild(targetContainerEl);
});

// Tear Down
afterEach(() => {
  // Cleaning up the effects of the test
  unmountComponentAtNode(targetContainerEl);
  targetContainerEl.remove();
  targetContainerEl = null;
});

// UNIT Testing

test("Component Successfully fetches data and correctly renders", async () => {
  const fakeItunesData = fakeData;

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeItunesData),
    })
  );

  await act(async () => {
    render(<ItunesStore itunesItems={fakeItunesData} />, targetContainerEl);
  });

  //   Assertions

  // Card title assertion
  expect(
    targetContainerEl.getElementsByClassName("card-title h5")[0].textContent
  ).toBe("The Gifted");

  //   Card sub-title assertion
  expect(
    targetContainerEl.getElementsByClassName(
      "mb-2 text-muted card-subtitle h6"
    )[0].textContent
  ).toBe("Wale");

  //   Removing the mock to isolate the test from
  //   other tests
  global.fetch.mockRestore();
});

// SNAPSHOT TESTING

// Testing whether the component renders correctly as intended
// inline with the saved snapshot

// With no data
test("ItunesStore component renders inline with snapshot", () => {
  // Provide the value of itunesStore to be
  // an array in order to avoid the bug when
  // itunesStore.length code is run
  const tree = testRenderer.create(<ItunesStore itunesItems={[]} />).toJSON();

  expect(tree).toMatchSnapshot();
});

// With data
test("ItunesStore component renders inline with snapshot with data", () => {
  const tree = testRenderer
    .create(<ItunesStore itunesItems={fakeData} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
