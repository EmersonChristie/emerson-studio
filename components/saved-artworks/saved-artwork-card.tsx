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

  const boxShadow =
    "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";

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
          src={mainImage.data.attributes.url}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "100%", boxShadow: boxShadow }}
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
