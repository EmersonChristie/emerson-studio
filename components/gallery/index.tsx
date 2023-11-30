import useWindowSize from "@/lib/hooks/use-window-size";
import Column from "./column";
import { LayoutGroup, motion } from "framer-motion";

import GalleryContainer from "./gallery-container";

import art from "../../public/data/emersonartworks.json";

/**
 * Component representing the grid of artworks.
 */
const ArtGrid: React.FC = () => {
  return (
    <>
      <GalleryContainer />
    </>
  );
};

export default ArtGrid;
