import { useEffect, RefObject } from "react";
import { useChat } from "@/lib/context/chat-context";

const useObserveHeroSection = (heroSectionRef: RefObject<HTMLElement>) => {
  const { setChatVisible } = useChat();

  useEffect(() => {
    // Delay initialization
    const timer = setTimeout(() => {
      if (heroSectionRef.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setChatVisible(!entry.isIntersecting);
          },
          { root: null, threshold: 0.1 },
        );

        observer.observe(heroSectionRef.current);

        return () => {
          observer.disconnect();
        };
      }
    }, 500); // Delay in milliseconds

    return () => clearTimeout(timer);
  }, [heroSectionRef, setChatVisible]);

  return null;
};

export default useObserveHeroSection;
