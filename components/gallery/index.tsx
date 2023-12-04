import React, { useEffect, useMemo } from "react";
import { useGalleryContext } from "@/lib/context/gallery-context"; // Adjust the path as necessary
import { ArtworkType } from "../../types/global"; // Assuming you have a type definition for Artwork
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";

/**
 * GalleryContainer component.
 * Utilizes the gallery context to display artworks and handle interactions.
 */
const GalleryContainer: React.FC<{ initialArtworks: ArtworkType[] }> = ({
  initialArtworks,
}) => {
  // Access and manipulate gallery state using the context
  const { artworks, setArtworks, toggleLikeArtwork } = useGalleryContext();

  const columns = useMemo(() => {
    const chunkSize = Math.ceil(artworks.length / 3);
    return Array.from({ length: 3 }, (_, i) =>
      artworks.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  }, [artworks]);

  // Update the artworks state with the initial artworks from static props
  useEffect(() => {
    if (initialArtworks) {
      setArtworks(initialArtworks);
    }
  }, [initialArtworks]);

  return (
    <LayoutGroup>
      <motion.div
        id="gallery-container"
        className="mt-10 flex w-full flex-grow flex-col p-14 md:m-3 md:flex-row md:space-x-16 lg:m-7 lg:space-x-28 xl:m-10 xl:space-x-36"
      >
        {/* Render each column of artworks */}
        {artworks?.length === 0 ? (
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
