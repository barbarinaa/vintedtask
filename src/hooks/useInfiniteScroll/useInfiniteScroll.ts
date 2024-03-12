import { useEffect } from "react";

type ScrollCallback = () => void;

export const useInfiniteScroll = (callback: ScrollCallback): void => {
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >=
                document.documentElement.scrollHeight
            ) {
                callback();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [callback]);
};
