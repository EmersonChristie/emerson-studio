// components/InquiryModal.tsx
import React, { useMemo, useCallback, useState } from "react";
import { InquiryForm } from "./inquiry-form";
import Modal from "@/components/shared/modal";
import { Artwork } from "types/global";

interface InquiryModalProps {
  showInquiryModal: boolean;
  setShowInquiryModal: React.Dispatch<React.SetStateAction<boolean>>;
  inquiryArtworks: Artwork[];
  backdropClass?: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  showInquiryModal,
  setShowInquiryModal,
  backdropClass,
}) => {
  return (
    <Modal
      showModal={showInquiryModal}
      setShowModal={setShowInquiryModal}
      backdropClass={backdropClass}
    >
      <div className="max-h-[60vh] w-full max-w-3xl overflow-auto rounded-sm bg-white px-4 pt-2 md:max-h-[70vh] md:py-4 md:px-0 md:pt-4 ">
        <InquiryForm setShowInquiryModal={setShowInquiryModal} />
      </div>
    </Modal>
  );
};

export default InquiryModal;

/// Inquiry Modal Hook ///////////////////////////////////////

export function useInquiryModal(
  inquiryArtworks: Artwork[],
  backDropClass?: string,
) {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const InquiryModalCallback = useCallback(() => {
    return (
      <InquiryModal
        showInquiryModal={showInquiryModal}
        setShowInquiryModal={setShowInquiryModal}
        inquiryArtworks={inquiryArtworks}
        backdropClass={backDropClass}
      />
    );
  }, [showInquiryModal, setShowInquiryModal, inquiryArtworks, backDropClass]);

  return useMemo(
    () => ({
      setShowInquiryModal,
      InquiryModal: InquiryModalCallback,
    }),
    [setShowInquiryModal, InquiryModalCallback],
  );
}
