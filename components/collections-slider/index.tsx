import React, { useState } from "react";
import { BaseSlider } from "./base-slider"; // Assuming BaseSlider is in the same directory
import Slide from "./slide"; // Import the Slide component

const collections = [
  ["bg-red-800", "bg-red-600", "bg-red-400", "bg-red-200"],
  ["bg-blue-800", "bg-blue-600", "bg-blue-400", "bg-blue-200"],
  ["bg-green-800", "bg-green-600", "bg-green-400", "bg-green-200"],
];

const CollectionsSlider: React.FC = () => {
  //   const [currentPage, setCurrentPage] = useState(0);

  //   const paginate = (newPage: number) => {
  //     if (newPage >= 0 && newPage < collections.length) {
  //       setCurrentPage(newPage);
  //     }
  //   };

  //   const currentCollection = collections[currentPage];

  return <BaseSlider collections={collections} />;

  // Implement the logic to handle vertical scroll and slide transitions
};

export default CollectionsSlider;
