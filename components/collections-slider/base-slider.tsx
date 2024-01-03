import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork } from "types/global";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useWindowSize from "@/lib/hooks/use-window-size";
import { CSSProperties } from "react";
import { BOX_SHADOW } from "@/lib/constants";
import Title from "./title";
import Slide from "./slide";
import useScroll from "@/lib/hooks/use-scroll";

// TypeScript props definition
interface SliderProps {
  collections: string[][]; // Array of arrays for background colors
}

// const variants = {
//   enter: (direction: number) => ({
//     x: direction > 0 ? 1000 : -1000,
//     opacity: 0,
//   }),
//   center: {
//     zIndex: 1,
//     x: 0,
//     opacity: 1,
//   },
//   exit: (direction: number) => ({
//     zIndex: 0,
//     x: direction < 0 ? 1000 : -1000,
//     opacity: 0,
//   }),
// };

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export const BaseSlider: React.FC<SliderProps> = ({ collections }) => {
  const { isMobile } = useWindowSize();
  const [[pageIndex, direction], setPage] = useState([0, 0]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);

  const horizontalVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const verticalVariants = {
    enter: { y: 300, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -300, opacity: 0 },
  };

  const variants = isHorizontal ? horizontalVariants : verticalVariants;

  const paginate = (newDirection: number) => {
    setIsHorizontal(true);
    let newPageIndex = pageIndex + newDirection;
    newPageIndex = Math.max(0, Math.min(newPageIndex, collections.length - 1));
    setPage([newPageIndex, newDirection]);
    setSlideIndex(0);
  };

  const goToNextSlide = () => {
    console.log("Current slideIndex:", slideIndex); // Debugging line
    setIsHorizontal(false);
    setSlideIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      console.log("New slideIndex:", newIndex); // Debugging line
      return newIndex < collections[pageIndex].length ? newIndex : prevIndex;
    });
  };

  const arrowStyle: CSSProperties = {
    position: "absolute" as const,
    top: isMobile ? undefined : "50%",
    bottom: isMobile ? "1.66%" : undefined,
    zIndex: 1,
    cursor: "pointer",
    userSelect: "none",
    fontSize: isMobile ? "1rem" : "3rem",
  };

  const getArrowPadX = () => {
    return isMobile ? "0.5rem" : "1rem";
  };

  return (
    <div className="relative h-screen w-full bg-gray-300">
      <AnimatePresence initial={false} custom={direction}>
        {collections[pageIndex].map(
          (backgroundColor, index) =>
            index === slideIndex && (
              <motion.div
                key={index}
                className="absolute inset-0 z-10" // Position absolutely within the parent
                // className="relative flex h-full items-center justify-center"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 250, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <>
                  <Slide className={backgroundColor}>
                    {/* Slide content */}
                    <h1>{index}</h1>
                    <h1>{backgroundColor}</h1>
                  </Slide>
                  {index < collections[pageIndex].length - 1 && (
                    <button
                      onClick={goToNextSlide}
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 transform cursor-pointer rounded-md bg-white p-2"
                    >
                      Next
                    </button>
                  )}
                </>
                )
              </motion.div>
            ),
        )}
      </AnimatePresence>
      <motion.div
        className="next z-20 text-gray-500"
        onClick={() => paginate(1)}
        style={{ ...arrowStyle, right: getArrowPadX(), zIndex: 20 }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
      <motion.div
        className="prev z-20 text-gray-500"
        onClick={() => paginate(-1)}
        style={{ ...arrowStyle, left: getArrowPadX(), zIndex: 20 }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
    </div>
  );
};
