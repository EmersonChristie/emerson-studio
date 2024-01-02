import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TitleProps {
  text: string;
  key: string;
}

const Title: React.FC<TitleProps> = ({ text, key }) => {
  const [fontSize, setFontSize] = useState<number>(0);

  const calculateFontSize = (): number => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    let fontSize = vw * 0.05; // 5% of viewport width

    const minFontSize = 16; // minimum font size in pixels
    const maxFontSize = 36; // maximum font size in pixels
    return Math.min(Math.max(fontSize, minFontSize), maxFontSize);
  };

  const titleVariants = {
    enter: { opacity: 0, y: -20 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const handleResize = () => {
      setFontSize(calculateFontSize());
    };

    // Set initial font size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      style={{ fontSize: `${fontSize}px` }}
      key={key}
      variants={titleVariants}
      initial="hidden"
      animate="visible"
      className="absolute bottom-20 left-20 z-10 p-4 font-display font-bold uppercase tracking-wide text-gray-800"
    >
      {text}
    </motion.div>
  );
};

export default Title;
