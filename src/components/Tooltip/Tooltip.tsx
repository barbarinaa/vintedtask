import "./Tooltip.css";

type TooltipProps = {
  alt: string;
  photographer: string;
  isFavourited: boolean;
  toggleFavourite: () => void;
};

export const Tooltip = ({
  alt,
  photographer,
  isFavourited,
  toggleFavourite,
}: TooltipProps) => (
  <div className="tooltip">
    <div className="info-box">
      <p className="photo-title">{alt || "No title provided"}</p>
      <hr />
      <p className="photographer-name">{photographer || "Unknown"}</p>
    </div>
    <button
      className={`favourite-button ${isFavourited ? "favourited" : ""}`}
      onClick={toggleFavourite}
    >
      {isFavourited ? "Favourited" : "Favourite"}
    </button>
  </div>
);
