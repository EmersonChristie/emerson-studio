// /lib/hooks/use-viewport-height.ts

import { useEffect } from "react";

const useViewportHeight = (): void => {
  useEffect(() => {
    // Function to set the --vh custom property
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01; // Calculate the viewport height
      document.documentElement.style.setProperty("--vh", `${vh}px`); // Set the --vh custom property
    };

    // Add event listener and call setVhVariable initially
    window.addEventListener("resize", setVhVariable);
    setVhVariable(); // Call it initially to set the viewport height

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", setVhVariable);
  }, []);
};

export default useViewportHeight;
