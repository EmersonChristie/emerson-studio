import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

interface OneArtistSlideProps {
  onSlideComplete: () => void;
  artistImageSrc: string;
}

const OneArtistSlide: React.FC<OneArtistSlideProps> = ({
  onSlideComplete,
  artistImageSrc,
}) => {
  const textAnimation = useAnimation();
  const imageAnimation = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Start text animation
      await textAnimation.start({ scale: 1.2, transition: { duration: 3 } });

      // Start image animation 1.5 seconds into the text animation
      await imageAnimation.start({ opacity: 1, transition: { duration: 1.5 } });

      // Call onSlideComplete after total duration
      setTimeout(onSlideComplete, 4500); // Total duration = 3s + 1.5s
    };

    sequence();
  }, [textAnimation, imageAnimation, onSlideComplete]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="text-center text-6xl font-bold" // Adjust styling as needed
        animate={textAnimation}
        initial={{ scale: 1 }}
      >
        One Artist
      </motion.div>
      <motion.img
        src={artistImageSrc}
        alt="Artist"
        className="absolute bottom-0 left-0"
        animate={imageAnimation}
        initial={{ opacity: 0 }}
      />
    </div>
  );
};

export default OneArtistSlide;
