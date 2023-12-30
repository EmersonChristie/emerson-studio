import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork } from "types/global";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useWindowSize from "@/lib/hooks/use-window-size";
import { CSSProperties } from "react";
import { BOX_SHADOW } from "@/lib/constants";
import Title from "./title";
// TypeScript props definition
interface SliderProps {
  artworks: Artwork[];
  background: string; // URL of the background image
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export const HomePageSlider: React.FC<SliderProps> = ({
  artworks,
  background,
}) => {
  const { isMobile } = useWindowSize();
  const [[page, direction], setPage] = useState([0, 0]);

  const wrap = (index: number, length: number) => {
    return index >= 0 ? index % length : length + (index % length);
  };

  const imageIndex = wrap(page, artworks.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const arrowStyle: CSSProperties = {
    position: "absolute" as const,
    // Explicitly cast 'top' and 'bottom' to strings or 'undefined'
    top: isMobile ? undefined : "50%",
    bottom: isMobile ? "1.66%" : undefined,
    zIndex: 1,
    cursor: "pointer",
    userSelect: "none",
    // Ensure fontSize is a string
    fontSize: isMobile ? "1rem" : "3rem",
  };

  const getArrowPadX = () => {
    return isMobile ? "0.5rem" : "1rem";
  };

  return (
    <div className="  h-screen w-full bg-white">
      <div
        className="relative  flex h-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300"
        // style={{ paddingTop: "20%" }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={artworks[imageIndex].mainImage.data.attributes.url}
            alt={artworks[imageIndex].title}
            className="  object-contain"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{
              position: "absolute",
              maxHeight: "75%",
              maxWidth: "80%",
              boxShadow: BOX_SHADOW,
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
            // style={{ boxShadow: BOX_SHADOW }}
            // custom={direction}
            // variants={variants}
            // initial="enter"
            // animate="center"
            // exit="exit"
            // transition={{
            //   x: { type: "spring", stiffness: 300, damping: 30 },
            //   opacity: { duration: 0.2 },
            // }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            // onDragEnd={(e, { offset, velocity }) => {
            //   const swipe = swipePower(offset.x, velocity.x);
            //   if (swipe < -swipeConfidenceThreshold) {
            //     paginate(1);
            //   } else if (swipe > swipeConfidenceThreshold) {
            //     paginate(-1);
            //   }
            // }}
          />
          {/* <Title text={artworks[imageIndex].title} key={`title-${page}`} /> */}
        </AnimatePresence>
        <motion.div
          className="next text-gray-500"
          onClick={() => paginate(1)}
          style={{ ...arrowStyle, right: getArrowPadX() }}
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
          className="prev text-gray-500"
          onClick={() => paginate(-1)}
          style={{
            ...arrowStyle,
            left: getArrowPadX(),
          }}
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
    </div>
  );
};
