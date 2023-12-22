import React, { useEffect } from "react";
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

interface ArtCardProps {
  index: number;
  artwork: Artwork;
  onNearEnd?: () => void; // Callback for when the card is near the end of the viewport
}

/**
 * The ArtCard component displays an art card with an image, title, and dimensions.
 * @param {ArtCardProps} props - The props for the ArtCard component.
 * @param {number} props.index - The index of the art card.
 * @param {Artwork} props.artwork - The artwork object containing information about the art.
 * @param {Function} props.onNearEnd - The callback function to be called when the card is near the end of the viewport.
 * @returns {JSX.Element} The rendered ArtCard component.
 */
const ArtCard: React.FC<ArtCardProps> = ({ artwork, index, onNearEnd }) => {
  const router = useRouter();
  const { id, title, dimensions, mainImage } = artwork;

  // Use context to toggle like
  const { toggleSaveArtwork, isArtworkSaved } = useUser();

  const boxShadow =
    "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";

  const ref = useRef(null);

  const entry = useIntersectionObserver(ref, {
    threshold: [0, 0.25, 0.5, 0.75, 1], // Example of multiple thresholds
    rootMargin: "50px 0px", // Example root margin; adjust as needed
  });

  /**
   * Handles the click event on the art card.
   */
  const handleClick = () => {
    router.push(`/artworks/${id}`);
  };

  useEffect(() => {
    if (entry?.isIntersecting && onNearEnd) {
      onNearEnd();
    }
  }, [entry, onNearEnd]);

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
        whileTap={{ scale: 0.99 }}
      >
        <Image
          className="mx-auto self-center"
          src={mainImage?.data.attributes.url}
          alt={title}
          style={{ maxWidth: "100%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
          loading={index < 6 ? "eager" : "lazy"}
          {...(index < 6 && { priority: true })}
        />
      </motion.div>
      <div className=" mt-8 w-full flex-col space-y-2 px-1 leading-normal md:space-y-3">
        <h2
          className="xl:text-md lg:text-md cursor-pointer font-default text-xs font-500 uppercase  tracking-normal text-gray-600 md:text-xs md:tracking-wide 2xl:text-lg"
          onClick={handleClick}
          // style={{
          //   lineHeight: "0.2rem",
          // }}
        >
          {title}
        </h2>
        {/* <Divider className="my-0 w-full" /> */}
        <div className=" flex w-full items-center justify-between">
          <p className="xl:text-md font-default text-xs text-gray-600 md:text-xs lg:text-sm 2xl:text-lg">
            {dimensions?.dimensions}
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

export default ArtCard;
