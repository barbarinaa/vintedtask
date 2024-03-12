import { useState, useEffect } from "react";
import { fetchPhotos } from "../../api/api";


export type Photo = {
    id: number;
    width?: number;
    height?: number;
    url?: string;
    photographer: string;
    photographer_url?: string;
    photographer_id?: number;
    avg_color?: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    liked?: boolean;
    alt: string;
};


export type useFetchPhotosResult = {
    photos: Photo[],
    isLoading: boolean
}

export const useFetchPhotos = (page: number, initialLoad: boolean): useFetchPhotosResult => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (initialLoad) return;

        setLoading(true);
        fetchPhotos(page).then((newPhotos) => {
            setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
            setLoading(false);
        });
    }, [page, initialLoad]);

    return { photos, isLoading };
};
