import React from "react";

interface ResponsiveGridProps {
  children: React.ReactNode; // The child elements to be displayed within the grid
}

/**
 * ResponsiveGrid Component
 *
 * This component creates a responsive grid layout using Tailwind CSS.
 * It supports a maximum of three columns on larger screens and adjusts
 * for responsiveness on smaller screens.
 *
 * Props:
 * - children: The elements to be displayed within the grid.
 */
const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ children }) => {
  return (
    <div className=" mb-32 flex h-full w-full max-w-1920 flex-col pt-3 md:mb-24 md:pt-4 lg:pt-6">
      <div className="grid grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
        {children}
      </div>
    </div>
  );
};
export default ResponsiveGrid;
