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
import useTawkTo from "@/lib/hooks/use-tawk-to";

interface LayoutProps {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

export default function Layout({ meta, children }: LayoutProps) {
  // Chat Widget

  useTawkTo();

  // Dynamic view height hook
  useViewportHeight();
  return (
    <>
      <Meta {...meta} />
      <div
        id="container"
        className="flex flex-col bg-gradient-to-b from-white to-gray-200"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <Header />
        <main
          className="xl:pt-18 mx-1 flex h-full w-full flex-col items-center justify-start self-center overflow-auto lg:mx-10"
          // style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
