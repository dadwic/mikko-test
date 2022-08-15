import { render } from "@testing-library/react";
import { withRouter } from "next/router";
import HomePage from "pages/index";

it("renders homepage unchanged", () => {
  const wrapper = withRouter(() => <HomePage />);
  const { container } = render(<>{wrapper}</>);
  expect(container).toMatchSnapshot();
});
