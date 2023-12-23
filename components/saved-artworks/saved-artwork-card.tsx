import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useShadow from "@/lib/hooks/use-box-shadow";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { useRef, useState } from "react";
import { Artwork } from "types/global";
import SaveButton from "@/components/shared/save-button";
import Divider from "@/components/shared/divider";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import DynamicButton from "@/components/shared/dynamic-button";
import { useUser } from "../../lib/context/user-context";

import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants";

interface ArtCardProps {
  artwork: Artwork;
}
/**
 * The SavedArtworkCard component displays an art card with an image, title, and dimensions.
 */
const SavedArtworkCard = ({ artwork }: ArtCardProps) => {
  const router = useRouter();
  // Use context to toggle like
  const {
    toggleSaveArtwork,
    isArtworkSaved,
    selectedInquireArtworks,
    setSelectedInquireArtworks,
    toggleSelectInquireArtwork,
    isArtworkSelected,
  } = useUser();

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

  const handleInquireClick = () => {
    toggleSelectInquireArtwork(artwork);
  };

  // Route to the artwork detail page when the user clicks on the card.
  const handleClick = () => {
    // Navigate to the artwork detail page
    router.push(`/artworks/${id}`);
  };

  const handleTrashClick = (artwork: Artwork) => {
    // TODO ask for confirmation
    toggleSaveArtwork(artwork);
  };

  return (
    <motion.div
      ref={ref}
      className=" flex flex-row md:flex-col md:space-y-2 "
      variants={FADE_UP_ANIMATION_VARIANTS}
      initial="hidden"
      animate={entry?.isIntersecting ? "show" : "hidden"}
    >
      <motion.div
        className="image flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-gray-100 to-gray-300  hover:opacity-75 md:w-full"
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        style={{ aspectRatio: "1/1" }}
      >
        <Image
          className=" max-h-3/4 max-w-3/4 "
          src={mainImage.data.attributes.url}
          alt={title}
          style={{
            maxWidth: "75%",
            maxHeight: "75%",
            boxShadow: boxShadow,
            height: "auto",
            width: "auto",
          }}
          width={500}
          height={500}
        />
      </motion.div>
      <div className="details m-2 flex aspect-square h-full w-2/3 flex-col space-y-2 text-gray-700 md:mt-0 md:w-full">
        <div className="artwork-details mt-2 flex flex-col justify-between ">
          <h2
            className=" xl:text-md cursor-pointer text-xs font-600 uppercase leading-relaxed tracking-wide  2xl:text-sm"
            onClick={handleClick}
            style={{
              lineHeight: "1.8rem",
            }}
          >
            {title}
          </h2>
          <Divider className="w-10/12 md:w-4/5" animated={false} />
          <p className="font-unicaone  2xl:text-md text-xs leading-10 lg:text-sm">
            {dimensions.dimensions}
          </p>
        </div>
        <div className="buttons flex h-auto w-full items-center justify-between">
          <div className="w-3/4">
            <DynamicButton
              clickText="Select for Inquire"
              unClickText="Selected"
              onClick={handleInquireClick}
              selected={isArtworkSelected(id)}
              className="w-full"
            />
          </div>
          <div className=" flex w-1/3 items-center justify-end">
            <button
              className="flex w-full justify-end p-2"
              onClick={() => handleTrashClick(artwork)}
            >
              <Trash size={24} />
            </button>
          </div>
          {/* <SaveButton
            saved={isArtworkSaved(id)}
            onClick={() => toggleSaveArtwork(artwork)}
          /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default SavedArtworkCard;
