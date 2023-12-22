// import React from "react";

// type DividerProps = {
//   className?: string;
// };

// const Divider: React.FC<DividerProps> = ({ className }) => {
//   // Default styles for the divider
//   const defaultStyles = "border-b border-gray-400";

//   // Combine default styles with any additional styles passed via className
//   const combinedStyles = `${defaultStyles} ${className || ""}`;

//   return <div className={combinedStyles}></div>;
// };

// export default Divider;
import React from "react";
import { motion } from "framer-motion";
import cx from "classnames";

type DividerProps = {
  className?: string;
  animated?: boolean;
};

const Divider: React.FC<DividerProps> = ({ className, animated = false }) => {
  // Animation variants for Framer Motion
  const animationVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" },
  };

  // Use classnames to combine classes
  const dividerClass = cx(
    "border-b border-gray-400", // default styles
    className, // additional className props
  );

  return animated ? (
    <motion.div
      className={dividerClass}
      initial="hidden"
      animate="visible"
      variants={animationVariants}
      transition={{ duration: 1 }} // Adjust the duration as needed
    />
  ) : (
    <div className={dividerClass} />
  );
};

export default Divider;
