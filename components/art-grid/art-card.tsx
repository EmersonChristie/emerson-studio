import Image from "next/image";

import cx from "classnames";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import useWindowSize from "@/lib/hooks/use-window-size";
import useShadow from "@/lib/hooks/use-box-shadow";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";
import { useEffect, useRef, useState } from "react";

interface ArtCardProps {
  id: string;
  title: string;
  dimensions: string;
  image: string;
}

const ArtCard = ({ id, title, dimensions, image }: ArtCardProps) => {
  const { isMobile, isDesktop } = useWindowSize();

  const boxShadow = useShadow(7, {
    angle: 40,
    length: 25,
    finalBlur: 25,
    spread: 0,
    finalTransparency: 0.2,
  });

  // Create a ref for the element we want to observe.
  const ref = useRef(null);

  // Use the Intersection Observer hook to check when the element comes into view and which direction
  // it is scrolling in.
  const entry = useIntersectionObserver(ref, {
    threshold: 0,
  });

  // Define motion variants for animation.
  const variants = {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "cubic-bezier",
        duration: 4, // transform duration
        ease: [0.18, 1, 0.21, 1],
        opacity: {
          duration: 2.5, // opacity duration
          ease: [0.18, 1, 0.21, 1],
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="md:mb-30 mb-20 flex flex-col items-start justify-center lg:mb-40"
      variants={variants}
      initial="hidden"
      animate={entry?.isIntersecting ? "show" : "hidden"}
    >
      <div className="">
        <Image
          className="mx-auto self-center"
          src={image}
          alt={title}
          style={{ maxWidth: "100%", maxHeight: "25%", boxShadow: boxShadow }}
          width={1000}
          height={1000}
        />
      </div>
      <div className="mt-6 font-sans font-light">
        <h2 className="lg:text-md text-xs leading-loose text-gray-800 md:text-sm ">
          {title}
        </h2>
        <p className="lg:text-md text-xs leading-loose text-gray-600 md:text-sm">
          {dimensions.split(";")[0]}
        </p>
      </div>
    </motion.div>
  );
};

export default ArtCard;
