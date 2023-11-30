import { motion } from "framer-motion";
import ArtCard from "./art-card";

// import { ArtworkProps } from "../../types/global";
import { ArtworkType } from "../../types/global";

interface ColumnProps {
  artworks: ArtworkType[];
  index: number;
  isMobile: boolean;
  toggleLikeArtwork: (artworkId: number) => void;
}

const Column: React.FC<ColumnProps> = ({
  artworks,
  index,
  isMobile,
  toggleLikeArtwork,
}) => {
  let style = {};

  if (!isMobile) {
    if (index === 1) {
      style = { marginTop: "12rem" };
    } else if (index === 2) {
      style = { marginTop: "6rem" };
    }
  }
  return (
    <motion.div className="flex flex-col items-center" style={style}>
      {artworks.map((artwork) => (
        <ArtCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          dimensions={artwork.dimensions}
          mainImageUrlMedium={artwork.mainImageUrlMedium}
          liked={artwork.liked}
        />
      ))}
    </motion.div>
  );
};

export default Column;
