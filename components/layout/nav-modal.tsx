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
import useWindowSize from "@/lib/hooks/use-window-size";

const items = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Works",
    href: "/artworks",
  },
  {
    id: 3,
    title: "About",
    href: "/about",
  },
  {
    id: 4,
    title: "Contact",
    href: "/contact",
  },

  {
    id: 4,
    title: "Saved Works",
    href: "/saved-artworks",
  },
];

const NavModal = ({
  showNavModal,
  setShowNavModal,
  handleClose,
  backdropClass,
}: {
  showNavModal: boolean;
  setShowNavModal: Dispatch<SetStateAction<boolean>>;
  handleClose: () => void;
  backdropClass?: string;
}) => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const { isDesktop } = useWindowSize();

  const handleItemClick = () => {
    setShowNavModal(false);
    handleClose();
  };

  return (
    <Modal
      showModal={showNavModal}
      setShowModal={setShowNavModal}
      handleClose={handleClose}
      backdropClass={backdropClass}
    >
      <div key="nav-modal-container" className=" overflow-hidden">
        {isDesktop && (
          <span
            onClick={handleItemClick}
            className="absolute top-6 right-6 cursor-pointer text-4xl font-100 text-gray-100"
          >
            X
          </span>
        )}

        <div
          key="navigation-modal"
          className="flex flex-col items-center justify-center space-y-10 px-4 py-5 text-left md:px-20"
        >
          <motion.ul
            key="navigation-list"
            variants={variants}
            initial="closed"
            animate="open"
          >
            {items.map(({ id, title, href }) => (
              <NavItem
                handleItemClick={handleItemClick}
                id={id}
                title={title}
                href={href}
                key={id}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </Modal>
  );
};

export function useNavModal(handleClose: () => void, backdropClass?: string) {
  const [showNavModal, setShowNavModal] = useState(false);

  const NavModalCallback = useCallback(() => {
    return (
      <NavModal
        showNavModal={showNavModal}
        setShowNavModal={setShowNavModal}
        handleClose={handleClose}
        backdropClass={backdropClass}
      />
    );
  }, [showNavModal, setShowNavModal, handleClose, backdropClass]);

  return useMemo(
    () => ({ setShowNavModal, NavModal: NavModalCallback }),
    [setShowNavModal, NavModalCallback],
  );
}
