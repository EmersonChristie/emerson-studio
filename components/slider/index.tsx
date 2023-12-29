import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Divider from "../shared/divider";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Artwork } from "types/global";
import { FADE_UP_ANIMATION } from "@/lib/constants";
import SaveButton from "../shared/save-button";
import { useUser } from "../../lib/context/user-context";
import { useArtworks } from "@/lib/context/artworks-context";

interface SliderProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ArtDescription: React.FC<Artwork> = (artwork) => {
  const { toggleSaveArtwork, isArtworkSaved } = useUser();

  return (
    <motion.div
      {...FADE_UP_ANIMATION}
      className="flex h-auto w-full flex-row justify-between  px-10 pb-16 md:ml-1 md:mb-0 md:mr-1 md:flex-col md:px-0 md:pb-0 xl:mr-10"
    >
      <div
        className="lg:text-md xl:text-md mb-5 flex w-full flex-col justify-center text-left text-xs font-light text-gray-600 md:text-sm 2xl:text-lg"
        id="descrition-text"
      >
        <p>
          <span className="font-500 uppercase leading-loose tracking-wide text-gray-600 md:leading-loose">
            {artwork.title}
          </span>
          <span className="tracking-wide text-gray-500"> / {artwork.year}</span>
        </p>
        <Divider animated={true} className="my-2" />
        <div className="flex flex-row items-center justify-between md:flex-col md:items-start md:justify-start">
          <div className="flex flex-col">
            <p>
              <span className="leading-normal md:leading-loose">
                {artwork?.dimensions.dimensions}
              </span>
            </p>
            <p>
              <span className="leading-normal md:leading-loose">
                {artwork.medium}
              </span>
            </p>
          </div>
          <div className="md:pt-6">
            <SaveButton
              saved={isArtworkSaved(artwork.id)}
              onClick={() => toggleSaveArtwork(artwork)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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

const Slider: React.FC<SliderProps> = ({ currentIndex, onIndexChange }) => {
  const router = useRouter();
  const [[page, direction], setPage] = useState([0, 0]);
  const imageRef = useRef<HTMLImageElement>(null);
  const { isMobile } = useWindowSize();
  const { artworks, loadMoreArtworks, hasMoreArtworks } = useArtworks();
  const currentArtwork = artworks[currentIndex];
  const nextArtwork = artworks[(currentIndex + 1) % artworks.length];
  const prevArtwork =
    artworks[(currentIndex - 1 + artworks.length) % artworks.length];

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

  const paginate = (newDirection: number) => {
    const newIndex =
      (currentIndex + newDirection + artworks.length) % artworks.length;
    if (newIndex === artworks.length - 1 && hasMoreArtworks) {
      console.log("Loading more artworks");
      loadMoreArtworks();
    }
    setPage([newIndex, newDirection]);
    onIndexChange(newIndex);
  };

  const updateUrl = (newIndex: number) => {
    const newArtwork = artworks[newIndex];
    const newUrl = `/artworks/${newArtwork.id}`;
    router.replace(newUrl, undefined, { shallow: true });
  };

  const boxShadow =
    "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";

  useEffect(() => {
    updateUrl(currentIndex);
  }, [currentIndex]);

  const onTap = () => {
    console.log("image clicked");
  };

  if (!currentArtwork) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutGroup>
      <div
        className={`flex h-full w-full flex-row items-center justify-center md:mx-20 ${
          isMobile ? "flex-col" : ""
        }`}
        style={{ paddingTop: isMobile ? "2rem" : "3rem" }}
      >
        <motion.div
          className={
            "relative z-0 flex h-full w-full flex-col items-center justify-center overflow-hidden md:pr-9"
          }
          style={{ width: isMobile ? "100%" : "75%" }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              className="image"
              key={currentArtwork.id}
              src={currentArtwork.mainImage.data.attributes.url}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              onTap={onTap}
              style={{
                position: "absolute",
                maxHeight: "80%",
                maxWidth: "90%",
                boxShadow: boxShadow,
              }}
              ref={imageRef}
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
            />
          </AnimatePresence>
        </motion.div>

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
        <div
          id="description"
          className={"relative flex h-28 w-full flex-row justify-between"}
          style={{ width: isMobile ? "100%" : "33%" }}
        >
          <AnimatePresence>
            <ArtDescription {...currentArtwork} />
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default Slider;
