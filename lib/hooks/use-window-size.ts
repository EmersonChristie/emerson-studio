import { useEffect, useState } from "react";

/**
 * Custom hook that returns the current window size and provides utility functions to check if the window size is mobile or desktop.
 * @returns An object containing the window size, isMobile flag, and isDesktop flag.
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width?: number | undefined;
    height?: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    windowSize,
    isMobile: typeof windowSize?.width === "number" && windowSize?.width < 768,
    isDesktop:
      typeof windowSize?.width === "number" && windowSize?.width >= 768,
  };
}
