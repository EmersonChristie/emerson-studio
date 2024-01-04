import React, { useState } from "react";
import Slider from "@/components/collections-slider/slider"; // Assuming BaseSlider is in the same directory
import Slide from "@/components/collections-slider/slide"; // Import the Slide component
import { HomePageSlideResponseData, SliderItem } from "types/global";

interface CollectionsSliderProps {
  slides: SliderItem[];
}

const CollectionsSlider: React.FC<CollectionsSliderProps> = ({ slides }) => {
  //   const [currentPage, setCurrentPage] = useState(0);

  //   const paginate = (newPage: number) => {
  //     if (newPage >= 0 && newPage < collections.length) {
  //       setCurrentPage(newPage);
  //     }
  //   };

  //   const currentCollection = collections[currentPage];

  return (
    <div className="slider-container relative flex h-full w-full items-center justify-center">
      <Slider slides={slides} />
    </div>

    // Implement the logic to handle vertical scroll and slide transitions
  );
};

export default CollectionsSlider;
