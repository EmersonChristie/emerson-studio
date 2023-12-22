import React, { useEffect, useMemo } from "react";
import { Artwork } from "../../types/global"; // Assuming you have a type definition for Artwork
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";
import { useArtworks } from "@/lib/context/artworks-context";
import useWindowSize from "@/lib/hooks/use-window-size";

/**
 * Component for displaying a gallery of artworks.
 */
const GalleryContainer: React.FC = () => {
  const { artworks, loadMoreArtworks, hasMoreArtworks } = useArtworks();
  const { windowSize } = useWindowSize();

  // Determine if the grid is in a 3-column or 1-column layout
  const isThreeColumnLayout = (windowSize?.width ?? 0) > 768;

  /**
   * Split the artworks into columns based on the layout.
   */
  const columns = useMemo(() => {
    const chunkSize = Math.ceil(artworks.length / 3);
    return Array.from({ length: 3 }, (_, i) =>
      artworks.slice(i * chunkSize, i * chunkSize + chunkSize),
    );
  }, [artworks]);

  /**
   * Callback function when an artwork is near the end of a column.
   * If it is the last column and there is a second-to-last artwork, load more artworks.
   * @param index - The index of the column.
   * @param columnArtworks - The artworks in the column.
   */
  const onNearEnd = (index: number, columnArtworks: Artwork[]) => {
    const isLastColumn = isThreeColumnLayout ? index === 2 : index === 0;
    const isSecondToLastArtwork =
      columnArtworks.length > 1 && columnArtworks[columnArtworks.length - 2];
    if (isLastColumn && isSecondToLastArtwork && hasMoreArtworks) {
      console.log("loading more artworks in gallery container!!!!!!!!!!!!!!!");
      loadMoreArtworks();
    }
  };

  return (
    <LayoutGroup>
      <motion.div
        id="gallery-container"
        className="flex w-full flex-grow flex-col px-14 pt-28 md:m-3 md:flex-row md:space-x-16 lg:m-7 lg:space-x-28 xl:m-10 xl:space-x-32 2xl:space-x-40"
      >
        {artworks?.length === 0 ? (
          <p>Loading artworks...</p>
        ) : (
          columns.map((columnArtworks, i) => (
            <Column
              key={i.toString()}
              index={i}
              artworks={columnArtworks}
              onNearEnd={() => onNearEnd(i, columnArtworks)}
            />
          ))
        )}
      </motion.div>
    </LayoutGroup>
  );
};

export default GalleryContainer;
