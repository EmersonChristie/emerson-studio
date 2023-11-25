import { motion } from "framer-motion";
import ArtCard from "./art-card";

import { ArtworkProps } from "../../types/global";

interface ColumnProps {
  artworks: ArtworkProps[];
  index: number;
  isMobile: boolean;
}

const Column: React.FC<ColumnProps> = ({ artworks, index, isMobile }) => {
  let style = {};

  if (!isMobile) {
    if (index === 1) {
      style = { marginTop: "12rem" }; // Adjust to the amount of margin you want
    } else if (index === 2) {
      style = { marginTop: "6rem" }; // Adjust to the amount of margin you want
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
          image={artwork.mediumImage}
        />
      ))}
    </motion.div>
  );
};

export default Column;
