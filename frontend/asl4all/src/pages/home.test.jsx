import React from "react";
import { render } from "@testing-library/react";
import Home from "./home";

describe("Home", () => {
  it("renders loading screen initially", () => {
    const { getByTestId } = render(<Home />);
    const loadingElement = getByTestId("loading-screen");
    expect(loadingElement).toBeInTheDocument();
  });
});
