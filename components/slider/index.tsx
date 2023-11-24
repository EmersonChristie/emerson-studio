import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import galleryWall from "../../public/images/gallery-wall.jpg";
import useShadow from "@/lib/hooks/use-box-shadow";
import useWindowSize from "@/lib/hooks/use-window-size";

import Artworks from "../../public/data/emersonartworks.json";

// const images = Artworks.map((artwork) => artwork.mediumImage);

interface DescProps {
  id: number;
  title: string;
  dimensions: string;
  medium: string;
  year: string;
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

const ArtDescription = ({
  id,
  title,
  year,
  dimensions,
  medium,
  isOpen,
  toggleOpen,
}: DescProps) => {
  return (
    <>
      <motion.div
        variants={descVariants}
        initial="closed"
        animate="open"
        exit="closed"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex h-auto w-full flex-row"
      >
        <div
          className=" md:text-md mb-10 ml-10 flex w-full flex-col justify-center text-left text-xs font-light text-gray-700 lg:text-lg xl:text-2xl"
          id="descrition-text"
        >
          <p>
            <span className="font-bold italic leading-tight md:leading-normal">
              {title}
            </span>
            <span className="">, {year}</span>
          </p>
          <p>
            <span className="leading-normal md:leading-loose">
              {dimensions}
            </span>
          </p>
          <p>
            <span className="leading-normal md:leading-loose">{medium}</span>
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
export default function Slider() {
  const [[page, direction], setPage] = useState([0, 0]);

  //   const imageIndex = wrap(0, images.length, page);
  const imageIndex = wrap(1, 10, page);

  const { isMobile, isDesktop } = useWindowSize();

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const arrowStyle = {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "white",
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

  return (
    <>
      <LayoutGroup>
        <div
          className={`flex h-full w-full flex-row-reverse items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 pt-14 ${
            isMobile ? "flex-col" : ""
          }`}
          style={
            {
              // backgroundImage: `url(${galleryWall.src})`,
            }
          }
        >
          <div
            className={`relative z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden ${
              isMobile ? "w-full" : "w-3/4"
            }`}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="image "
                key={page}
                src={`/images/${imageIndex}.jpg`}
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
            <div className={`flex ${isDesktop ? "md:ml-10 lg:ml-28" : ""}`}>
              <AnimatePresence>
                <ArtDescription
                  id={imageIndex}
                  title="Test Title"
                  year="2021"
                  dimensions="36 x 48"
                  medium="Oil on Canvas"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </LayoutGroup>
    </>
  );
}
