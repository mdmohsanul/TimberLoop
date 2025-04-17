import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import "@testing-library/jest-dom";

test("Should Load Home Component", () => {
  //   render(<Home />);
  render(<Header />);
  const heading = screen.getByRole("heading");

  expect(heading).toBeInTheDocument();
});
