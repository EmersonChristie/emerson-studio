import React, { useState, useEffect, ReactElement, CSSProperties } from "react";
import ArtCollectionSlide from "./art-collection-slide"; // Ensure this import is correct
import { AnimatePresence } from "framer-motion";
import cx from "classnames";
import styles from "./WallGradient.module.css";
import useWindowSize from "@/lib/hooks/use-window-size";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

interface SlideArtwork {
  src: string;
  alt: string;
  id: number;
}

interface CollectionProps {
  artworks: SlideArtwork[];
  collectionTitle: string;
  onSlideComplete?: () => void;
}

const HeroSection: React.FC<{ collections: CollectionProps[] }> = ({
  collections,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [nextSlideIndex, setNextSlideIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isMobile } = useWindowSize();

  const arrowStyle: CSSProperties = {
    position: "absolute" as const,
    // Explicitly cast 'top' and 'bottom' to strings or 'undefined'
    top: isMobile ? undefined : "50%",
    bottom: isMobile ? "4%" : undefined,
    zIndex: 1,
    cursor: "pointer",
    userSelect: "none",
    // Ensure fontSize is a string
    fontSize: isMobile ? "1rem" : "3rem",
  };

  const getArrowPadX = () => {
    return isMobile ? "0.5rem" : "1rem";
  };

  // Function to preload images
  const preloadImages = () => {
    collections.forEach((collection) => {
      collection.artworks.forEach((artwork) => {
        const img = new Image();
        img.src = artwork.src;
      });
    });
  };

  useEffect(() => {
    preloadImages();
  }, [collections]);

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setTimeout(() => {
        goToNextSlide();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, isAutoPlaying, collections]);

  const generateSlides = (collections: CollectionProps[]) => {
    let generatedSlides: ReactElement[] = []; // Explicitly type as ReactElement[]
    collections.forEach((collection, index) => {
      // Add title slide
      generatedSlides.push(
        <ArtCollectionSlide
          key={`title-${index}`}
          collectionTitle={collection.collectionTitle}
        />,
      );

      // Add artwork slides
      collection.artworks.forEach((artwork) => {
        generatedSlides.push(
          <ArtCollectionSlide
            key={`artwork-${artwork.id}`}
            artwork={artwork}
          />,
        );
      });
    });
    return generatedSlides;
  };

  const slides: ReactElement[] = generateSlides(collections); // Typed as an array of React elements

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const heroContainerClass = cx(
    styles.wallGradient,
    styles.wallTexture,
    "h-full w-full relative ",
  );

  return (
    <div className={heroContainerClass}>
      <AnimatePresence>
        {slides.length > 0 && slides[currentSlideIndex]}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        className="next text-gray-500"
        onClick={() => goToNextSlide()}
        style={{ ...arrowStyle, right: getArrowPadX() }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
      <motion.div
        className="prev text-gray-500"
        onClick={() => goToPreviousSlide}
        style={{
          ...arrowStyle,
          left: getArrowPadX(),
        }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
      {/* <button
        className="absolute bottom-4 left-4 z-10"
        onClick={() => {
          goToPreviousSlide();
        }}
      >
        Previous
      </button>
      <button
        className="absolute bottom-4 right-4 z-10"
        onClick={() => {
          goToNextSlide();
        }}
      > 
        Next
      </button>*/}
    </div>
  );
};

export default HeroSection;
