import { motion, Variants } from "framer-motion";
import React, { useEffect } from "react";

interface SlideProps {
  content: JSX.Element;
  duration: number;
  onSlideComplete: () => void;
  variants: Variants; // Import Variants from framer-motion
}

const Slide: React.FC<SlideProps> = ({
  content,
  duration,
  onSlideComplete,
  variants,
}) => {
  useEffect(() => {
    const timer = setTimeout(onSlideComplete, duration * 1000);
    return () => clearTimeout(timer);
  }, [duration, onSlideComplete]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {content}
    </motion.div>
  );
};

export default Slide;
