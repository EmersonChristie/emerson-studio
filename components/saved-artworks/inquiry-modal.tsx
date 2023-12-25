// components/InquiryModal.tsx
import React, { useMemo, useCallback, useState } from "react";
import { InquiryForm } from "./inquiry-form";
import Modal from "@/components/shared/modal";
import { Artwork } from "types/global";

interface InquiryModalProps {
  showInquiryModal: boolean;
  setShowInquiryModal: React.Dispatch<React.SetStateAction<boolean>>;
  inquiryArtworks: Artwork[];
  postInquiry: (data: any) => void;
  backdropClass?: string;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  showInquiryModal,
  setShowInquiryModal,
  postInquiry,
  backdropClass,
}) => {
  return (
    <Modal
      showModal={showInquiryModal}
      setShowModal={setShowInquiryModal}
      backdropClass={backdropClass}
    >
      <div className="max-h-[70vh] w-full max-w-2xl overflow-auto bg-white px-4 pt-2 md:py-4 md:px-0 md:pt-4 ">
        <InquiryForm postInquiry={postInquiry} />
      </div>
    </Modal>
  );
};

export default InquiryModal;

/// Inquiry Modal Hook ///////////////////////////////////////

export function useInquiryModal(
  inquiryArtworks: Artwork[],
  postInquiry: (data: any) => void,
  backDropClass?: string,
) {
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const InquiryModalCallback = useCallback(() => {
    return (
      <InquiryModal
        showInquiryModal={showInquiryModal}
        setShowInquiryModal={setShowInquiryModal}
        inquiryArtworks={inquiryArtworks}
        postInquiry={postInquiry}
        backdropClass={backDropClass}
      />
    );
  }, [
    showInquiryModal,
    setShowInquiryModal,
    inquiryArtworks,
    postInquiry,
    backDropClass,
  ]);

  return useMemo(
    () => ({
      setShowInquiryModal,
      InquiryModal: InquiryModalCallback,
    }),
    [setShowInquiryModal, InquiryModalCallback],
  );
}
