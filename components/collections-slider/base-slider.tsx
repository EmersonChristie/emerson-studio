import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import debounce from "lodash.debounce";
import { Artwork } from "types/global";
import { ChevronRight, ChevronLeft } from "lucide-react";
import useWindowSize from "@/lib/hooks/use-window-size";
import { CSSProperties } from "react";
import { BOX_SHADOW } from "@/lib/constants";
import Title from "./title";
import Slide from "./slide";

// TypeScript props definition
interface SliderProps {
  collections: string[][]; // Array of arrays for background colors
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const BaseSlider: React.FC<SliderProps> = ({ collections }) => {
  const { isMobile } = useWindowSize();
  const [pageIndex, setPageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const yPositions = collections.map(() => useMotionValue(0));
  const lastScrollY = useRef(0);
  const scrollThreshold = 0; // 0 works best so far
  // const scrollDirection = useScrollDirection(2);

  // Debounce slide transition function
  const debouncedTransition = useCallback(
    debounce((newIndex: number) => setSlideIndex(newIndex), 100), // 100 works best so far
    [],
  );

  useEffect(() => {
    console.log("Is Horizontal:", isHorizontal); // Debugging line
    const handleScroll = () => {
      const deltaY = window.scrollY - lastScrollY.current;
      if (Math.abs(deltaY) > scrollThreshold) {
        const newIndex =
          deltaY > 0
            ? Math.min(slideIndex + 1, collections[pageIndex].length - 1)
            : Math.max(slideIndex - 1, 0);
        console.log("Current slideIndex:", slideIndex); // Debugging line
        console.log("Direction:", deltaY > 0 ? "down" : "up"); // Debugging line
        console.log("New slide index:", newIndex); // Debugging line
        // Set isHorizontal to false for vertical scrolling
        setIsHorizontal(false);
        debouncedTransition(newIndex);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [debouncedTransition, slideIndex, collections, pageIndex]);

  const paginate = (newDirection: number) => {
    // Horizontal transition logic
    setIsHorizontal(true);
    let newPageIndex = pageIndex + newDirection;
    newPageIndex = Math.max(0, Math.min(newPageIndex, collections.length - 1));
    console.log("New page index:", newPageIndex); // Debugging line
    setPageIndex(newPageIndex);
    setSlideIndex(0);
  };

  const horizontalVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const verticalVariants = {
    enter: { y: "100%", opacity: 0 },
    center: { y: 0, opacity: 1, zIndex: 1 },
    exit: { y: "-100%", opacity: 0, zIndex: 0 },
  };

  const variants = isHorizontal ? horizontalVariants : verticalVariants;

  const arrowStyle: CSSProperties = {
    position: "absolute" as const,
    top: isMobile ? undefined : "50%",
    bottom: isMobile ? "1.66%" : undefined,
    zIndex: 1,
    cursor: "pointer",
    userSelect: "none",
    fontSize: isMobile ? "1rem" : "3rem",
  };

  const getArrowPadX = () => {
    return isMobile ? "0.5rem" : "1rem";
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      // onWheel={handleScroll}
    >
      <AnimatePresence>
        {collections[pageIndex].map((backgroundColor, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            variants={isHorizontal ? horizontalVariants : verticalVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            {/* Render the slide if it's the current one in the view */}
            {/* {index === slideIndex && (
              <Slide className={backgroundColor}>
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold text-white">
                    Page Index: {pageIndex}
                  </h1>
                  <h1 className="text-3xl font-bold text-white">
                    {backgroundColor}
                  </h1>
                  <h1 className="text-3xl font-bold text-white">
                    Slide Index: {slideIndex}
                  </h1>
                </div>
              </Slide>
            )} */}
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div
        className="next z-20 text-gray-500"
        onClick={() => paginate(1)}
        style={{ ...arrowStyle, right: getArrowPadX(), zIndex: 20 }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
      <motion.div
        className="prev z-20 text-gray-500"
        onClick={() => paginate(-1)}
        style={{ ...arrowStyle, left: getArrowPadX(), zIndex: 20 }}
        whileHover={{
          scale: 1.3,
          transition: { duration: 0.5 },
          color: "black",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft
          size={isMobile ? 36 : 48}
          strokeWidth={isMobile ? 1.5 : 1.6}
        />
      </motion.div>
    </div>
  );
};

export default BaseSlider;

////////////////////////// NEW //////////////////////////
// import * as React from "react";
// import { useState, useCallback, useEffect, useRef } from "react";
// import { motion, AnimatePresence, PanInfo } from "framer-motion";
// import debounce from "lodash.debounce";
// import useWindowSize from "@/lib/hooks/use-window-size";
// import Slide from "./slide";

// // TypeScript props definition
// interface SliderProps {
//   collections: string[][]; // Array of arrays for secondary images
// }

// const BaseSlider: React.FC<SliderProps> = ({ collections }) => {
//   const { isMobile } = useWindowSize();
//   const [pageIndex, setPageIndex] = useState(0);
//   const [slideIndex, setSlideIndex] = useState(0);
//   const [dragDirection, setDragDirection] = useState<"x" | "y">("y");
//   const [isHorizontal, setIsHorizontal] = useState(true);
//   const [direction, setDirection] = useState(0);

//   // Function to handle page transition
//   const paginatePage = (newPageIndex: number) => {
//     newPageIndex = Math.max(0, Math.min(newPageIndex, collections.length - 1));
//     setPageIndex(newPageIndex);
//     setSlideIndex(0); // Reset slide index on page change
//   };

//   // Function to handle slide transition within a page
//   const paginateSlide = (newSlideIndex: number) => {
//     newSlideIndex = Math.max(
//       0,
//       Math.min(newSlideIndex, collections[pageIndex].length - 1),
//     );
//     setSlideIndex(newSlideIndex);
//   };

//   // Function to calculate the swipe power
//   const swipePower = (offset: number, velocity: number) =>
//     Math.abs(offset) * velocity;

//   // Debounce the swipe handling to prevent double processing
//   const debouncedHandleSwipe = useCallback(
//     debounce((isHorizontalSwipe: boolean, direction: number) => {
//       if (isHorizontalSwipe) {
//         let newSlideIndex = slideIndex + direction;
//         newSlideIndex = Math.max(
//           0,
//           Math.min(newSlideIndex, collections[pageIndex].length - 1),
//         );
//         if (newSlideIndex !== slideIndex) {
//           paginateSlide(newSlideIndex);
//         }
//       } else {
//         let newPageIndex = pageIndex + direction;
//         newPageIndex = Math.max(
//           0,
//           Math.min(newPageIndex, collections.length - 1),
//         );
//         if (newPageIndex !== pageIndex) {
//           paginatePage(newPageIndex);
//         }
//       }
//     }, 300),
//     [slideIndex, pageIndex, collections],
//   );

//   const onDragEnd = (event: any, info: PanInfo) => {
//     console.log("Drag ended");

//     const horizontalOffset = info.offset.x;
//     const verticalOffset = info.offset.y;

//     const horizontalPower = Math.abs(horizontalOffset);
//     const verticalPower = Math.abs(verticalOffset);
//     const swipeThreshold = 100;

//     console.log(
//       `Horizontal Power: ${horizontalPower}, Vertical Power: ${verticalPower}`,
//     );

//     if (horizontalPower > verticalPower) {
//       setIsHorizontal(true);
//       setDirection(horizontalOffset < 0 ? 1 : -1); // Right swipe: 1, Left swipe: -1

//       if (horizontalPower > swipeThreshold) {
//         const direction = horizontalOffset < 0 ? 1 : -1;
//         console.log(
//           `Horizontal Swipe Detected: New Slide Index = ${
//             slideIndex + direction
//           }`,
//         );
//         debouncedHandleSwipe(true, direction);
//       }
//     } else {
//       setIsHorizontal(false);
//       setDirection(verticalOffset < 0 ? 1 : -1); // Down swipe: 1, Up swipe: -1

//       if (verticalPower > swipeThreshold) {
//         const direction = verticalOffset < 0 ? 1 : -1;
//         console.log(
//           `Vertical Swipe Detected: New Page Index = ${pageIndex + direction}`,
//         );
//         debouncedHandleSwipe(false, direction);
//       }
//     }
//   };

//   // ...

//   // Variants for framer-motion
//   const pageVariants = {
//     enter: { y: "100%", opacity: 0 },
//     center: { y: 0, opacity: 1 },
//     exit: { y: "-100%", opacity: 0 },
//   };

//   const slideVariants = {
//     enter: { x: "100%", opacity: 0 },
//     center: { x: 0, opacity: 1 },
//     exit: { x: "-100%", opacity: 0 },
//   };

//   const verticalVariants = {
//     enter: (direction: number) => ({
//       y: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: { y: 0, opacity: 1, zIndex: 1 },
//     exit: (direction: number) => ({
//       y: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       zIndex: 0,
//     }),
//   };

//   const horizontalVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: { x: 0, opacity: 1, zIndex: 1 },
//     exit: (direction: number) => ({
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       zIndex: 0,
//     }),
//   };

//   return (
//     <div className="relative h-full w-full">
//       <AnimatePresence>
//         {collections.map((slides, index) => (
//           <motion.div
//             key={index}
//             className={`absolute top-0 left-0 h-full w-full`}
//             variants={isHorizontal ? horizontalVariants : verticalVariants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             custom={direction}
//             transition={{ type: "spring", stiffness: 250, damping: 30 }}
//             drag="y"
//             dragConstraints={{ top: 0, bottom: 0 }}
//             dragElastic={1}
//             onDragEnd={onDragEnd}
//           >
//             <AnimatePresence>
//               {slides.map((slide, idx) => (
//                 <motion.div
//                   key={idx}
//                   className={`absolute inset-0 `} // Ensure active slide is on top
//                   variants={
//                     isHorizontal ? horizontalVariants : verticalVariants
//                   }
//                   custom={direction}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{ type: "spring", stiffness: 250, damping: 30 }}
//                   drag="x"
//                   dragConstraints={{ left: 0, right: 0 }}
//                   dragElastic={1}
//                   onDragEnd={onDragEnd}
//                 >
//                   <Slide className={slide}>
//                     <div className="flex h-full w-full flex-col items-center justify-center">
//                       <h1 className="text-3xl font-bold text-white">
//                         Page Index: {index}
//                       </h1>
//                       <h1 className="text-3xl font-bold text-white">{slide}</h1>
//                       <h1 className="text-3xl font-bold text-white">
//                         Slide Index: {idx}
//                       </h1>
//                     </div>
//                   </Slide>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default BaseSlider;
