import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useShadow from "@/lib/hooks/use-box-shadow";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { useRef } from "react";
import { ArtworkType } from "types/global";
import SaveButton from "../shared/save-button";
import Divider from "../shared/divider";

import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants";

import { useGalleryContext } from "@/lib/context/gallery-context";

/**
 * The ArtCard component displays an art card with an image, title, and dimensions.
 */
const ArtCard = ({
  id,
  title,
  dimensions,
  mainImageUrlMedium,
  saved,
}: ArtworkType) => {
  const router = useRouter();

  // Use context to toggle like
  const { toggleSaveArtwork } = useGalleryContext();

  const boxShadow = useShadow(7, {
    angle: 40,
    length: 25,
    finalBlur: 25,
    spread: 0,
    finalTransparency: 0.2,
  });

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
          src={mainImageUrlMedium}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "25%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
        />
      </motion.div>
      <div className=" font-unicaone mt-8 w-full">
        <h2
          className="font-unicaone xl:text-md lg:text-sm2xl:text-lg cursor-pointer text-xs font-600 uppercase leading-10 tracking-wide text-gray-600 md:text-xs md:tracking-wider 3xl:text-xl 4xl:text-2xl"
          onClick={handleClick}
          style={{
            lineHeight: "1.5rem",
          }}
        >
          {title}
        </h2>

        <div className="mt-2 flex w-full items-center justify-between">
          <p className="font-unicaone xl:text-md text-xs leading-10 text-gray-600 md:text-xs lg:text-sm 2xl:text-lg 3xl:text-xl 4xl:text-2xl">
            {dimensions.split(";")[0]}
          </p>
          {/* <button onClick={() => toggleSaveArtwork(id)}>
          {saved ? "UnSave" : "Save"}
        </button> */}
          <SaveButton saved={saved} onClick={() => toggleSaveArtwork(id)} />
        </div>
      </div>
    </motion.div>
  );
};

export default ArtCard;
