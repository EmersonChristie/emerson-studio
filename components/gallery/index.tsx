import useWindowSize from "@/lib/hooks/use-window-size";
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";

import art from "../../public/data/emersonartworks.json";

/**
 * Component representing the grid of artworks.
 */
const ArtGrid: React.FC = () => {
  // Map the JSON artwork data to a more structured format
  const artworks = art.map((jsonArtwork) => ({
    id: jsonArtwork.id.toString(),
    title: jsonArtwork.title,
    artist: jsonArtwork.artist,
    year: jsonArtwork.year,
    dimensions: jsonArtwork.dimensions,
    mediumImage: jsonArtwork.mediumImage,
    medium: jsonArtwork.medium,
    genre: jsonArtwork.genre,
    price: jsonArtwork.price,
  }));

  // Get the window size using a custom hook
  const { isMobile, isDesktop } = useWindowSize();

  // Split the artworks into columns for display
  const chunkSize = Math.ceil(artworks.length / 3);
  const columns = Array.from({ length: 3 }, (_, i) =>
    artworks.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <LayoutGroup>
      <motion.div className="flex w-full flex-grow flex-col p-14 md:flex-row md:space-x-16 lg:space-x-36 lg:p-28">
        {/* Render each column of artworks */}
        {columns.map((artworks, i) => (
          <Column key={i} index={i} artworks={artworks} isMobile={isMobile} />
        ))}
      </motion.div>
    </LayoutGroup>
  );
};

export default ArtGrid;
