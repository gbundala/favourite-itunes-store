import React from "react";
import testRenderer from "react-test-renderer";
import SearchCriteria from "./SearchCriteria";

test("SearchCriteria component renders inline with snapshot", () => {
  const tree = testRenderer.create(<SearchCriteria />).toJSON();

  expect(tree).toMatchSnapshot();
});
