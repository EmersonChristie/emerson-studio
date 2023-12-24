// import React from "react";
// import { motion } from "framer-motion";
// import Divider from "../shared/divider";
// import { Artwork } from "types/global";

// interface ArtworkCardProps {
//   artwork: Artwork;
// }

// const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
//   return (
//     <div
//       id="container"
//       className="flex h-60 flex-grow flex-row overflow-hidden rounded-lg shadow-lg md:h-96 md:flex-col"
//     >
//       <div id="card-container" className="flex h-full flex-shrink-0 md:w-full">
//         <div
//           id="image-container"
//           className="md:flex-basis-2/3 flex aspect-square h-full w-full items-center justify-center bg-gray-300"
//         >
//           <img
//             className=" object-contain p-4"
//             src={artwork.mainImage.data.attributes.url}
//             alt={artwork.title}
//             style={{ maxWidth: "75%", maxHeight: "75%" }}
//           />
//         </div>
//       </div>
//       <div
//         id="details-container"
//         className="md:flex-basis-1/3 flex w-2/3 flex-grow flex-col p-4 md:w-full"
//       >
// <div id="title-container" className="flex flex-col text-gray-600">
//   <h2 className="text-lg font-bold">{artwork.title}</h2>
//   <p className="mt-2 text-gray-600">{artwork.dimensions.dimensions}</p>
// </div>
// <div id="button-container" className="flex flex-grow-0 flex-row">
//   <button className="mt-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
//     Add to Cart
//   </button>
//   <button className="mt-4 ml-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
//     View Details
//   </button>
// </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkCard;

/////////////////////////////////////////////////////////////
// import React from "react";
// import { motion } from "framer-motion";
// import Divider from "../shared/divider";
// import { Artwork } from "types/global";

// interface ArtworkCardProps {
//   artwork: Artwork;
// }

// const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
//   return (
//     <div
//       id="container"
//       className="flex h-auto flex-grow overflow-hidden md:flex-col"
//     >
//       <div id="background-container" className="flex h-full w-1/3 md:w-full">
//         <div
//           id="image-container"
//           className="flex aspect-square flex-grow-0 items-center justify-center rounded-md bg-gradient-to-br from-white to-gray-300 md:flex-grow"
//         >
//           <img
//             className=" object-contain p-4"
//             src={artwork.mainImage.data.attributes.url}
//             alt={artwork.title}
//             style={{ maxWidth: "75%", maxHeight: "75%" }}
//           />
//         </div>
//       </div>
//       <div
//         id="details-container"
//         className="flex w-2/3 flex-grow flex-col p-4 md:w-full md:flex-grow"
//       >
//         <div id="title-container" className="flex flex-col text-gray-600">
//           <h2 className="text-lg font-bold">{artwork.title}</h2>
//           <p className="mt-2 text-gray-600">{artwork.dimensions.dimensions}</p>
//         </div>
//         <div id="button-container" className="flex flex-grow-0 flex-row">
//           <button className="mt-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
//             Add to Cart
//           </button>
//           <button className="mt-4 ml-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtworkCard;
///////////////////////////////////////////////////////////////

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { Artwork } from "types/global";
import Divider from "../shared/divider";
import { Trash } from "lucide-react";
import DynamicButton from "@/components/shared/dynamic-button";
import { useUser } from "../../lib/context/user-context";
import useWindowSize from "@/lib/hooks/use-window-size";

import { FADE_UP_ANIMATION_VARIANTS } from "@/lib/constants";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  const router = useRouter();
  const {
    toggleSaveArtwork,
    isArtworkSelected,
    toggleSelectInquireArtwork,
    selectedInquireArtworks,
  } = useUser();
  const { isMobile } = useWindowSize();
  const ref = useRef(null);

  const entry = useIntersectionObserver(ref, {
    threshold: 0,
  });

  const handleClick = () => {
    router.push(`/artworks/${artwork.id}`);
  };

  const handleInquireClick = () => {
    toggleSelectInquireArtwork(artwork);
  };

  const handleTrashClick = () => {
    toggleSaveArtwork(artwork);
  };

  const boxShadow =
    "rgba(0, 0, 0, 0.043) 0.37237016456675937px 0.44377348139733286px 0.5793051374284405px 0px, rgba(0, 0, 0, 0.06) 0.8657897618972239px 1.0318080591723024px 1.3469297616353146px 0px, rgba(0, 0, 0, 0.075) 1.5547577922105507px 1.8528881844807665px 2.418773742338844px 0px, rgba(0, 0, 0, 0.086) 2.5803221177377376px 3.075108153864249px 4.014268599539516px 0px, rgba(0, 0, 0, 0.1) 4.2509936997828595px 5.066137013811576px 6.613372186585694px 0px, rgba(0, 0, 0, 0.118) 7.429504811692371px 8.854139050530355px 11.558257657323903px 0px, rgba(0, 0, 0, 0.16) 16.06969024216348px 19.151111077974452px 25px 0px";

  return (
    <motion.div
      ref={ref}
      className="flex h-auto flex-grow overflow-hidden md:flex-col"
      variants={FADE_UP_ANIMATION_VARIANTS}
      initial="hidden"
      animate={entry?.isIntersecting ? "show" : "hidden"}
    >
      <div id="background-container" className="flex w-1/3 flex-grow md:w-full">
        <motion.div
          className="flex aspect-square flex-grow items-center justify-center rounded-md bg-gradient-to-br from-gray-100 to-gray-300 hover:opacity-75 md:flex-grow"
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
        >
          <img
            className="m-0 block border-none p-0 align-top"
            src={artwork.mainImage.data.attributes.url}
            alt={artwork.title}
            style={{ maxWidth: "75%", maxHeight: "75%", boxShadow: boxShadow }}
          />
        </motion.div>
      </div>
      <div
        id="details-container"
        className="flex h-full w-2/3 flex-grow flex-col justify-between p-4 md:w-full md:flex-grow"
      >
        <div
          id="artwork-title-dimensions"
          className="flex flex-col text-gray-600"
        >
          <h2 className=" xl:text-md cursor-pointer text-xs font-600 uppercase leading-relaxed tracking-wide  2xl:text-sm">
            {artwork.title}
          </h2>
          <Divider animated={true} className="w-10/12 py-1 md:w-4/5 md:py-2" />
          <p className="2xl:text-md  mt-2 text-xs font-500 leading-10 lg:text-sm">
            {artwork.dimensions.dimensions}
          </p>
          <p className="2xl:text-md text-xs lg:text-sm">{artwork.medium}</p>
        </div>
        <div
          id="buttons-container"
          className="align-center flex flex-grow-0 flex-row justify-between md:mt-5"
        >
          <div className="align-center flex w-3/4">
            <DynamicButton
              clickText="Inquire"
              unClickText="Selected"
              onClick={handleInquireClick}
              selected={isArtworkSelected(artwork.id)}
              className="w-full md:py-2.5"
            />
          </div>
          <div className="w-1/4 text-gray-600">
            <button
              className="flex w-full items-center justify-end md:pt-2 "
              onClick={handleTrashClick}
            >
              <Trash size={isMobile ? 20 : 24} />
            </button>
          </div>
          {/* <button
            className="flex w-full justify-end p-2"
            onClick={handleTrashClick}
          >
            <Trash size={24} />
          </button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
