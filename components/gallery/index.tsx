import React, { useEffect, useMemo } from "react";
import { Artwork } from "../../types/global"; // Assuming you have a type definition for Artwork
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";

/**
 * GalleryContainer component.
 * Utilizes the gallery context to display artworks and handle interactions.
 */
const GalleryContainer: React.FC<{ initialArtworks: Artwork[] }> = ({
  initialArtworks,
}) => {
  const columns = useMemo(() => {
    const chunkSize = Math.ceil(initialArtworks.length / 3);
    return Array.from({ length: 3 }, (_, i) =>
      initialArtworks.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  }, [initialArtworks]);

  return (
    <LayoutGroup>
      <motion.div
        id="gallery-container"
        className="flex w-full flex-grow flex-col p-14 md:m-3 md:flex-row md:space-x-16 lg:m-7 lg:space-x-28 xl:m-10 xl:space-x-36"
      >
        {/* Render each column of artworks */}
        {initialArtworks?.length === 0 ? (
          // TODO: Add a loading state
          <p>Loading artworks...</p>
        ) : (
          columns.map((artworks, i) => (
            <Column key={i} index={i} artworks={artworks} />
          ))
        )}
      </motion.div>
    </LayoutGroup>
  );
};

export default GalleryContainer;
