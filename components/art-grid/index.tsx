import { useState } from "react";
import { useDemoModal } from "@/components/home/demo-modal";
import Popover from "@/components/shared/popover";
import Tooltip from "@/components/shared/tooltip";
import { ChevronDown } from "lucide-react";
import cx from "classnames";
import Image from "next/image";
import useWindowSize from "@/lib/hooks/use-window-size";
import useShadow from "@/lib/hooks/use-box-shadow";
import useScroll from "@/lib/hooks/use-scroll";

import ArtCard from "@/components/art-grid/art-card";
import Column from "./column";

import { LayoutGroup, motion } from "framer-motion";

import art from "../../public/data/emersonartworks.json";

export default function ArtGrid() {
  const artworks = art.map((jsonArtwork) => ({
    id: jsonArtwork.id.toString(),
    title: jsonArtwork.title,
    artist: jsonArtwork.artist,
    year: jsonArtwork.year,
    dimensions: jsonArtwork.dimensions,
    mediumImage: jsonArtwork.mediumImage,
    medium: jsonArtwork.medium,
    genre: jsonArtwork.genre,
    price: jsonArtwork.price,
  }));

  const { isMobile, isDesktop } = useWindowSize();

  const chunkSize = Math.ceil(artworks.length / 3);
  const columns = Array.from({ length: 3 }, (_, i) =>
    artworks.slice(i * chunkSize, i * chunkSize + chunkSize),
  );

  return (
    <LayoutGroup>
      <motion.div className="flex w-full flex-grow flex-col p-14 md:flex-row md:space-x-16 lg:space-x-36 lg:p-28">
        {columns.map((artworks, i) => (
          <Column key={i} index={i} artworks={artworks} isMobile={isMobile} />
        ))}
      </motion.div>
    </LayoutGroup>
  );
}
