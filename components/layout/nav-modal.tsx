import Modal from "@/components/shared/modal";
import NavItem from "@/components/layout/nav-item";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, ExpandingArrow } from "@/components/shared/icons";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Artworks",
    href: "/artworks",
  },
  {
    id: 3,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    title: "About",
    href: "/about",
  },
];

const NavModal = ({
  showNavModal,
  setShowNavModal,
  handleClose,
}: {
  showNavModal: boolean;
  setShowNavModal: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <Modal
      showModal={showNavModal}
      setShowModal={setShowNavModal}
      handleClose={handleClose}
    >
      <div key="nav-modal-container" className=" overflow-hidden">
        <div
          key="navigation-modal"
          className="flex flex-col items-center justify-center space-y-10 px-4 py-5 text-left md:px-16"
        >
          <motion.ul
            key="navigation-list"
            variants={variants}
            initial="closed"
            animate="open"
          >
            {items.map(({ id, title, href }) => (
              <NavItem id={id} title={title} href={href} key={id} />
            ))}
          </motion.ul>
        </div>
      </div>
    </Modal>
  );
};

export function useNavModal(handleClose: () => void) {
  const [showNavModal, setShowNavModal] = useState(false);

  const NavModalCallback = useCallback(() => {
    return (
      <NavModal
        showNavModal={showNavModal}
        setShowNavModal={setShowNavModal}
        handleClose={handleClose}
      />
    );
  }, [showNavModal, setShowNavModal, handleClose]);

  return useMemo(
    () => ({ setShowNavModal, NavModal: NavModalCallback }),
    [setShowNavModal, NavModalCallback],
  );
}
