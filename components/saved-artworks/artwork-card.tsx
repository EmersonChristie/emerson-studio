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
import React from "react";
import { motion } from "framer-motion";
import Divider from "../shared/divider";
import { Artwork } from "types/global";

interface ArtworkCardProps {
  artwork: Artwork;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <div
      id="container"
      className="flex h-auto flex-grow overflow-hidden md:flex-col"
    >
      <div id="background-container" className="flex h-full w-1/3 md:w-full">
        <div
          id="image-container"
          className="flex aspect-square flex-grow-0 items-center justify-center rounded-md bg-gradient-to-br from-white to-gray-300 md:flex-grow"
        >
          <img
            className=" object-contain p-4"
            src={artwork.mainImage.data.attributes.url}
            alt={artwork.title}
            style={{ maxWidth: "75%", maxHeight: "75%" }}
          />
        </div>
      </div>
      <div
        id="details-container"
        className="flex w-2/3 flex-grow flex-col p-4 md:w-full md:flex-grow"
      >
        <div id="title-container" className="flex flex-col text-gray-600">
          <h2 className="text-lg font-bold">{artwork.title}</h2>
          <p className="mt-2 text-gray-600">{artwork.dimensions.dimensions}</p>
        </div>
        <div id="button-container" className="flex flex-grow-0 flex-row">
          <button className="mt-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
            Add to Cart
          </button>
          <button className="mt-4 ml-4 flex-grow rounded bg-gray-800 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-gray-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
