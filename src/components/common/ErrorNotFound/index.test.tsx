import { render, screen } from "@testing-library/react";
// import { NotFoundPage } from "./NotFoundPage";
import { NotFoundPage } from ".";
import "@testing-library/jest-dom/jest-globals";
import { describe, it, expect } from "@jest/globals";

describe("NotFoundPage", () => {
  it("renders the correct 404 message", () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});
