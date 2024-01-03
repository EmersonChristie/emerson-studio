import { useCallback, useEffect, useState } from "react";

type ScrollDirection = "down" | "up" | null;

export default function useScroll(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const onScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY;
    if (Math.abs(deltaY) > threshold) {
      const direction = deltaY > 0 ? "down" : "up";
      setScrollDirection(direction);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrollDirection;
}
