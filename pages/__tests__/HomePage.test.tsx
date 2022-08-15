import React from "react";
import { withRouter } from "next/router";
import renderer from "react-test-renderer";
import HomePage from "..";

describe("HomePage", () => {
  it("should correctly match snapshot", () => {
    const wrapper = withRouter(() => <HomePage />);
    const tree = renderer.create(<>{wrapper}</>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
