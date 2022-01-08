// Import libraries and frameworks
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

// Import component to be tested
import ItunesItem from "./ItunesItem";

/**
 *
 * UNIT TESTING:
 *
 * This component ItunesItem is more concerned with triggering
 * some events that have been passed as props from the parent
 * component to render the itunes items or the favourite items
 * depending on the state of the application such as the
 * handleAddToFavouriteItunes and handleRemoveFavouriteItem
 *
 * Otherwise the component is more of a presentational component
 * to render the items as the handlers have been defined in the
 * parent and only passed as props here, while this component
 * maintains its internal state is only to determine whether
 * the item is added to favourites or not which is tested
 * below in the unit tests
 *
 * The presentational bit of tested through snapshot testing
 * below all the unit tests in this file
 *
 * RESEARCH: The React Docs provides sufficient guidance for
 * testing events:
 * https://reactjs.org/docs/testing-recipes.html#events
 *
 * Guidance on snapshots:
 * https://reactjs.org/docs/testing-recipes.html#snapshot-testing
 *
 *
 */

// Initialize the target element to render our components
// temporarily while testing
let targetContainerEl = null;

// Mock some fake data and store in the variable fakeData
const fakeData = {
  wrapperType: "track",
  kind: "song",
  artistId: 721552376,
  collectionId: 1445295867,
  trackId: 1445295869,
  artistName: "Diamond Platnumz",
  collectionName: "Marry You (feat. Ne-Yo) - Single",
  trackName: "Marry You (feat. Ne-Yo)",
  collectionCensoredName: "Marry You (feat. Ne-Yo) - Single",
  trackCensoredName: "Marry You (feat. Ne-Yo)",
  artistViewUrl:
    "https://music.apple.com/us/artist/diamond-platnumz/721552376?uo=4",
  collectionViewUrl:
    "https://music.apple.com/us/album/marry-you-feat-ne-yo/1445295867?i=1445295869&uo=4",
  trackViewUrl:
    "https://music.apple.com/us/album/marry-you-feat-ne-yo/1445295867?i=1445295869&uo=4",
  previewUrl:
    "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/53/b1/18/53b118d3-e589-8be9-3753-09f561fe5992/mzaf_10679750533222968992.plus.aac.p.m4a",
  artworkUrl30:
    "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/db/d5/86/dbd586f6-5c4b-e9f3-8ec6-4716adf881c8/source/30x30bb.jpg",
  artworkUrl60:
    "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/db/d5/86/dbd586f6-5c4b-e9f3-8ec6-4716adf881c8/source/60x60bb.jpg",
  artworkUrl100:
    "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/db/d5/86/dbd586f6-5c4b-e9f3-8ec6-4716adf881c8/source/100x100bb.jpg",
  collectionPrice: 1.29,
  trackPrice: 1.29,
  releaseDate: "2016-12-02T12:00:00Z",
  collectionExplicitness: "notExplicit",
  trackExplicitness: "notExplicit",
  discCount: 1,
  discNumber: 1,
  trackCount: 1,
  trackNumber: 1,
  trackTimeMillis: 246805,
  country: "USA",
  currency: "USD",
  primaryGenreName: "Pop",
  isStreamable: true,
  uniqueId: 164286039837,
};

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
test("value changes when addToFavourites click event is fired", () => {
  //   Mock the addToFavourites event handler function using jest
  const handleAddToFavouriteItunes = jest.fn();

  //   Action of rendering the component on the jestdom
  act(() => {
    render(
      <ItunesItem
        itunesItem={fakeData}
        isFromStore={true}
        handleAddToFavouriteItunes={handleAddToFavouriteItunes}
      />,
      targetContainerEl
    );
  });

  // Grab the button element and trigger click events
  //   assertions upon initial rendering
  const buttonEl = document.getElementsByClassName("edit-button")[0];
  expect(buttonEl.innerHTML).toBe("Add to favourites");

  //   Action to dispatch the click event
  act(() => {
    buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // assertions after event

  expect(buttonEl.innerHTML).toBe("Already Added!");
  expect(handleAddToFavouriteItunes).toHaveBeenCalledTimes(1);

  //   LOOP: EVENT CALLED SEVERAL TIMES
  //   Acting of firing event a number of times (even)
  act(() => {
    for (let i = 0; i < 7; i++) {
      buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  //   Asserting on the values after being called even number of
  // times

  //   Here we expect the number of times the event handler is
  // called to only be Once (1) since we have made the functionality
  // to change the state of the button to be disabled immediately
  // after the initial event firing and also to change the innerHTML
  // to be "Already Added!". Hence the rest of the clicks are not
  // being registered on the component/button element.
  expect(handleAddToFavouriteItunes).toHaveBeenCalledTimes(1);
  expect(buttonEl.innerHTML).toBe("Already Added!");

  //   Acting of firing event a number of times (odd)
  act(() => {
    for (let i = 0; i < 6; i++) {
      buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  //   Asserting on the values after being called odd number of
  // times

  //   The same result is expected when we fire the click event
  // a set number of odd times as per the explanation above
  expect(handleAddToFavouriteItunes).toHaveBeenCalledTimes(1);
  expect(buttonEl.innerHTML).toBe("Already Added!");
});

// TESTING REMOVE FROM FAVOURITES EVENT

test("values changes when removeFromFavourites event handler is fired", () => {
  // Mock the handleRemoveFavouriteItem event handler function using jest
  const handleRemoveFavouriteItem = jest.fn();

  // Render the component on the jestDom
  // Rendering is a unit of interaction with the UI
  // act() is a helper that ensures all updates relating
  // to this unit of interaction have been updated to the DOM
  // (basically the testing jestDom) before we make any
  // assertions
  act(() => {
    render(
      <ItunesItem
        itunesItem={fakeData}
        isFromStore={false}
        handleRemoveFavouriteItem={handleRemoveFavouriteItem}
      />,
      targetContainerEl
    );
  });

  // Asserting on the value upon initial rendering of the
  // component
  const buttonEl = document.getElementsByClassName("delete-button")[0];
  expect(buttonEl.innerHTML).toBe("Remove");

  // Dispatching the clicking event
  act(() => {
    buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  //   Asserting after event is fired
  expect(handleRemoveFavouriteItem).toHaveBeenCalledTimes(1);

  //   LOOP: Asserting on the values and number of times
  //   the event handler has been called when the event is
  // fired more than once.

  // In this respect we expect the number of times to be equal
  // to the number of clicks being made and the innerHTML remains
  // the same

  act(() => {
    for (let i = 0; i < 6; i++) {
      buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  //   Asserting on the values after being called odd number of
  // times
  expect(handleRemoveFavouriteItem).toHaveBeenCalledTimes(7);
  expect(buttonEl.innerHTML).toBe("Remove");
});

/**
 *
 * SNAPSHOT TESTING
 */

test("renders in accordance with snapshot", () => {
  // Rendering component when isFromStore prop is true
  act(() => {
    render(
      <ItunesItem itunesItem={fakeData} isFromStore={true} />,
      targetContainerEl
    );
  });

  // Asserting value inline with snapshot saved
  expect(pretty(targetContainerEl.innerHTML)).toMatchSnapshot();

  //   Rendering component when isFromStore prop is false
  act(() => {
    render(
      <ItunesItem itunesItem={fakeData} isFromStore={false} />,
      targetContainerEl
    );
  });

  //   Asserting the value to being inline with snapshot saved
  expect(pretty(targetContainerEl.innerHTML)).toMatchSnapshot();
});
