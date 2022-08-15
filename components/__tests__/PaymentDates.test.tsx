import { render } from "@testing-library/react";
import { withRouter } from "next/router";
import PaymentDates from "../PaymentDates";

it("renders unchanged", () => {
  const wrapper = withRouter(() => <PaymentDates />);
  const { container } = render(<>{wrapper}</>);
  expect(container).toMatchSnapshot();
});
