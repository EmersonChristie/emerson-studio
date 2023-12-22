import React, { useEffect, useState } from "react";
import { useGalleryContext } from "@/lib/context/gallery-context"; // Adjust the path as necessary
import { Artwork } from "../../types/global"; // Assuming you have a type definition for Artwork
import { LayoutGroup, motion } from "framer-motion";
import ResponsiveGrid from "../shared/responsive-grid";
import SavedArtworkCard from "./saved-artwork-card";
import Divider from "../shared/divider";
import HeadingText from "../shared/headingText";
import { useUser } from "@/lib/context/user-context";

/**
 * SavedArtworksContainer component.
 * Utilizes the gallery context to display saved artworks and handle interactions.
 */
const SavedArtworksContainer = () => {
  // Access and manipulate gallery state using the context
  // const { savedArtworks, setSavedArtworks, toggleSaveArtwork } =
  //   useGalleryContext();

  const { savedArtworks, toggleSaveArtwork } = useUser();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  // Update the artworks state with the initial artworks from static props
  // useEffect(() => {
  //   if (initialSavedArtworks?.length !== 0) {
  //     setSavedArtworks(initialSavedArtworks);
  //   }
  // }, [initialSavedArtworks]);

  useEffect(() => {
    if (savedArtworks?.length !== 0) {
      setArtworks(savedArtworks);
    }
  }, [savedArtworks]);

  return (
    <LayoutGroup>
      {/* <motion.div
        id="saved-container"
        className="mt-10 flex w-full flex-grow flex-col p-14 md:m-3 md:flex-row md:space-x-16 lg:m-7 lg:space-x-28 xl:m-10 xl:space-x-36"
      > */}

      <div className="flex w-full flex-col px-10 pt-36">
        <div className="">
          <HeadingText text="Saved Artworks" />

          <Divider className="" />
        </div>
        <ResponsiveGrid>
          {/* Render each column of artworks */}
          {artworks?.length === 0 ? (
            // TODO: Add a loading state
            <p>Loading Saved Artworks...</p>
          ) : (
            savedArtworks.map((artwork, i) => (
              <SavedArtworkCard key={i} {...artwork} />
            ))
          )}
        </ResponsiveGrid>
      </div>
      {/* </motion.div> */}
    </LayoutGroup>
  );
};

export default SavedArtworksContainer;
