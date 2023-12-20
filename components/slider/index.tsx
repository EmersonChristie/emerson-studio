import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Divider from "../shared/divider";
import useShadow from "@/lib/hooks/use-box-shadow";
import useWindowSize from "@/lib/hooks/use-window-size";
import { Artwork } from "../../types/global";
import { FADE_UP_ANIMATION } from "@/lib/constants";
import SaveButton from "../shared/save-button";
import { useUser } from "../../lib/context/user-context";

interface SliderProps {
  artworks: Artwork[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ArtDescription = (artwork: Artwork) => {
  const { toggleSaveArtwork, isArtworkSaved } = useUser();
  console.log("artwork:", artwork);
  return (
    <motion.div
      {...FADE_UP_ANIMATION}
      className="flex h-auto w-full flex-row md:flex-col"
    >
      <div
        className="lg:text-md ml-10 mb-5 flex w-full flex-col justify-center text-left text-xs font-light text-gray-600 md:ml-0 md:mb-0 md:mr-5 md:text-sm xl:text-lg 2xl:text-xl"
        id="descrition-text"
      >
        <p>
          <span className="font-bold uppercase leading-loose tracking-wide text-gray-700 md:leading-loose">
            {artwork.title}
          </span>
          <span className="tracking-wide text-gray-500"> / {artwork.year}</span>
        </p>
        <Divider />
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
      <div className="md:pt-5">
        <SaveButton
          saved={isArtworkSaved(artwork.id)}
          onClick={() => toggleSaveArtwork(artwork)}
        />
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

const Slider: React.FC<SliderProps> = ({
  artworks,
  currentIndex,
  onIndexChange,
}) => {
  const router = useRouter();
  const [[page, direction], setPage] = useState([0, 0]);
  const imageRef = useRef<HTMLImageElement>(null);
  const { isMobile, isDesktop } = useWindowSize();
  const currentArtwork = artworks[currentIndex];
  const nextArtwork = artworks[(currentIndex + 1) % artworks.length];
  const prevArtwork =
    artworks[(currentIndex - 1 + artworks.length) % artworks.length];

  const paginate = (newDirection: number) => {
    const newIndex =
      (currentIndex + newDirection + artworks.length) % artworks.length;
    setPage([newIndex, newDirection]);
    onIndexChange(newIndex);
  };

  const updateUrl = (newIndex: number) => {
    const newArtwork = artworks[newIndex];
    const newUrl = `/artworks/${newArtwork.id}`;
    router.replace(newUrl, undefined, { shallow: true });
  };

  // const [buttonHasAnimated, setButtonHasAnimated] = useState(false);

  // const pulseAnimation = {
  //   scale: [1, 1.05, 1],
  //   boxShadow: [
  //     "0px 0px 8px rgba(0,0,0,0.3)",
  //     "0px 0px 12px rgba(0,0,0,0.6)",
  //     "0px 0px 8px rgba(0,0,0,0.3)",
  //   ],
  //   transition: {
  //     duration: 1,
  //     repeat: Infinity,
  //     repeatType: "loop",
  //   },
  // };

  // useEffect(() => {
  //   if (!buttonHasAnimated) {
  //     setButtonHasAnimated(true);
  //   }
  // }, []);

  const arrowStyle = {
    top: "calc(50% - 20px)",
    position: "absolute",
    borderRadius: "10%",
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
    visibility: isDesktop ? "visible" : "hidden",
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  };

  const boxShadow = useShadow(7, {
    angle: 38,
    length: 35,
    finalBlur: 20,
    spread: 0,
    finalTransparency: 0.15,
  });

  useEffect(() => {
    updateUrl(currentIndex);
  }, [currentIndex]);

  const onTap = () => {
    console.log("image clicked");
  };

  return (
    <LayoutGroup>
      <div
        className={`flex h-full w-full flex-row items-center justify-center ${
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
          // animate={currentIndex === 0 ? pulseAnimation : {}}
        >
          <ChevronRight size={48} />
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
          // animate={currentIndex === 0 ? pulseAnimation : {}}
        >
          <ChevronLeft size={48} />
        </motion.div>
        <div
          id="description"
          className={`relative flex h-28 w-full flex-row justify-between ${
            isMobile ? "w-full" : "w-1/4"
          }`}
        >
          <div className="flex">
            <AnimatePresence>
              <ArtDescription {...currentArtwork} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default Slider;
