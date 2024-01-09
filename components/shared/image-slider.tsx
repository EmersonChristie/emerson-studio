// components/ImageSlider.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: ImageProps[];
  interval?: number; // in milliseconds
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 3000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }} // Soft transition duration
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageSlider;
