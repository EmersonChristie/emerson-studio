import * as React from "react";
import { useState, useEffect, useRef, MouseEvent, TouchEvent } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup, Point } from "framer-motion";
import useShadow from "@/lib/hooks/use-box-shadow";
import useWindowSize from "@/lib/hooks/use-window-size";
import { ArtworkType } from "../../types/global";
import { FADE_UP_ANIMATION } from "@/lib/constants";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Divider from "../shared/divider";

import ZoomComponent from "../shared/zoom-component";

interface SliderProps {
  artworks: ArtworkType[];
  currentIndex: number;
}

interface DescProps {
  artwork: ArtworkType;
  isOpen: boolean;
  toggleOpen: () => void;
}

const ArtDescription = ({ artwork }: DescProps) => {
  return (
    <>
      <motion.div
        {...FADE_UP_ANIMATION}
        className="flex h-auto w-full flex-row"
      >
        <div
          className=" lg:text-md ml-10 mb-5 flex w-full flex-col justify-center text-left text-xs font-light  text-gray-600 md:ml-0 md:mb-0 md:mr-5 md:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl"
          id="descrition-text"
        >
          <p className="">
            <span className="font-bold  uppercase leading-loose tracking-wide text-gray-700 md:leading-loose">
              {artwork.title}
            </span>
            <span className="tracking-wide text-gray-500">
              {" "}
              / {artwork.year}
            </span>
          </p>
          <Divider />
          <p>
            <span className="leading-normal md:leading-loose ">
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

  const imageRef = useRef<HTMLImageElement>(null);

  // Function to open modal on image click
  const onTap = () => {
    console.log("image clicked");
  };

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

  // State to track if the first image animation has been played
  const [buttonHasAnimated, setButtonHasAnimated] = useState(false);

  const pulseAnimation = {
    scale: [1, 1.05, 1], // scale up and down
    boxShadow: [
      "0px 0px 8px rgba(0,0,0,0.3)",
      "0px 0px 12px rgba(0,0,0,0.6)",
      "0px 0px 8px rgba(0,0,0,0.3)",
    ], // increase and decrease shadow
    transition: {
      duration: 1, // duration of the whole animation
      repeat: Infinity, // repeat 3 times
      repeatType: "loop", // repeat in a loop
    },
  };

  // Update the state when the first image is animated
  useEffect(() => {
    if (!buttonHasAnimated) {
      setButtonHasAnimated(true);
    }
  }, []);

  const arrowStyle = {
    top: "calc(50% - 20px)",
    position: "absolute",
    borderRadius: "50%",
    background: "transparent",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    // visibility: isDesktop ? "visible" : "hidden",
  };

  const boxShadow = useShadow(7, {
    angle: 38,
    length: 35,
    finalBlur: 20,
    spread: 0,
    finalTransparency: 0.19,
  });

  // Ensure the URL is updated when the artwork changes
  useEffect(() => {
    updateUrl(currentIndex);
  }, [currentIndex]);

  return (
    <>
      <LayoutGroup>
        <div
          className={`flex h-full w-full flex-row items-center justify-center  ${
            isMobile ? "flex-col" : ""
          }`}
        >
          <div
            className={`relative z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden ${
              isMobile ? "w-full" : "w-2/3"
            }`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                ref={imageRef}
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
                // whileTap={{ scale: 1.3 }}
                onTap={onTap}
                style={{
                  position: "absolute",
                  maxHeight: "80%",
                  maxWidth: "80%",
                  boxShadow: boxShadow,
                }}
              />
            </AnimatePresence>
          </div>

          <motion.div
            className="next text-gray-500"
            onClick={() => paginate(1)}
            style={{ ...arrowStyle, right: "15px" }}
            whileHover={{
              scale: 1.3,
              transition: { duration: 0.5 },
              color: "black",
            }}
            whileTap={{ scale: 0.9 }}
            animate={currentIndex === 0 ? pulseAnimation : {}} // Add pulse animation if at the beginning
          >
            <ChevronRight />
          </motion.div>
          <motion.div
            className="prev text-gray-500"
            onClick={() => paginate(-1)}
            style={{
              ...arrowStyle,
              left: "15px",
            }}
            whileHover={{
              scale: 1.3,
              transition: { duration: 0.5 },
              color: "black",
            }}
            whileTap={{ scale: 0.9 }}
            animate={currentIndex === 0 ? pulseAnimation : {}} // Add pulse animation if at the beginning
          >
            <ChevronLeft />
          </motion.div>
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
