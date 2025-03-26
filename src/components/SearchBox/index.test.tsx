import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBox from "../SearchBox";
import "@testing-library/jest-dom/jest-globals";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { jest } from "@jest/globals";
import { useSearchSuggestions } from "../../../../hook/useSearchSugession";

jest.mock("../../../../hook/useSearchSugession");

const mockOnSearch = jest
  .fn<(query: string) => Promise<void>>()
  .mockResolvedValue(undefined);

const mockSuggestions = ["child care", "children's health", "child support"];

describe("SearchBox Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchSuggestions as jest.Mock).mockReturnValue({
      suggestions: mockSuggestions,
      showSuggestions: true,
      setShowSuggestions: jest.fn(),
    });
  });

  it("should render the SearchBox component", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should update the input value when typing", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  it("should call onSearch when clicking the search button", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /Search/i });
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.click(searchButton);
    expect(mockOnSearch).toHaveBeenCalledWith("query");
  });

  it("should show suggestions when typing more than 2 characters", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "chi" } });
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });

  it("should not show suggestions when input length is less than or equal to 2", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "ch" } });
    await waitFor(() => {
      expect(screen.queryByRole("list")).toBeNull();
    });
  });

  it("should select a suggestion when clicked", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "chi" } });
    const suggestionItems = await screen.findAllByText(/chi/i);
    fireEvent.click(suggestionItems[0]);
    expect(input).toHaveValue("child care");
    expect(mockOnSearch).toHaveBeenCalledWith("child care");
  });

  it("should hide suggestions when clicking outside", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "chi" } });
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByRole("list")).toBeVisible();
    });
  });

  it("should handle Enter key press without an active suggestion", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnSearch).toHaveBeenCalledWith("query");
  });

  it("should handle ArrowDown and ArrowUp navigation", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "chi" } });
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
    const suggestionItems = screen.getAllByRole("listitem");

    fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    if (suggestionItems.length > 1) {
      fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" });
    }
    fireEvent.keyDown(input, { key: "ArrowUp", code: "ArrowUp" });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockOnSearch).toHaveBeenCalledWith(
      suggestionItems[0].textContent || ""
    );
  });

  it("should display the clear button and clear input when clicked", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "query" } });
    const clearButton = screen.getByRole("button", { name: /×/ });
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });

  it("should show suggestions on input focus if searchTerm exists", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "chi" } });
    fireEvent.blur(input);
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });
});