import React from "react";
import { withRouter } from "next/router";
import renderer from "react-test-renderer";
import ResponsiveDrawer from "../ResponsiveDrawer";

describe("ResponsiveDrawer", () => {
  it("should correctly match snapshot", () => {
    const wrapper = withRouter(() => <ResponsiveDrawer />);
    const tree = renderer.create(<>{wrapper}</>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
