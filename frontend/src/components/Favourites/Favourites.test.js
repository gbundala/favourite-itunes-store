// Import libaries and frameworks
import React from "react";
import testRenderer from "react-test-renderer";

// Import component to be tested
import Favourites from "./Favourites";

// Snapshot testing
test("Favourites component renders inline with snapshot", () => {
  const tree = testRenderer.create(<Favourites />).toJSON();

  expect(tree).toMatchSnapshot();
});
