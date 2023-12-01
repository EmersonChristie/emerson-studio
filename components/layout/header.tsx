import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "./user-dropdown";
import { useNavModal } from "@/components/layout/nav-modal";
import useWindowSize from "@/lib/hooks/use-window-size";

import { MenuButton } from "@/components/shared/icons";
import DisplayText from "@/components/shared/display-text";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isOpen, setOpen] = useState(false);
  const { windowSize } = useWindowSize();
  const { width, height } = windowSize;

  const handleClose = () => {
    setOpen(false);
  };

  const { NavModal, setShowNavModal } = useNavModal(handleClose);

  const toggleOpen = () => {
    setShowNavModal(!isOpen);
    setOpen(!isOpen);
  };

  const getButtonDimensions = () => {
    let buttonWidth = 24;
    let buttonHeight = 24;
    let strokeWidth = 2;

    if (width && height) {
      if (width < 768) {
        buttonWidth = 28;
        buttonHeight = 14;
        strokeWidth = 1.75;
      } else if (width < 1024) {
        buttonWidth = 32;
        buttonHeight = 16;
        strokeWidth = 2;
      } else if (width < 1280) {
        buttonWidth = 40;
        buttonHeight = 20;
        strokeWidth = 2.5;
      } else if (width < 1536) {
        buttonWidth = 48;
        buttonHeight = 24;
        strokeWidth = 3;
      } else {
        buttonWidth = 56;
        buttonHeight = 28;
        strokeWidth = 4;
      }
    }

    return { buttonWidth, buttonHeight, strokeWidth };
  };

  const renderMenuButton = () => {
    const { buttonWidth, buttonHeight, strokeWidth } = getButtonDimensions();

    return (
      <MenuButton
        isOpen={isOpen}
        onClick={toggleOpen}
        strokeWidth={strokeWidth}
        color="#222222"
        transition={{ ease: "easeOut", duration: 0.2 }}
        width={buttonWidth}
        height={buttonHeight}
        style={{
          zIndex: 1000,
        }}
      />
    );
  };

  return (
    <>
      <NavModal handleClose={handleClose} />
      <div className="fixed top-0 z-30 w-full bg-white/0 backdrop-blur-xl">
        <div className="flex items-center justify-between p-6 md:mx-2 ">
          <Link href="/" className="flex items-center font-display">
            <DisplayText
              text="EMERSON"
              fontWeight="100"
              letterSpacing="widest"
              scale="90"
              className="lg:text-md text-sm font-bold tracking-widest text-gray-600 xl:text-3xl"
            />
          </Link>
          <div className="overflow-visible">
            {!session && status !== "loading" ? (
              renderMenuButton()
            ) : (
              <UserDropdown />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

// import { motion, AnimatePresence } from "framer-motion";
// import useScroll from "@/lib/hooks/use-scroll";
// import useWindowSize from "@/lib/hooks/use-window-size";
// import { useNavModal } from "@/components/layout/nav-modal";
// import { useEffect, useState } from "react";

// import { MenuButton } from "@/components/shared/icons";
// import DisplayText from "@/components/shared/display-text";
// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import UserDropdown from "./user-dropdown";

// // Define a type for the threshold value
// type Threshold = number;

// const Header: React.FC = () => {
//   const { data: session, status } = useSession();
//   // Using the custom hook to get scrolled state and scroll direction
//   const scrolled = useScroll(50 as Threshold);

//   const { windowSize } = useWindowSize();
//   const { width, height } = windowSize;

//   const [isOpen, setOpen] = useState(false);
//   // State to control the visibility of the header
//   const [isVisible, setIsVisible] = useState<boolean>(true);

//   //   console.log("scrollDirection", scrollDirection);
//   console.log("isVisible", isVisible);
//   console.log("scrolled", scrolled);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const { NavModal, setShowNavModal } = useNavModal(handleClose);

//   const toggleOpen = () => {
//     setShowNavModal(!isOpen);
//     setOpen(!isOpen);
//   };

//   const getButtonDimensions = () => {
//     let buttonWidth = 24;
//     let buttonHeight = 24;
//     let strokeWidth = 2;

//     if (width && height) {
//       if (width < 768) {
//         buttonWidth = 28;
//         buttonHeight = 14;
//         strokeWidth = 1.75;
//       } else if (width < 1024) {
//         buttonWidth = 32;
//         buttonHeight = 16;
//         strokeWidth = 2;
//       } else if (width < 1280) {
//         buttonWidth = 40;
//         buttonHeight = 20;
//         strokeWidth = 2.5;
//       } else if (width < 1536) {
//         buttonWidth = 48;
//         buttonHeight = 24;
//         strokeWidth = 3;
//       } else {
//         buttonWidth = 56;
//         buttonHeight = 28;
//         strokeWidth = 4;
//       }
//     }

//     return { buttonWidth, buttonHeight, strokeWidth };
//   };

//   const renderMenuButton = () => {
//     const { buttonWidth, buttonHeight, strokeWidth } = getButtonDimensions();

//     return (
//       <MenuButton
//         isOpen={isOpen}
//         onClick={toggleOpen}
//         strokeWidth={strokeWidth}
//         color="#222222"
//         transition={{ ease: "easeOut", duration: 0.2 }}
//         width={buttonWidth}
//         height={buttonHeight}
//         style={{
//           zIndex: 1000,
//         }}
//       />
//     );
//   };

//   useEffect(() => {
//     // Update visibility based on scroll direction
//     setIsVisible(scrollDirection === "up");
//   }, [scrollDirection]);

//   return (
//     <AnimatePresence>
//       <NavModal handleClose={handleClose} />
//       {isVisible && (
//         <motion.div
//           key={`header-${scrolled}`}
//           initial={{ y: -100 }}
//           animate={{ y: 0 }}
//           exit={{ y: -100 }}
//           transition={{ type: "spring", stiffness: 100 }}
//           className={`fixed top-0 w-full ${
//             scrolled
//               ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
//               : "bg-white/0"
//           } z-30 transition-all`}
//         >
//           <div className="flex items-center justify-between p-6 md:mx-2 ">
//             <Link href="/" className="flex items-center font-display">
//               <DisplayText
//                 text="EMERSON"
//                 fontWeight="100"
//                 letterSpacing="widest"
//                 scale="90"
//                 className="lg:text-md text-sm font-bold tracking-widest text-gray-600 xl:text-3xl"
//               />
//             </Link>
//             <div className="overflow-visible">
//               {!session && status !== "loading" ? (
//                 renderMenuButton()
//               ) : (
//                 <UserDropdown />
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Header;
