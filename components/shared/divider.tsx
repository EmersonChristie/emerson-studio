import React from "react";

type DividerProps = {
  className?: string;
};

const Divider: React.FC<DividerProps> = ({ className }) => {
  // Default styles for the divider
  const defaultStyles = "border-b border-gray-400 my-1 md:my-2";

  // Combine default styles with any additional styles passed via className
  const combinedStyles = `${defaultStyles} ${className || ""}`;

  return <div className={combinedStyles}></div>;
};

export default Divider;
