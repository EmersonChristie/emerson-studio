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
}
/**
 * The ArtCard component displays an art card with an image, title, and dimensions.
 */
const ArtCard: React.FC<ArtCardProps> = ({ index, artwork }) => {
  const router = useRouter();
  const { id, title, dimensions, mainImage } = artwork;

  // Use context to toggle like
  const { toggleSaveArtwork, isArtworkSaved } = useUser();

  // const boxShadow = useShadow(7, {
  //   angle: 40,
  //   length: 25,
  //   finalBlur: 25,
  //   spread: 0,
  //   finalTransparency: 0.16,
  // });

  const boxShadow =
    "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";

  const ref = useRef(null);

  const entry = useIntersectionObserver(ref, {
    threshold: 0,
  });

  /**
   * Handles the click event for the art card.
   * Navigates to the artwork detail page.
   */
  const handleClick = () => {
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
          src={mainImage?.data.attributes.url}
          alt={title}
          style={{ maxWidth: "100%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
          loading={index < 6 ? "eager" : "lazy"}
          {...(index < 6 && { priority: true })}
        />
      </motion.div>
      <div className=" mt-8 w-full flex-col space-y-1 leading-loose md:space-y-6">
        <h2
          className="xl:text-md cursor-pointer font-display text-xs font-600 uppercase leading-10 tracking-wide text-gray-600 md:text-xs md:tracking-wider lg:text-sm 2xl:text-lg"
          onClick={handleClick}
          style={{
            lineHeight: "1.5rem",
          }}
        >
          {title}
        </h2>

        <div className="mt-2 flex w-full items-center justify-between">
          <p className="xl:text-md text-xs leading-10 text-gray-600 md:text-xs lg:text-sm 2xl:text-lg">
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
