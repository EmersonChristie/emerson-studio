import Image from "next/image";

import cx from "classnames";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import useWindowSize from "@/lib/hooks/use-window-size";
import useShadow from "@/lib/hooks/use-box-shadow";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { ArtworkType } from "types/global";

import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants";

import { useGalleryContext } from "@/lib/context/gallery-context";
/**
 * Props for the ArtCard component.
 */
interface ArtCardProps {
  id: number;
  title: string;
  dimensions: string;
  image: string;

  toggleLikeArtwork?: (artworkId: number) => void;
}

/**
 * The ArtCard component displays an art card with an image, title, and dimensions.
 */
const ArtCard = ({
  id,
  title,
  dimensions,
  mainImageUrlMedium,
  liked,
}: ArtworkType) => {
  const { isMobile, isDesktop } = useWindowSize();

  // Use context to toggle like
  const { toggleLikeArtwork } = useGalleryContext();

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

  return (
    <motion.div
      ref={ref}
      className="md:mb-30 mb-20 flex flex-col items-start justify-center lg:mb-40"
      variants={FADE_UP_ANIMATION_VARIANTS}
      initial="hidden"
      animate={entry?.isIntersecting ? "show" : "hidden"}
    >
      <div className="">
        <Image
          className="mx-auto self-center"
          src={mainImageUrlMedium}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "25%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
        />
      </div>
      <div className="mt-8 w-full font-sans">
        <h2 className="lg:text-md md:text-md text-xs font-400 uppercase leading-loose tracking-wider text-gray-600">
          {title}
        </h2>
        <p className="lg:text-md text-xs leading-loose text-gray-600 md:text-sm">
          {dimensions.split(";")[0]}
        </p>
        <button onClick={() => toggleLikeArtwork(id)}>
          {liked ? "Unlike" : "Like"}
        </button>
      </div>
    </motion.div>
  );
};

export default ArtCard;
