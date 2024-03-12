import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";

import { PhotoCard } from "./PhotoCard";

const mockToggleFavourite = jest.fn();
jest.mock("../../hooks", () => ({
  useFavouritedState: () => [false, mockToggleFavourite],
}));

describe("PhotoCard", () => {
  const photoProps = {
    src: "test.jpg",
    alt: "Test Alt",
    photographer: "Test Photographer",
    photoId: 1,
  };

  it("renders photo card correctly", () => {
    render(<PhotoCard {...photoProps} />);
    const photoElement = screen.getByTestId("img-element");
    expect(photoElement).toBeInTheDocument();
    expect(photoElement).toHaveAttribute("src", "test.jpg");
    expect(photoElement).toHaveAttribute("alt", "Test Alt");
  });

  it("displays tooltip on mouse hover", () => {
    render(<PhotoCard {...photoProps} />);

    expect(screen.queryByText("Test Alt")).not.toBeInTheDocument;
    expect(screen.queryByText("Test Photographer")).not.toBeInTheDocument;
    expect(screen.queryByText("Favourite")).not.toBeInTheDocument;

    const photoContainer = screen.getByTestId("img-element").parentElement!;

    fireEvent.mouseEnter(photoContainer);
    expect(screen.getByText("Test Alt")).toBeInTheDocument;
    expect(screen.getByText("Test Photographer")).toBeInTheDocument;
    expect(screen.getByText("Favourite")).toBeInTheDocument;
  });

  it("hides tooltip on mouse leave", () => {
    render(<PhotoCard {...photoProps} />);

    const photoContainer = screen.getByTestId("img-element").parentElement!;
    fireEvent.mouseEnter(photoContainer);

    expect(screen.getByText("Test Alt")).toBeInTheDocument;
    expect(screen.getByText("Test Photographer")).toBeInTheDocument;
    expect(screen.getByText("Favourite")).toBeInTheDocument;

    fireEvent.mouseLeave(photoContainer);
    expect(screen.queryByText("Test Alt")).not.toBeInTheDocument;
    expect(screen.queryByText("Test Photographer")).not.toBeInTheDocument;
    expect(screen.queryByText("Favourite")).not.toBeInTheDocument;
  });

  it("toggles favourite when clicked on tooltip", () => {
    render(<PhotoCard {...photoProps} />);

    const photoContainer = screen.getByTestId("img-element").parentElement!;

    fireEvent.mouseEnter(photoContainer);

    fireEvent.click(screen.getByText("Favourite"));
    expect(mockToggleFavourite).toHaveBeenCalledTimes(1);
  });
});
