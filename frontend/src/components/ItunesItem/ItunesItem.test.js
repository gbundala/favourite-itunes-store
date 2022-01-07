// Import libraries and frameworks
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ItunesItem from "./ItunesItem";

// Import component to be tested

let targetContainerEl = null;

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

// TODO: REVISIT THIS LEARNING POINT
// console.log("before", targetContainerEl);

// UNIT Testing
test("value changes when click event is fired", () => {
  // Call the jest function for event handler
  const handleChange = jest.fn();

  //   TODO: revisit here
  const handleAddToFavouriteItunes = jest.fn();

  //   Action of rendering the component on the jestdom
  act(() => {
    render(
      <ItunesItem
        onChange={handleChange}
        itunesItem={fakeData}
        isFromStore={true}
        handleAddToFavouriteItunes={handleAddToFavouriteItunes}
      />,
      targetContainerEl
    );

    // FIXME: console.log("container", targetContainerEl.textContent);
  });

  //   TODO: Find a way to get the button from here instead of the document object (seems like the dom is not reachable )
  // FIXME:  console.log("container outside", targetContainerEl.innerHTML);
  // Grab the button element and trigger click events

  //   assertions upon initial rendering
  const buttonEl = document.getElementsByClassName("edit-button")[0];
  expect(buttonEl.innerHTML).toBe("Add to favourites");

  //   Action to dispatch the click event
  act(() => {
    buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // assertions after event
  //   expect(handleChange).toHaveBeenCalled(1);
  expect(buttonEl.innerHTML).toBe("Already Added!");

  //   FIXME: You need to pull in modules that are not in this component we are testing. Can we mock the imported functions -- such as in this case the handleAddToFavour... is undefined
});

{
  /* <div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
<div class="container py-5 h-100 card-style card">
<img class="card-img-top" src="https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/db/d5/86/dbd586f6-5c4b-e9f3-8ec6-4716adf881c8/source/100x100bb.jpg">
<div class="card-body">
<div class="card-title h5">Marry You (feat. Ne-Yo) - Single</div>
<div class="mb-2 text-muted card-subtitle h6">
Diamond Platnumz
</div>
<p class="card-text">

</p>
<div class="buttons-wrapper">
<button type="button" class="delete-button btn btn-light">
Remove
</button>
</div>
</div>
</div>
</div> */
}
