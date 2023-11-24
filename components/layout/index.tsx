import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import { useNavModal } from "./nav-modal";
import useWindowSize from "@/lib/hooks/use-window-size";
import UserDropdown from "./user-dropdown";
import { MenuButton } from "../shared/icons/animated-menu-button";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { NavModal, setShowNavModal } = useNavModal();
  const scrolled = useScroll(50);

  const { windowSize } = useWindowSize();
  const { width, height } = windowSize;

  let buttonWidth = 24;
  let buttonHeight = 24;
  let strokeWidth = 2;

  if (width && height) {
    // buttonWidth = width / 32;
    // buttonHeight = height / 32;
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

  const [isOpen, setOpen] = useState(false);

  const toggleOpen = () => {
    setShowNavModal(!isOpen);
    setOpen(!isOpen);
  };

  return (
    <>
      <Meta {...meta} />
      {/* <SignInModal /> */}
      <NavModal />
      <div id="container" className="flex h-screen flex-col">
        <div
          className={`fixed top-0 z-30  w-full transition-all ${
            scrolled
              ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
              : "bg-white/0"
          } `}
        >
          <div className=" lg:text-md mx-5 flex h-14 items-center justify-between text-sm xl:text-2xl">
            <Link href="/" className="flex items-center font-display">
              <p>EMERSON STUDIO</p>
            </Link>
            <div>
              <AnimatePresence>
                {!session && status !== "loading" ? (
                  // <motion.button
                  //   className="p-1.5 text-sm text-gray-600 transition-all hover:text-black lg:text-lg xl:text-xl"
                  //   // onClick={() => setShowNavModal(true)}
                  //   {...FADE_IN_ANIMATION_SETTINGS}
                  // >
                  //TODO: fix isOpen to work with setShowNavModal
                  <MenuButton
                    isOpen={isOpen}
                    onClick={() => toggleOpen()}
                    strokeWidth={strokeWidth}
                    color="#222222"
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    width={buttonWidth}
                    height={buttonHeight}
                    style={{
                      marginTop: "1rem",
                      zIndex: 1000,
                      margin: "0 auto",
                    }}
                  />
                ) : (
                  // </motion.button>
                  <UserDropdown />
                )}
              </AnimatePresence>
              {/* <AnimatePresence>
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
              </AnimatePresence> */}
            </div>
          </div>
        </div>
        {/* Main */}
        <main className="flex h-full w-full max-w-1920 flex-grow items-start justify-start self-center overflow-auto">
          {children}
        </main>
        {/* Footer */}
        {/* <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
          <p className="text-gray-500">
            A free template by{" "}
            <a
              className="font-medium text-gray-800 underline transition-colors"
              href="https://twitter.com/steventey"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steven Tey
            </a>
          </p>
        </div> */}
      </div>
    </>
  );
}
