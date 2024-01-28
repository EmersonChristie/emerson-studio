import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
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
import Modal from "@/components/shared/modal";
import { NewsletterSignupForm } from "../shared/newsletter-signup-form";
import Divider from "@/components/shared/divider";
import useModalWithDelay from "@/lib/hooks/use-modal-with-delay";
interface LayoutProps {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}

export default function Layout({ meta, children }: LayoutProps) {
  const [showModal, setShowModal] = useModalWithDelay();

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleCloseModal}
        >
          <div className="max-h-[60vh] w-full max-w-3xl overflow-auto rounded-sm bg-white px-4 pt-2 md:max-h-[70vh] md:p-8">
            <div className=" flex flex-col pt-1 pb-2 text-left md:pb-4">
              <h1 className="text-xl font-400 uppercase tracking-wider text-gray-700 lg:text-2xl">
                Mailing List
              </h1>
              <Divider animated={true} className="py-2 md:py-3" />
            </div>
            <NewsletterSignupForm onSuccess={handleCloseModal} />
          </div>
        </Modal>
      </div>
    </>
  );
}
