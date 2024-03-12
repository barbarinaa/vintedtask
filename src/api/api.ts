export const fetchPhotos = async (page: number): Promise<any[]> => {
    const headers: Record<string, string> = {}; // Initialize headers object

    if (process.env.REACT_APP_PEXELS_API_KEY) {
        headers.Authorization = process.env.REACT_APP_PEXELS_API_KEY; // Set Authorization header
    } else {
        throw new Error('PEXELS_API_KEY is not defined in the environment variables.');
    }

    const response = await fetch(
        `https://api.pexels.com/v1/curated?page=${page}&per_page=9`,
        {
            headers,
        }
    );

    const data = await response.json();
    const photos = data.photos || [];
    return photos;
};
