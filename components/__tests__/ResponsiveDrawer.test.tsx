import { render } from "@testing-library/react";
import { withRouter } from "next/router";
import ResponsiveDrawer from "../ResponsiveDrawer";

it("renders unchanged", () => {
  const wrapper = withRouter(() => <ResponsiveDrawer />);
  const { container } = render(<>{wrapper}</>);
  expect(container).toMatchSnapshot();
});
