import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Artwork } from "types/global";

// Define the structure of each item in the list
interface SliderItem {
  artwork: Artwork;
}

// TypeScript props definition
interface SliderProps {
  items: SliderItem[];
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
  items,
  background,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const wrap = (index: number, length: number) => {
    return index >= 0 ? index % length : length + (index % length);
  };

  const imageIndex = wrap(page, items.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="relative max-h-3/4 max-w-3/4"
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
            <img
              src={items[imageIndex].artwork.mainImage.data.attributes.url}
              alt={items[imageIndex].artwork.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-white bg-opacity-50 p-4">
              {items[imageIndex].artwork.title}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="next cursor-pointer" onClick={() => paginate(1)}>
          {"‣"}
        </div>
        <div className="prev cursor-pointer" onClick={() => paginate(-1)}>
          {"‣"}
        </div>
      </div>
    </div>
  );
};
