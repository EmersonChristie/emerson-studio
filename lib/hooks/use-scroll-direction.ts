import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down";

interface ScrollState {
  scrolled: boolean;
  scrollDirection: ScrollDirection;
}

export default function useScrollDirection(threshold: number): ScrollState {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    // let lastScrollY = window.pageYOffset;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      //   const scrollY = window.pageYOffset;
      const scrollY = window.scrollY;

      // Check if the scroll position has exceeded the threshold
      setScrolled(scrollY > threshold);

      // Determine the direction of scroll based on the current and last scroll position
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDirection(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
      console.log("scroll direction:", scrollDirection);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, scrollDirection };
}
