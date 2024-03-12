import { useState, useEffect } from "react";
import { PhotoCard } from "./components";
import { useFetchPhotos, useInfiniteScroll } from "./hooks";

import "./App.css";

export const App = () => {
  const [page, setPage] = useState<number>(1);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const { photos, isLoading } = useFetchPhotos(page, initialLoad);

  useInfiniteScroll(() => setPage((prevPage) => prevPage + 1));

  useEffect(() => {
    if (initialLoad) setInitialLoad(false);
  }, [initialLoad]);

  return (
    <div className="container">
      <div className="photo-grid">
        {photos.map((item) => (
          <div className="photo-component-wrapper" key={item.id}>
            <PhotoCard
              src={item.src.landscape}
              alt={item.alt}
              photographer={item.photographer}
              photoId={item.id}
            />
          </div>
        ))}
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && photos.length === 0 && (
        <div className="no-more-data">No more data available</div>
      )}
    </div>
  );
};
