import { useEffect, RefObject } from "react";
import { useChat } from "@/lib/context/chat-context";
import useIntersectionObserver from "@/lib/hooks/use-intersection-observer";

const useObserveHeroSection = (heroSectionRef: RefObject<HTMLElement>) => {
  const { setChatVisible } = useChat();

  // Use the custom intersection observer hook
  const entry = useIntersectionObserver(heroSectionRef, {
    threshold: 0.1,
    freezeOnceVisible: false,
  });

  useEffect(() => {
    // Check if the hero section is intersecting (visible)
    if (entry?.isIntersecting !== undefined) {
      setChatVisible(!entry.isIntersecting);
    }
  }, [entry, setChatVisible]);

  return null;
};

export default useObserveHeroSection;
