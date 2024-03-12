import { useState } from "react";
import { useFavouritedState } from "../../hooks";
import { Tooltip } from "../Tooltip/Tooltip";
import "./PhotoCard.css";

type PhotoCardProps = {
  src: string;
  alt: string;
  photographer: string;
  photoId: number;
};

export const PhotoCard = ({
  src,
  alt,
  photographer,
  photoId,
}: PhotoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavourited, setIsFavourited] = useFavouritedState(photoId);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleFavourite = () => {
    setIsFavourited((prev) => !prev);
  };

  return (
    <div
      className="photo-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src} alt={alt} data-testid="img-element" loading="lazy" />
      {isHovered && (
        <Tooltip
          alt={alt}
          photographer={photographer}
          isFavourited={isFavourited}
          toggleFavourite={toggleFavourite}
        />
      )}
    </div>
  );
};
