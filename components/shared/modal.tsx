import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import FocusTrap from "focus-trap-react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Leaflet from "./leaflet";
import useWindowSize from "@/lib/hooks/use-window-size";
import { useChat } from "@/lib/context/chat-context";

export default function Modal({
  children,
  showModal,
  setShowModal,
  handleClose,
  backdropClass,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
  backdropClass?: string;
}) {
  const desktopModalRef = useRef(null);

  const { isChatVisible, setChatVisible } = useChat();

  const closeButton = () => {
    if (handleClose) {
      handleClose();
      setChatVisible(true);
    }
  };

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        closeButton();
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // turn off chat when modal is open
  useEffect(() => {
    if (showModal) {
      setChatVisible(false);
    }
  }, [showModal, setChatVisible]);

  const { isMobile, isDesktop } = useWindowSize();

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && (
            <Leaflet setShow={setShowModal} handleClose={handleClose}>
              {children}
            </Leaflet>
          )}
          {isDesktop && (
            <>
              <FocusTrap focusTrapOptions={{ initialFocus: false }}>
                <motion.div
                  ref={desktopModalRef}
                  key="desktop-modal"
                  className="fixed inset-0 z-40 hidden min-h-screen items-center justify-center md:flex"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.2, duratrion: 0.3 }}
                  onMouseDown={(e) => {
                    if (desktopModalRef.current === e.target) {
                      setShowModal(false);
                      closeButton();
                    }
                  }}
                >
                  {children}
                </motion.div>
              </FocusTrap>
              <motion.div
                key="desktop-backdrop"
                className={cx(
                  "fixed inset-0 z-30 bg-opacity-90 backdrop-blur",
                  backdropClass,
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setShowModal(false);
                  closeButton();
                }}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
