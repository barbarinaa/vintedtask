import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  const mockAlt = "Mock Alt";
  const mockPhotographer = "Mock Photographer";

  it("renders correctly with provided alt and photographer", () => {
    render(
      <Tooltip
        alt={mockAlt}
        photographer={mockPhotographer}
        isFavourited={false}
        toggleFavourite={() => {}}
      />
    );

    expect(screen.getByText("Mock Alt")).toBeInTheDocument();
    expect(screen.getByText("Mock Photographer")).toBeInTheDocument();
  });

  it('renders "Unknown" when photographer is empty string', () => {
    render(
      <Tooltip
        alt={mockAlt}
        photographer=""
        isFavourited={false}
        toggleFavourite={() => {}}
      />
    );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it('renders "No title provided" when alt is empty string', () => {
    render(
      <Tooltip
        alt=""
        photographer={mockPhotographer}
        isFavourited={false}
        toggleFavourite={() => {}}
      />
    );

    expect(screen.getByText("No title provided")).toBeInTheDocument();
  });

  it('renders "Favourite" button when isFavourited is false', () => {
    render(
      <Tooltip
        alt={mockAlt}
        photographer={mockPhotographer}
        isFavourited={false}
        toggleFavourite={() => {}}
      />
    );

    expect(screen.getByText("Favourite")).toBeInTheDocument();
  });

  it('renders "Favourited" button when isFavourited is true', () => {
    render(
      <Tooltip
        alt={mockAlt}
        photographer={mockPhotographer}
        isFavourited={true}
        toggleFavourite={() => {}}
      />
    );

    expect(screen.getByText("Favourited")).toBeInTheDocument();
  });

  it("calls toggleFavourite function when button is clicked", () => {
    const toggleFavouriteMock = jest.fn();
    render(
      <Tooltip
        alt={mockAlt}
        photographer={mockPhotographer}
        isFavourited={false}
        toggleFavourite={toggleFavouriteMock}
      />
    );

    fireEvent.click(screen.getByText("Favourite"));
    expect(toggleFavouriteMock).toHaveBeenCalled();
  });
});
