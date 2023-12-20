import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useShadow from "@/lib/hooks/use-box-shadow";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { useRef } from "react";
import { Artwork } from "types/global";
import SaveButton from "../shared/save-button";
import Divider from "../shared/divider";

import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants";

import { useUser } from "../../lib/context/user-context";
/**
 * The SavedArtworkCard component displays an art card with an image, title, and dimensions.
 */
const SavedArtworkCard = (artwork: Artwork) => {
  const router = useRouter();

  // Use context to toggle like
  const { toggleSaveArtwork, isArtworkSaved } = useUser();

  const boxShadow = useShadow(7, {
    angle: 40,
    length: 25,
    finalBlur: 25,
    spread: 0,
    finalTransparency: 0.16,
  });

  const { id, title, dimensions, mainImage } = artwork;

  // Create a ref for the element we want to observe.
  const ref = useRef(null);

  // Use the Intersection Observer hook to check when the element comes into view and which direction
  // it is scrolling in.
  const entry = useIntersectionObserver(ref, {
    threshold: 0,
  });

  // Route to the artwork detail page when the user clicks on the card.
  const handleClick = () => {
    // Navigate to the artwork detail page
    router.push(`/artworks/${id}`);
  };

  return (
    <motion.div
      ref={ref}
      className="md:mb-30 mb-20 flex flex-col items-start justify-center lg:mb-40"
      variants={FADE_UP_ANIMATION_VARIANTS}
      initial="hidden"
      animate={entry?.isIntersecting ? "show" : "hidden"}
    >
      <motion.div
        className="cursor-pointer"
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          className="mx-auto self-center"
          src={mainImage.url}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "25%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
        />
      </motion.div>
      <div className=" font-unicaone mt-8 w-full">
        <h2
          className="font-unicaone xl:text-md cursor-pointer text-xs font-600 uppercase leading-10 tracking-wide text-gray-600 md:text-xs md:tracking-wider lg:text-sm 2xl:text-lg"
          onClick={handleClick}
          style={{
            lineHeight: "1.5rem",
          }}
        >
          {title}
        </h2>

        <div className="mt-2 flex w-full items-center justify-between">
          <p className="font-unicaone xl:text-md text-xs leading-10 text-gray-600 md:text-xs lg:text-sm 2xl:text-lg">
            {dimensions.dimensions}
          </p>
          <SaveButton
            saved={isArtworkSaved(id)}
            onClick={() => toggleSaveArtwork(artwork)}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SavedArtworkCard;
