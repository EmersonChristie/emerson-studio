import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, useAnimation } from "framer-motion";
import { BOX_SHADOW } from "@/lib/constants";

interface Artwork {
  src: string;
  alt: string;
}

interface ArtCollectionSlideProps {
  artworks: Artwork[];
  collectionTitle: string;
  onSlideComplete: () => void;
}

const ArtCollectionSlide: React.FC<ArtCollectionSlideProps> = ({
  artworks,
  collectionTitle,
  onSlideComplete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const titleAnimation = useAnimation();
  const imageAnimations = artworks.map(() => useAnimation());

  useEffect(() => {
    const sequence = async () => {
      await titleAnimation.start({
        opacity: 1.0,
        transition: { duration: 0.7 },
      });
      await titleAnimation.start({
        opacity: 0,
        scale: 4.0,
        transition: { duration: 2.5, delay: 0.5, ease: "easeInOut" },
      });

      for (let i = 0; i < artworks.length; i++) {
        await imageAnimations[i].start({
          opacity: 1,
          scale: 1.1,
          transition: { duration: 2, ease: "easeInOut" },
        });
        await imageAnimations[i].start({
          opacity: 0,
          scale: 3.5,
          transition: { duration: 3, delay: 1.3, ease: "easeInOut" },
        });
      }

      onSlideComplete();
    };

    sequence();
  }, [titleAnimation, imageAnimations, onSlideComplete]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="mb-4 text-center text-4xl font-bold uppercase text-gray-400 md:text-8xl lg:text-9xl" // Adjust styling as needed
        animate={titleAnimation}
        initial={{ scale: 1.0, opacity: 0 }}
      >
        {collectionTitle}
      </motion.div>
      {artworks.map((artwork, index) => (
        <motion.img
          key={index}
          src={artwork.src}
          alt={artwork.alt}
          className="absolute max-h-3/5 max-w-9/10 opacity-0 md:max-w-3/5"
          animate={imageAnimations[index]}
          initial={{ opacity: 0, scale: 0.8 }}
          style={{
            objectFit: "contain",
            boxShadow: BOX_SHADOW,
          }}
        />
      ))}
    </div>
  );
};

export default ArtCollectionSlide;

// import React, { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { BOX_SHADOW } from "@/lib/constants";

// interface Artwork {
//   src: string;
//   alt: string;
// }

// interface ArtCollectionSlideProps {
//   artworks: Artwork[];
//   collectionTitle: string;
//   onSlideComplete: () => void;
// }

// const ArtCollectionSlide: React.FC<ArtCollectionSlideProps> = ({
//   artworks,
//   collectionTitle,
//   onSlideComplete,
// }) => {
//   const titleAnimation = useAnimation();
//   const imageAnimations = artworks.map(() => useAnimation());

//   useEffect(() => {
//     const sequence = async () => {
//       await titleAnimation.start({
//         scale: 1.0,
//         transition: { duration: 2 },
//       });

//       for (let i = 0; i < artworks.length; i++) {
//         // Start by making the image visible and slightly enlarged
//         await imageAnimations[i].start({
//           opacity: 1,
//           scale: 1.05,
//           transition: { duration: 1 },
//         });

//         // Brief pause to give the feeling of standing in front of the artwork
//         await imageAnimations[i].start({
//           scale: 1.1,
//           transition: { duration: 0.5 },
//         });

//         // Continue the growth to give the feeling of moving through the artwork
//         await imageAnimations[i].start({
//           opacity: 0,
//           scale: 2.5,
//           transition: { duration: 1.5, ease: "easeInOut" },
//         });
//       }

//       onSlideComplete();
//     };

//     sequence();
//   }, [titleAnimation, imageAnimations, onSlideComplete]);

//   return (
//     <div className="relative flex h-full w-full flex-col items-center justify-center">
//       <motion.div
//         className="mb-4 text-center text-4xl font-bold uppercase text-gray-400 md:text-8xl lg:text-9xl"
//         animate={titleAnimation}
//         initial={{ scale: 0.6 }}
//       >
//         {collectionTitle}
//       </motion.div>
//       {artworks.map((artwork, index) => (
//         <motion.img
//           key={index}
//           src={artwork.src}
//           alt={artwork.alt}
//           className="absolute max-h-3/5 max-w-9/10 opacity-0 md:max-w-3/5"
//           animate={imageAnimations[index]}
//           initial={{ opacity: 0, scale: 0.5 }}
//           style={{
//             objectFit: "contain",
//             boxShadow: BOX_SHADOW,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default ArtCollectionSlide;
