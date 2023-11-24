import { useEffect, useState, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

interface AnimatedComponentProps {
  children: ReactNode;
}

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
  const scrollY = useMotionValue(0);
  const [lastY, setLastY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setDirection(latest > lastY ? "down" : "up");
    setLastY(latest);
  });

  return (
    <motion.div style={{ y: scrollY }}>
      {direction === "down" && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
      {direction === "up" && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedComponent;
