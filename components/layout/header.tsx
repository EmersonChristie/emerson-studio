import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";

import { useSession } from "next-auth/react";
import UserDropdown from "./user-dropdown";
import { useNavModal } from "@/components/layout/nav-modal";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useSignInModal } from "./sign-in-modal";

import { MenuButton } from "@/components/shared/icons";
import DisplayText from "@/components/shared/display-text";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
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
      <SignInModal />
      <div className="fixed top-0 z-20 w-full bg-gradient-to-b from-white to-transparent backdrop-blur-xl ">
        <div className="flex items-center justify-between p-6 md:mx-2 ">
          <Link href="/" className="flex items-center font-display">
            <DisplayText
              text="EMERSON"
              fontWeight="100"
              letterSpacing="widest"
              scale="90"
              className="md:text-md text-sm font-bold tracking-widest text-gray-400 lg:text-lg xl:text-xl 2xl:text-2xl "
            />
          </Link>
          {/* <div className="overflow-visible">
            {!session && status !== "loading" ? (
              renderMenuButton()
            ) : (
              <UserDropdown />
            )}
          </div> */}
          <AnimatePresence>
            {!session && status !== "loading" ? (
              <motion.button
                className="p-1.5 px-4 text-sm text-gray-600 transition-all hover:text-black lg:text-lg"
                onClick={() => setShowSignInModal(true)}
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                Sign In
              </motion.button>
            ) : (
              <UserDropdown />
            )}
          </AnimatePresence>
          <div className="overflow-visible">
            {/* {!session && status !== "loading" ? ( */}
            {renderMenuButton()}
            {/* ) : (
              <UserDropdown />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
