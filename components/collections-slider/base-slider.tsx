import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import debounce from "lodash.debounce";
import { Artwork } from "types/global";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useWindowSize from "@/lib/hooks/use-window-size";
import { CSSProperties } from "react";
import { BOX_SHADOW } from "@/lib/constants";
import Title from "./title";
import Slide from "./slide";

// TypeScript props definition
interface SliderProps {
  collections: string[][]; // Array of arrays for background colors
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export const BaseSlider: React.FC<SliderProps> = ({ collections }) => {
  const { isMobile } = useWindowSize();
  const [pageIndex, setPageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const yPositions = collections.map(() => useMotionValue(0));
  const lastScrollY = useRef(0);
  const scrollThreshold = 0; // 0 works best so far
  // const scrollDirection = useScrollDirection(2);

  // Debounce slide transition function
  const debouncedTransition = useCallback(
    debounce((newIndex: number) => setSlideIndex(newIndex), 100), // 100 works best so far
    [],
  );

  useEffect(() => {
    console.log("Is Horizontal:", isHorizontal); // Debugging line
    const handleScroll = () => {
      const deltaY = window.scrollY - lastScrollY.current;
      if (Math.abs(deltaY) > scrollThreshold) {
        const newIndex =
          deltaY > 0
            ? Math.min(slideIndex + 1, collections[pageIndex].length - 1)
            : Math.max(slideIndex - 1, 0);
        console.log("Current slideIndex:", slideIndex); // Debugging line
        console.log("Direction:", deltaY > 0 ? "down" : "up"); // Debugging line
        console.log("New slide index:", newIndex); // Debugging line
        // Set isHorizontal to false for vertical scrolling
        setIsHorizontal(false);
        debouncedTransition(newIndex);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [debouncedTransition, slideIndex, collections, pageIndex]);

  const paginate = (newDirection: number) => {
    // Horizontal transition logic
    setIsHorizontal(true);
    let newPageIndex = pageIndex + newDirection;
    newPageIndex = Math.max(0, Math.min(newPageIndex, collections.length - 1));
    console.log("New page index:", newPageIndex); // Debugging line
    setPageIndex(newPageIndex);
    setSlideIndex(0);
  };

  const horizontalVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const verticalVariants = {
    enter: { y: "100%", opacity: 0 },
    center: { y: 0, opacity: 1, zIndex: 1 },
    exit: { y: "-100%", opacity: 0, zIndex: 0 },
  };

  const variants = isHorizontal ? horizontalVariants : verticalVariants;

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
    <div
      className="relative h-screen w-full overflow-hidden"
      // onWheel={handleScroll}
    >
      <AnimatePresence>
        {collections[pageIndex].map((backgroundColor, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            variants={isHorizontal ? horizontalVariants : verticalVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
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
          >
            {/* Render the slide if it's the current one in the view */}
            {index === slideIndex && (
              <Slide className={backgroundColor}>
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold text-white">
                    Page Index: {pageIndex}
                  </h1>
                  <h1 className="text-3xl font-bold text-white">
                    {backgroundColor}
                  </h1>
                  <h1 className="text-3xl font-bold text-white">
                    Slide Index: {slideIndex}
                  </h1>
                </div>
              </Slide>
            )}
          </motion.div>
        ))}
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
