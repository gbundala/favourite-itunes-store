// Import libraries and frameworks
import React from "react";
import testRenderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

// Import component to be tested
import SearchCriteria from "./SearchCriteria";

// Initialize the target element to render our components
// temporarily while testing
let targetContainerEl = null;

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

// TESTING BUTTON CLICKS
test("handleSearchItunes is called when the Search iTunes button is clicked", () => {
  //   Mock the handleSearchItunes and setLoading
  //    event handlers function using jest
  const handleSearchItunes = jest.fn();
  const setLoading = jest.fn();

  //   Action of rendering the component on the jestdom
  act(() => {
    render(
      <SearchCriteria
        handleSearchItunes={handleSearchItunes}
        setLoading={setLoading}
      />,
      targetContainerEl
    );
  });

  // Grab the button element and trigger click events
  // assertions upon initial rendering
  const buttonEl = document.getElementsByClassName(
    "btn btn-outline-secondary"
  )[0];
  expect(buttonEl.innerHTML).toBe("Search iTunes");

  //   Action to dispatch the click event
  act(() => {
    buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // assertions after event

  expect(buttonEl.innerHTML).toBe("Search iTunes");
  expect(handleSearchItunes).toHaveBeenCalledTimes(1);
  expect(setLoading).toHaveBeenCalledTimes(1);

  //   LOOP: BUTTON EVENT CALLED SEVERAL TIMES
  //   Acting of firing event a number of times
  act(() => {
    for (let i = 0; i < 7; i++) {
      buttonEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  //   Asserting on the values and number of Times functions
  //   are called after event being dispatched a set number of times

  expect(handleSearchItunes).toHaveBeenCalledTimes(8);
  expect(setLoading).toHaveBeenCalledTimes(8);
  expect(buttonEl.innerHTML).toBe("Search iTunes");
});

// TESTING FORM CONTROLS

test("Form control handler functions appropriately called upon input change", () => {
  //   Mock the handleSearchItunes and setLoading
  //    event handlers function using jest
  const handleChange = jest.fn();
  //   Action of rendering the component on the jestdom
  act(() => {
    render(<SearchCriteria />, targetContainerEl);
  });

  // FORM CONTROL EVENTS

  const formControlEl = document.getElementsByClassName("form-control")[0];
  expect(formControlEl.nodeName).toBe("INPUT");

  //   Action to dispatch Input event in form control
  act(() => {
    formControlEl.addEventListener("input", handleChange);
    formControlEl.dispatchEvent(new InputEvent("input", { bubbles: true }));
  });
  expect(handleChange).toHaveBeenCalledTimes(1);

  //   Acting of firing INPUT event a number of times
  act(() => {
    for (let i = 0; i < 7; i++) {
      formControlEl.dispatchEvent(new InputEvent("input", { bubbles: true }));
    }
  });
  expect(handleChange).toHaveBeenCalledTimes(8);
});

/**
 *
 * SNAPSHOT TESTING
 */

test("SearchCriteria component renders inline with snapshot", () => {
  const tree = testRenderer.create(<SearchCriteria />).toJSON();

  expect(tree).toMatchSnapshot();
});
