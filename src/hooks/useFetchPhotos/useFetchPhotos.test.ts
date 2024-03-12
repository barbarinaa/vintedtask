import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { Photo, useFetchPhotos } from "./useFetchPhotos";
import { fetchPhotos } from "../../api/api";

jest.mock('../../api/api', () => ({
    fetchPhotos: jest.fn(),
}));

const mockedFetchPhotos = jest.mocked(fetchPhotos)

const mockPhotosPageOne: Photo[] = [
    {
        id: 1,
        width: 100,
        height: 100,
        url: 'example.com/photo1',
        photographer: 'John Doe',
        photographer_url: 'example.com/johndoe',
        photographer_id: 123,
        avg_color: '#ffffff',
        src: {
            original: 'example.com/photo1/original',
            large2x: 'example.com/photo1/large2x',
            large: 'example.com/photo1/large',
            medium: 'example.com/photo1/medium',
            small: 'example.com/photo1/small',
            portrait: 'example.com/photo1/portrait',
            landscape: 'example.com/photo1/landscape',
            tiny: 'example.com/photo1/tiny',
        },
        liked: false,
        alt: 'Photo 1',
    },
];

const mockPhotosPageTwo: Photo[] = [
    {
        id: 2,
        width: 150,
        height: 150,
        url: 'example.com/photo2',
        photographer: 'Jane Doe',
        photographer_url: 'example.com/janedoe',
        photographer_id: 456,
        avg_color: '#000000',
        src: {
            original: 'example.com/photo2/original',
            large2x: 'example.com/photo2/large2x',
            large: 'example.com/photo2/large',
            medium: 'example.com/photo2/medium',
            small: 'example.com/photo2/small',
            portrait: 'example.com/photo2/portrait',
            landscape: 'example.com/photo2/landscape',
            tiny: 'example.com/photo2/tiny',
        },
        liked: false,
        alt: 'Photo 2',
    },
];

describe('useFetchPhotos', () => {

    beforeEach(() => {
        mockedFetchPhotos.mockClear();
    });

    it('should fetch photos and set loading state to false', async () => {
        mockedFetchPhotos.mockResolvedValueOnce(mockPhotosPageOne)

        const { result } = renderHook(() => useFetchPhotos(1, false));

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.photos).toEqual(mockPhotosPageOne);
            expect(fetchPhotos).toHaveBeenCalledWith(1);
        });
    });

    it('should not fetch photos if initialLoad is true', async () => {
        renderHook(() => useFetchPhotos(1, true));

        expect(fetchPhotos).not.toHaveBeenCalled();
    });

    it('should append new photos to the existing list', async () => {
        (fetchPhotos as jest.Mock).mockResolvedValueOnce(mockPhotosPageOne);

        const { result, rerender } = renderHook(
            ({ page, initialLoad }) => useFetchPhotos(page, initialLoad),
            {
                initialProps: { page: 1, initialLoad: false },
            }
        );

        mockedFetchPhotos.mockResolvedValueOnce(mockPhotosPageTwo);

        rerender({ page: 2, initialLoad: false });


        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
            expect(result.current.photos).toEqual([...mockPhotosPageOne, ...mockPhotosPageTwo]);
            expect(fetchPhotos).toHaveBeenCalledWith(2);
        });
    });
});
