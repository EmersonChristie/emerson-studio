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

  return (
    <div className="flex w-full items-center justify-center pr-2 md:pr-6">
      {/* Thumbnails Container */}
      <div className="flex overflow-hidden">
        {inquireArtworks.map((artwork: Artwork, index: number) => (
          <img
            key={index}
            src={artwork.mainImage.data.attributes.url}
            alt={`Artwork ${index + 1}`}
            className="mr-2 h-12 w-12 rounded-lg object-cover xl:h-16 xl:w-16" // Adjust size as needed
          />
        ))}
      </div>
    </div>
  );
};

interface FloatingButtonProps {
  onClick: () => void;
}

interface InquireButtonProps {
  onClick: () => void;
}

const InquireButton: React.FC<InquireButtonProps> = ({ onClick }) => {
  const [inquireArtworks, setInquireArtworks] = useState<Artwork[]>([]);
  const { selectedInquireArtworks, setSelectedInquireArtworks } = useUser();
  useEffect(() => {
    if (selectedInquireArtworks?.length !== 0) {
      setInquireArtworks(selectedInquireArtworks);
    }
  }, [selectedInquireArtworks]);
  const { isMobile } = useWindowSize();

  return (
    // <div
    //   onClick={onClick}
    //   className="flex  w-full items-stretch justify-between"
    // >
    //   <span className="artworks flex w-full items-center px-2">
    //     <ArtworkThumbnails />
    //   </span>
    //   <button className="3xl:text-3xl text-bold flex h-full items-center justify-around rounded-sm border border-gray-200 bg-gray-200 py-1 px-1 text-sm font-400 text-gray-900 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
    //     Inquire About {inquireArtworks.length} Artworks
    //   </button>
    // </div>
    <div
      onClick={onClick}
      className="flex w-full items-stretch" // Use flex to make children fill the container
    >
      <span className="flex w-3/5 items-center px-2">
        {/* Use flex-grow to fill width */}
        <ArtworkThumbnails />
      </span>
      <button className="text-bold 3xl:text-3xl flex w-2/5 flex-grow items-center justify-around rounded-sm border border-gray-200 bg-gray-200 py-1 px-1 text-sm font-400 text-gray-900 md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
        Inquire About {inquireArtworks.length} Artworks
      </button>
    </div>
  );
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  // Animation properties
  return (
    <>
      <AnimatePresence>
        {/* <motion.div
          className=" fixed bottom-0 left-1/2 mb-4 ml-10 flex  translate-x-4 transform flex-row justify-between rounded-lg bg-white p-3 md:left-1/2 md:w-1/2"
          style={{
            position: "fixed",
            bottom: 0,
            marginBottom: "1rem",
            width: "70%",
            maxWidth: "50rem",
            transform: "translateX(-50%)",
            borderRadius: "0.35rem",
            backgroundColor: "white",
            padding: "0.15rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.35), 0 4px 6px -4px rgba(0, 0, 0, 0.35)",
          }}
          onClick={onClick}
        > */}
        <motion.div
          className="shadow-up z-5 fixed inset-x-0 bottom-0 flex items-center justify-center bg-white p-4 pl-20 pb-6 md:pl-28 md:pr-28"
          onClick={onClick}
        >
          <InquireButton onClick={onClick} />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FloatingButton;
