import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { SliderItem } from "types/global";
import { useRouter } from "next/router";

interface SliderProps {
  slides: SliderItem[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + slides.length) % slides.length,
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleSlideClick = () => {
    const artworkId = slides[currentIndex].attributes.artwork.data.id;
    console.log(`Routing to /artworks/${artworkId}`);
    router.push(`/artworks/${artworkId}`);
  };

  return (
    <LayoutGroup>
      <div className="slider-container relative flex h-full w-full items-center justify-center">
        <AnimatePresence initial={false} custom={1}>
          <motion.img
            key={slides[currentIndex].id}
            src={slides[currentIndex].attributes.coverImage.data.attributes.url}
            onClick={handleSlideClick}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 250, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute h-full w-full cursor-pointer object-cover"
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
          />
        </AnimatePresence>
        <button onClick={() => paginate(1)} className="absolute right-0 z-10">
          <ChevronRight />
        </button>
        <button onClick={() => paginate(-1)} className="absolute left-0 z-10">
          <ChevronLeft />
        </button>
      </div>
    </LayoutGroup>
  );
};

export default Slider;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
// import { ChevronRight, ChevronLeft } from "lucide-react";
// import { HomePageSlideResponseData, SliderItem } from "types/global";

// interface SliderProps {
//   slides: SliderItem[];
// }

// const Slider: React.FC<SliderProps> = ({ slides }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const paginate = (newDirection: number) => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex + newDirection + slides.length) % slides.length,
//     );
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) =>
//     Math.abs(offset) * velocity;

//   const variants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   useEffect(() => {
//     if (slides.length > 0) {
//       console.log(JSON.stringify(slides));
//     }
//   }, [slides]);

//   return (
//     <LayoutGroup>
//       <div className="slider-container relative flex h-full w-full items-center justify-center">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={currentIndex}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             className="absolute h-full w-full self-center"
//             transition={{
//               x: { type: "spring", stiffness: 250, damping: 30 },
//               opacity: { duration: 0.2 },
//             }}
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             dragElastic={1}
//             onDragEnd={(e, { offset, velocity }) => {
//               const swipe = swipePower(offset.x, velocity.x);

//               if (swipe < -swipeConfidenceThreshold) {
//                 paginate(1);
//               } else if (swipe > swipeConfidenceThreshold) {
//                 paginate(-1);
//               }
//             }}
//             // Add transition and other properties as needed
//           >
//             <img
//               src={
//                 slides[currentIndex].attributes.coverImage.data.attributes.url
//               }
//               className="h-full w-full object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>

//         <button onClick={() => paginate(1)} className="absolute right-0 z-10">
//           <ChevronRight />
//         </button>
//         <button onClick={() => paginate(-1)} className="absolute left-0 z-10">
//           <ChevronLeft />
//         </button>
//       </div>
//     </LayoutGroup>
//   );
// };

// export default Slider;
