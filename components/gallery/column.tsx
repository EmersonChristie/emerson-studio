import { motion } from "framer-motion";
import ArtCard from "./art-card";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Artwork } from "../../types/global";

interface ColumnProps {
  artworks: Artwork[];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ artworks, index }) => {
  let style = {};

  const { isMobile } = useWindowSize();

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
        <ArtCard key={artwork.id} index={index} artwork={artwork} />
      ))}
    </motion.div>
  );
};

export default Column;
