import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { BOX_SHADOW } from "@/lib/constants";
import router from "next/router";
import cx from "classnames";
import styles from "./GradientText.module.css";

interface Artwork {
  src: string;
  alt: string;
  id: number;
}

interface ArtCollectionSlideProps {
  artwork?: Artwork;
  collectionTitle?: string;
}

const ArtCollectionSlide: React.FC<ArtCollectionSlideProps> = ({
  artwork,
  collectionTitle,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      if (collectionTitle) {
        await controls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7 },
        });
        await controls.start({
          opacity: 0,
          scale: 4,
          transition: { duration: 2.5, delay: 0.5, ease: "easeInOut" },
        });
      } else if (artwork) {
        await controls.start({
          opacity: 1,
          scale: 1,
          zIndex: 1,
          transition: { duration: 1, ease: "easeInOut" },
        });
        await controls.start({
          opacity: 0,
          scale: 4,
          zIndex: 0,
          transition: { duration: 2.7, delay: 1.3, ease: "easeInOut" },
        });
      }
    };

    sequence();
  }, [collectionTitle, artwork, controls]);

  const routeToArtworkPage = (id: number) => {
    console.log(`Routing to artwork with ID: ${id}`);
    router.push(`/artworks/${id}`);
  };

  const handleArtworkLoad = (id: number) => {
    console.log(`Artwork with ID ${id} loaded successfully`);
  };

  const textClass = cx(
    styles.gradientText,
    "text-4xl md:text-7xl xl:text-9xl font-display tracking-wide uppercase font-display text-center",
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {collectionTitle && (
        <motion.div
          className={textClass} // Replace with your actual className
          initial={{ opacity: 0, scale: 1 }}
          animate={controls}
        >
          {collectionTitle}
        </motion.div>
      )}
      {artwork && (
        <motion.img
          src={artwork.src}
          alt={artwork.alt}
          className="absolute cursor-pointer md:max-w-3/5"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={controls}
          onLoad={() => handleArtworkLoad(artwork.id)}
          onClick={() => routeToArtworkPage(artwork.id)}
          style={{
            objectFit: "contain",
            boxShadow: BOX_SHADOW, // Replace with actual boxShadow value
            maxHeight: "80%",
            maxWidth: "85%",
            zIndex: 0,
          }}
        />
      )}
    </div>
  );
};

export default ArtCollectionSlide;
