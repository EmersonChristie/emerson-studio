import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Artwork } from "../../types/global"; // Assuming you have a type definition for Artwork
import { LayoutGroup, motion } from "framer-motion";
import ResponsiveGrid from "../shared/responsive-grid";
import SavedArtworkCard from "./saved-artwork-card";
import Divider from "../shared/divider";
import HeadingText from "../shared/headingText";
import { useUser } from "@/lib/context/user-context";
import PageHeader from "../shared/page-header";
import InquiryModal from "./inquiry-modal";
import FloatingButton from "./floating-button";

import ArtworkCard from "./artwork-card";
/**
 * SavedArtworksContainer component.
 * Utilizes the gallery context to display saved artworks and handle interactions.
 */
const SavedArtworksContainer = () => {
  const {
    savedArtworks,
    toggleSaveArtwork,
    selectedInquireArtworks,
    setSelectedInquireArtworks,
  } = useUser();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const router = useRouter();

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

      <div className="flex w-full flex-col px-2 md:px-10">
        <PageHeader title="Saved Artworks" />

        <div className="flex w-full flex-col items-center justify-center">
          {/* Render each column of artworks */}
          {artworks?.length === 0 ? (
            // TODO: Add a loading state
            <div className="flex h-full w-full flex-col items-center justify-center">
              <p className="text-center text-gray-600">No Saved Artworks</p>
              <button
                className="mt-10 rounded-sm border border-gray-600 bg-gray-600 px-4 py-2 uppercase tracking-wide text-gray-100 hover:text-white"
                onClick={() => router.push("/artworks")}
              >
                Browse Artworks
              </button>
            </div>
          ) : (
            <ResponsiveGrid>
              {artworks.map((artwork, i) => (
                // <SavedArtworkCard key={i} artwork={artwork} />
                <ArtworkCard key={i} artwork={artwork} />
              ))}
            </ResponsiveGrid>
          )}
        </div>
      </div>
      {/* </motion.div> */}

      <FloatingButton onClick={() => console.log("FLoating Button CLicked")} />

      {/* <InquiryModal
        maxHeight="80%"
        maxWidth="80%"
        inquiryArtworks={inquiryArtworks}
      /> */}
    </LayoutGroup>
  );
};

export default SavedArtworksContainer;
