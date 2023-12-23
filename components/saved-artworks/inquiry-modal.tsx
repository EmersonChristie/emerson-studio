import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailQuestion } from "lucide-react"; // Adjust the import path
import { Artwork } from "../../types/global";

interface InquiryModalProps {
  maxHeight: string | number;
  maxWidth: string | number;
  inquiryArtworks: Artwork[];
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  maxHeight,
  maxWidth,
  inquiryArtworks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalVariants = {
    closed: {
      scale: 0,
      x: "calc(100vw - 4rem)", // Adjust based on button size and position
      y: "calc(100vh - 4rem)",
    },
    open: {
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden p-4"
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Modal Content */}
            {/* ... */}
          </motion.div>
        )}

        {!isOpen && (
          <motion.div
            className="fixed bottom-10 right-10 z-40"
            initial={false}
            animate="closed"
            onClick={handleToggle}
          >
            <MailQuestion
              size={12}
              color="black"
              className="h-16 w-16 rounded-full bg-gray-100 text-white shadow-lg shadow-gray-400"
            />
            {/* Artwork count badge */}
            {/* ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InquiryModal;
