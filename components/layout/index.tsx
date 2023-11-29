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
import { MenuButton } from "@/components/shared/icons";
import DisplayText from "@/components/shared/display-text";

interface LayoutProps {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

export default function Layout({ meta, children }: LayoutProps) {
  const { data: session, status } = useSession();
  const scrolled = useScroll(50);
  const { windowSize } = useWindowSize();
  const { width, height } = windowSize;

  const [isOpen, setOpen] = useState(false);

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
      <Meta {...meta} />
      <NavModal handleClose={handleClose} />
      <div id="container" className="flex h-screen flex-col">
        <div
          className={`fixed top-0 z-30  w-full transition-all ${
            scrolled
              ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
              : "bg-white/0"
          } `}
        >
          <div className="lg:text-md flex items-center justify-between p-6 text-sm md:mx-2 xl:text-2xl">
            <Link href="/" className="flex items-center font-display">
              {/* <p>EMERSON STUDIO</p> */}
              <DisplayText
                text="EMERSON"
                fontWeight="100"
                letterSpacing="widest"
                scale="90"
                className="font-bold tracking-widest text-gray-600"
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
        <main className="flex h-full w-full max-w-1920 flex-grow items-start justify-start self-center overflow-auto pt-3">
          {children}
        </main>
      </div>
    </>
  );
}
