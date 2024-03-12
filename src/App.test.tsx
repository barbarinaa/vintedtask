import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";

import { App } from "./App";
import { useFetchPhotos, useInfiniteScroll } from "./hooks";

jest.mock("./hooks", () => ({
  useInfiniteScroll: jest.fn(),
  useFetchPhotos: jest.fn(),
  useFavouritedState: () => jest.fn(),
}));

const mockedUseFetchPhotos = jest.mocked(useFetchPhotos);
const mockedUseInfiniteScroll = jest.mocked(useInfiniteScroll);
describe("App component", () => {
  beforeEach(() => {
    mockedUseFetchPhotos.mockReturnValue({
      photos: [
        {
          src: {
            original: "example.com/photo1/original",
            large2x: "example.com/photo1/large2x",
            large: "example.com/photo1/large",
            medium: "example.com/photo1/medium",
            small: "example.com/photo1/small",
            portrait: "example.com/photo1/portrait",
            landscape: "example.com/photo1/landscape",
            tiny: "example.com/photo1/tiny",
          },
          alt: "photo",
          photographer: "photographer",
          id: 1,
        },
      ],
      isLoading: false,
    });
    mockedUseInfiniteScroll.mockClear();
  });

  it("renders photos", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByAltText("photo")).toBeInTheDocument()
    );
  });

  it('renders "Loading" available when no photos', async () => {
    mockedUseFetchPhotos.mockReturnValue({
      photos: [],
      isLoading: true,
    });
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Loading...")).toBeInTheDocument()
    );
  });

  it('renders "No more data available" when no photos', async () => {
    mockedUseFetchPhotos.mockReturnValue({
      photos: [],
      isLoading: false,
    });
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("No more data available")).toBeInTheDocument()
    );
  });

  it("loads more photos on scroll", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByAltText("photo")).toBeInTheDocument()
    );

    const mockScrollCallback = mockedUseInfiniteScroll.mock.calls[0][0];

    await act(async () => {
      mockScrollCallback();
    });

    await waitFor(() =>
      expect(mockedUseFetchPhotos).toHaveBeenCalledWith(2, false)
    );
  });
});
