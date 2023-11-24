import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import { useNavModal } from "./nav-modal";
import UserDropdown from "./user-dropdown";

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

  return (
    <>
      <Meta {...meta} />
      {/* <SignInModal /> */}
      <NavModal />
      <div className=" h-screen w-full">
        <div className="fixed w-full px-5">
          <div
            className={`fixed top-0 w-full ${
              scrolled
                ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
                : "bg-white/0"
            } z-30 transition-all`}
          >
            {/* <div className=" lg:text-md flex h-14 items-center justify-between text-sm xl:text-xl"> */}
            {/* <Link href="/" className="flex items-center font-display"> */}
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>EMERSON STUDIO</p>
            {/* </Link> */}
            <div>
              <AnimatePresence>
                {!session && status !== "loading" ? (
                  <motion.button
                    className="p-1.5 text-sm text-gray-600 transition-all hover:text-black lg:text-lg xl:text-xl"
                    onClick={() => setShowNavModal(true)}
                    {...FADE_IN_ANIMATION_SETTINGS}
                  >
                    Sign In
                  </motion.button>
                ) : (
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
        <main className=" mt-20 flex-grow items-center justify-center overflow-y-auto">
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
