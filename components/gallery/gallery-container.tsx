import React from "react";
import { useGallery } from "@/lib/hooks/use-gallery"; // Adjust the path as necessary
import { useGalleryContext } from "@/lib/context/gallery-context"; // Adjust the path as necessary
import { ArtworkType } from "../../types/global"; // Assuming you have a type definition for Artwork

import useWindowSize from "@/lib/hooks/use-window-size";
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";

/**
 * GalleryContainer component.
 * Utilizes the gallery context to display artworks and handle interactions.
 * Integrates with useGallery for fetching data and useGalleryContext for state management.
 */
const GalleryContainer: React.FC = () => {
  // Fetch gallery data using the custom hook
  useGallery();

  // Access and manipulate gallery state using the context
  const { artworks, toggleLikeArtwork } = useGalleryContext();

  // Get the window size using a custom hook
  const { isMobile, isDesktop } = useWindowSize();

  // Split the artworks into columns for display
  const chunkSize = Math.ceil(artworks.length / 3);
  const columns = Array.from({ length: 3 }, (_, i) =>
    artworks.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <LayoutGroup>
      <motion.div
        id="gallery-container"
        className="flex w-full flex-grow flex-col p-14 md:flex-row md:space-x-16 lg:space-x-36 lg:p-28"
      >
        {/* Render each column of artworks */}
        {artworks?.length === 0 ? (
          // TODO: Add a loading state
          <p>Loading artworks...</p>
        ) : (
          columns.map((artworks, i) => (
            <Column
              key={i}
              index={i}
              artworks={artworks}
              isMobile={isMobile}
              toggleLikeArtwork={toggleLikeArtwork}
            />
          ))
        )}
      </motion.div>
    </LayoutGroup>

    // <div className="gallery-container">
    //   {artworks.length === 0 ? (
    //     <p>Loading artworks...</p>
    //   ) : (
    //     <div className="gallery">
    //       {artworks.map((artwork: ArtworkType) => (
    //         <div key={artwork.id} className="artwork-item">
    //           <img src={artwork.image} alt={artwork.title} />
    //           <h3>{artwork.title}</h3>
    //           <button onClick={() => toggleLikeArtwork(artwork.id)}>
    //             {artwork.liked ? "Unlike" : "Like"}
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default GalleryContainer;
