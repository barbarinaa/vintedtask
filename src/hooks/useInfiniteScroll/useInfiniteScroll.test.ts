import "@testing-library/jest-dom";
import { renderHook, fireEvent } from "@testing-library/react";
import { useInfiniteScroll } from "./useInfiniteScroll";

const callback = jest.fn();

describe('useInfiniteScroll', () => {

    beforeEach(() => {
        renderHook(() => useInfiniteScroll(callback));
    });

    it('should call the callback when scrolling to the bottom of the page', () => {
        const callback = jest.fn();
        renderHook(() => useInfiniteScroll(callback));

        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 2000,
        });

        window.innerHeight = 500;
        document.documentElement.scrollTop = 1500;

        fireEvent.scroll(window);

        expect(callback).toHaveBeenCalled();
    });

    it('should not call the callback when scrolling to the middle of the page', () => {
        const callback = jest.fn();
        renderHook(() => useInfiniteScroll(callback));

        Object.defineProperty(document.documentElement, 'scrollHeight', {
            writable: true,
            configurable: true,
            value: 2000,
        });

        window.innerHeight = 500;
        document.documentElement.scrollTop = 500;

        fireEvent.scroll(window);

        expect(callback).not.toHaveBeenCalled();
    });
});
