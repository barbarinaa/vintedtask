import { useState, useEffect } from "react";

export const useFavouritedState = (photoId: number) => {
    const [isFavourited, setIsFavourited] = useState<boolean>(() => {
        // Initialize state from localStorage
        const storedValue = localStorage.getItem(`isFavourited_${photoId}`);
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        // Save state to localStorage when it changes
        localStorage.setItem(
            `isFavourited_${photoId}`,
            JSON.stringify(isFavourited)
        );
    }, [isFavourited, photoId]);

    return [isFavourited, setIsFavourited] as const;
};
