// import { useCallback, useEffect, useState } from "react";

// // Define a type for the direction of scroll
// type ScrollDirection = "up" | "down";

// interface ScrollState {
//   scrolled: boolean;
//   scrollDirection: ScrollDirection;
// }

// /**
//  * Custom hook to track scroll position and direction.
//  *
//  * @param {number} threshold - The scroll position at which `scrolled` is set to true.
//  * @return {ScrollState} - An object containing the current scroll state.
//  */
// export default function useScrollDirection(threshold: number): ScrollState {
//   // Define state variables
//   const [scrolled, setScrolled] = useState<boolean>(false);
//   const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
//   const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);

//   // Define the scroll event handler
//   const onScroll = useCallback(() => {
//     // Get the current scroll position
//     const currentScrollPosition = window.scrollY;

//     // Check if the scroll position has exceeded the threshold
//     setScrolled(currentScrollPosition > threshold);

//     // Determine the direction of scroll based on the current and last scroll position
//     if (currentScrollPosition > lastScrollPosition) {
//       setScrollDirection("down");
//       console.log("down");
//     } else if (currentScrollPosition < lastScrollPosition) {
//       setScrollDirection("up");
//       console.log("up");
//     }

//     // Update the last scroll position
//     setLastScrollPosition(currentScrollPosition);
//   }, [threshold]); // Removed `lastScrollPosition` from dependencies

//   // Add and remove the scroll event listener
//   useEffect(() => {
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [onScroll]);

//   // Return the scroll state
//   return { scrolled, scrollDirection };
// }
////////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";

// type ScrollDirection = "up" | "down";

// interface ScrollState {
//   scrolled: boolean;
//   scrollDirection: ScrollDirection;
// }

// export default function useScrollDirection(threshold: number): ScrollState {
//   const [scrolled, setScrolled] = useState<boolean>(false);
//   const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
//   const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);

//   useEffect(() => {
//     const onScroll = () => {
//       const currentScrollPosition = window.scrollY;
//       setScrolled(currentScrollPosition > threshold);

//       if (currentScrollPosition > lastScrollPosition) {
//         setScrollDirection("down");
//       } else if (currentScrollPosition < lastScrollPosition) {
//         setScrollDirection("up");
//       }
//     };

//     window.addEventListener("scroll", onScroll);

//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       setLastScrollPosition(window.scrollY);
//     };
//   }, [threshold, lastScrollPosition]);

//   return { scrolled, scrollDirection };
// }

////////////////////////////////////////////////////////////////////

// import { useCallback, useEffect, useState } from "react";

// type ScrollDirection = "up" | "down";

// interface ScrollState {
//   scrolled: boolean;
//   scrollDirection: ScrollDirection;
// }

// export default function useScrollDirection(threshold: number): ScrollState {
//   const [scrolled, setScrolled] = useState<boolean>(false);
//   const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

//   useEffect(() => {
//     let lastScrollPosition = 0;

//     const handleScroll = () => {
//       const currentScrollPosition = window.pageYOffset;

//       setScrolled(currentScrollPosition > threshold);

//       if (currentScrollPosition > lastScrollPosition) {
//         setScrollDirection("down");
//       } else if (currentScrollPosition < lastScrollPosition) {
//         setScrollDirection("up");
//       }

//       lastScrollPosition = currentScrollPosition;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [threshold]);

//   return { scrolled, scrollDirection };
// }

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
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { scrolled, scrollDirection };
}
