import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Artwork } from "types/global";
import useWindowSize from "@/lib/hooks/use-window-size";
const { useUser } = require("@/lib/context/user-context");

const ArtworkThumbnails = () => {
  const [inquireArtworks, setInquireArtworks] = useState<Artwork[]>([]);
  const { selectedInquireArtworks, setSelectedInquireArtworks } = useUser();
  useEffect(() => {
    if (selectedInquireArtworks?.length !== 0) {
      setInquireArtworks(selectedInquireArtworks);
    } else {
      setInquireArtworks([]);
    }
  }, [selectedInquireArtworks]);
  const { isMobile } = useWindowSize();

  const hasOverflow = selectedInquireArtworks.length > (isMobile ? 4 : 9); // Adjust logic if necessary

  return (
    <div className="flex w-full items-center">
      {/* Thumbnails Container */}
      <div className="flex overflow-hidden">
        {inquireArtworks.map((artwork: Artwork, index: number) => (
          <img
            key={index}
            src={artwork.mainImage.data.attributes.url}
            alt={`Artwork ${index + 1}`}
            className="mr-1 h-8 w-8 rounded-lg object-cover" // Adjust size as needed
          />
        ))}
      </div>

      {/* Overflow Indicator */}
      {hasOverflow && <p className="px-1 text-gray-600">...</p>}
    </div>
  );
};

interface FloatingButtonProps {
  onClick: () => void;
}

interface InquireButtonProps {
  onClick: () => void;
}

const InquireBotton: React.FC<InquireButtonProps> = ({ onClick }) => {
  const [inquireArtworks, setInquireArtworks] = useState<Artwork[]>([]);
  const { selectedInquireArtworks, setSelectedInquireArtworks } = useUser();
  useEffect(() => {
    if (selectedInquireArtworks?.length !== 0) {
      setInquireArtworks(selectedInquireArtworks);
    }
  }, [selectedInquireArtworks]);
  const { isMobile } = useWindowSize();

  return (
    <div
      onClick={onClick}
      className="flex w-full items-center justify-between p-1 md:p-3"
    >
      <span className="artworks flex w-full items-center px-2">
        <ArtworkThumbnails />
      </span>
      <button className="flex w-full items-center justify-around rounded-sm border border-gray-200 bg-gray-200 py-1 px-1 text-sm font-400 text-gray-600 md:text-base">
        Inquire about {inquireArtworks.length} Artworks
      </button>
    </div>
  );
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  // Animation properties
  return (
    <>
      <AnimatePresence>
        <motion.div
          className="w-9/10 fixed bottom-0 left-1/2 mb-4 flex translate-x-4 transform flex-row justify-between rounded-lg bg-white p-3 shadow-lg md:w-1/2"
          style={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            marginBottom: "1rem",
            width: "90%",
            maxWidth: "50rem",
            transform: "translateX(-50%)",
            borderRadius: "0.35rem",
            backgroundColor: "white",
            padding: "0.15rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.25)",
          }}
          onClick={onClick}
        >
          <InquireBotton onClick={onClick} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FloatingButton;
