import React from "react";
import { withRouter } from "next/router";
import renderer from "react-test-renderer";
import PaymentDates from "../PaymentDates";

describe("PaymentDates", () => {
  it("should correctly match snapshot", () => {
    const wrapper = withRouter(() => <PaymentDates />);
    const tree = renderer.create(<>{wrapper}</>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
