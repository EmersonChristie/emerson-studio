// useObserveHeroSection.js
import { RefObject, useEffect } from "react";
import { useChat } from "@/lib/context/chat-context";

const useObserveHeroSection = (heroSectionRef: RefObject<HTMLElement>) => {
  const { setChatVisible } = useChat();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setChatVisible(!entry.isIntersecting);
      },
      {
        root: null, // observing for viewport
        threshold: 0.1, // percentage of target's visibility
      },
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      if (heroSectionRef.current) {
        observer.unobserve(heroSectionRef.current);
      }
    };
  }, [heroSectionRef, setChatVisible]);

  return null;
};

export default useObserveHeroSection;
