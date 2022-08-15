import { render } from "@testing-library/react";
import Footer from "../Footer";

it("renders unchanged", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
