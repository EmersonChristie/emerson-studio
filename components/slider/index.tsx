import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import useShadow from "@/lib/hooks/use-box-shadow";
import useWindowSize from "@/lib/hooks/use-window-size";
import { ArtworkType } from "../../types/global";
import { FADE_UP_ANIMATION } from "@/lib/constants";

interface SliderProps {
  artworks: ArtworkType[];
  currentIndex: number;
}

interface DescProps {
  artwork: ArtworkType;
  isOpen: boolean;
  toggleOpen: () => void;
}

const descVariants = {
  open: {
    opacity: 1,
    y: 0,
    type: "spring",
  },
  closed: {
    opacity: 0,
    y: -5,
    type: "spring",
  },
};

const ArtDescription = ({ artwork, isOpen, toggleOpen }: DescProps) => {
  return (
    <>
      <motion.div
        {...FADE_UP_ANIMATION}
        className="flex h-auto w-full flex-row"
      >
        <div
          className=" md:text-md ml-10 mb-3 flex w-full flex-col justify-center text-left text-xs font-light text-gray-700 md:ml-0 md:mb-0 lg:text-lg xl:text-2xl"
          id="descrition-text"
        >
          <p>
            <span className="font-bold italic leading-tight md:leading-normal">
              {artwork.title}
            </span>
            <span className="">, {artwork.year}</span>
          </p>
          <p>
            <span className="leading-normal md:leading-loose">
              {artwork.dimensions}
            </span>
          </p>
          <p>
            <span className="leading-normal md:leading-loose">
              {artwork.medium}
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

///////////////////MAIN FUNCTION//////////////////////////////////////////////
export default function Slider({ artworks, currentIndex }: SliderProps) {
  const router = useRouter();

  const [[page, direction], setPage] = useState([0, 0]);

  //   const imageIndex = wrap(0, images.length, page);
  // const imageIndex = wrap(1, 10, page);

  const { isMobile, isDesktop } = useWindowSize();

  // Determine the current artwork and adjacent artworks
  const currentArtwork = artworks[currentIndex];
  const nextArtwork = artworks[(currentIndex + 1) % artworks.length];
  const prevArtwork =
    artworks[(currentIndex - 1 + artworks.length) % artworks.length];

  // Update the paginate function to handle actual artwork navigation
  const paginate = (newDirection: number) => {
    const newIndex =
      (currentIndex + newDirection + artworks.length) % artworks.length;
    updateUrl(newIndex);
    setPage([newIndex, newDirection]); // Update as a tuple
  };

  // Update the URL when the artwork changes
  const updateUrl = (newIndex: number) => {
    const newArtwork = artworks[newIndex];
    const newUrl = `/artworks/${newArtwork.id}`; // Adjust URL pattern as needed
    router.replace(newUrl, undefined, { shallow: true });
  };

  const arrowStyle = {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "transparent",
    borderRadius: "30px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    visibility: isDesktop ? "visible" : "hidden",
  };

  const boxShadow = useShadow(7, {
    angle: 40,
    length: 35,
    finalBlur: 20,
    spread: 0,
    finalTransparency: 0.17,
  });

  // Ensure the URL is updated when the artwork changes
  useEffect(() => {
    updateUrl(currentIndex);
  }, [currentIndex]);

  return (
    <>
      <LayoutGroup>
        <div
          className={`flex h-full w-full flex-row items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300  ${
            isMobile ? "flex-col" : ""
          }`}
        >
          <div
            className={`relative z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden ${
              isMobile ? "w-full" : "w-3/4"
            }`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="image "
                key={currentArtwork.id}
                src={currentArtwork.mainImageUrlMedium}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                style={{
                  position: "absolute",
                  maxHeight: "80%",
                  maxWidth: "80%",
                  boxShadow: boxShadow,
                }}
              />
            </AnimatePresence>
          </div>

          <div
            className="next"
            onClick={() => paginate(1)}
            style={{ ...arrowStyle, right: "15px" }}
          >
            {"‣"}
          </div>
          <div
            className="prev"
            onClick={() => paginate(-1)}
            style={{
              ...arrowStyle,
              left: "15px",
              transform: "scale(-1)",
            }}
          >
            {"‣"}
          </div>
          <div
            id="description"
            className={`relative flex h-28 w-full flex-row justify-between ${
              isMobile ? "w-full" : "w-1/4"
            }`} // Adjust for desktop view
          >
            <div className="flex">
              <AnimatePresence>
                <ArtDescription artwork={currentArtwork} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>
    </>
  );
}
