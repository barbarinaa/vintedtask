import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { useFavouritedState } from "./useFavouritedState";


describe("useFavouritedState hook", () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it("should initialize state properly from localStorage", () => {
        localStorage.setItem("isFavourited_1", "true");
        const { result } = renderHook(() => useFavouritedState(1))
        expect(result.current[0]).toBe(true);
    });

    it("should update state correctly", () => {
        const { result } = renderHook(() => useFavouritedState(1))

        expect(result.current[0]).toBe(false);
        act(() => {
            result.current[1](true);
        });
        expect(result.current[0]).toBe(true);
    });

    it("should save state to localStorage when it changes", () => {
        const { result } = renderHook(() => useFavouritedState(1))

        expect(localStorage.getItem("isFavourited_1")).toBe("false");
        act(() => {
            result.current[1](true);
        });
        expect(localStorage.getItem("isFavourited_1")).toBe("true");
    });
});

