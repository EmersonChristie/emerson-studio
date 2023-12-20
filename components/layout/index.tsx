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
import Header from "./header";
import useViewportHeight from "@/lib/hooks/use-viewport-height";

interface LayoutProps {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

export default function Layout({ meta, children }: LayoutProps) {
  // Dynamic view height hook
  useViewportHeight();
  return (
    <>
      <Meta {...meta} />
      <div
        id="container"
        className="flex h-screen flex-col bg-gradient-to-b from-white to-gray-300"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <Header />
        <main className="flex h-full w-full max-w-1920 flex-grow items-start justify-start self-center overflow-auto pt-28 lg:mx-10">
          {children}
        </main>
      </div>
    </>
  );
}
