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
    <div className="flex w-full flex-grow flex-col pt-6 md:pt-8 lg:pt-16">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-28">
        {children}
      </div>
    </div>
  );
};
export default ResponsiveGrid;
