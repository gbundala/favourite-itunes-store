// Import libaries and frameworks
import React from "react";
import testRenderer from "react-test-renderer";

// Import component to be tested
import Favourites from "./Favourites";

// Snapshot testing
test("Favourites component renders inline with snapshot", () => {
  // Provide the value of favouriteItunes to be
  // an array in order to avoid the bug when
  // favouriteItunes.length code is run
  const favouriteItunes = [];

  // Set up the tree
  const tree = testRenderer
    .create(<Favourites favouriteItunes={favouriteItunes} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
