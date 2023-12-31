import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Artwork } from "types/global"; // Assuming you have a type definition for Artwork
import { LayoutGroup, motion } from "framer-motion";
import ResponsiveGrid from "../shared/responsive-grid";
import SavedArtworkCard from "./saved-artwork-card";
import Divider from "../shared/divider";
import HeadingText from "../shared/headingText";
import { useUser } from "@/lib/context/user-context";
import PageHeader from "../shared/page-header";
import InquiryModal from "./inquiry-modal";
import FloatingButton from "./floating-button";
import { useInquiryModal } from "./inquiry-modal";
import PageLayout from "../shared/page-layout";

import ArtworkCard from "./artwork-card";
/**
 * SavedArtworksContainer component.
 * Utilizes the gallery context to display saved artworks and handle interactions.
 */
const SavedArtworksContainer = () => {
  const { savedArtworks, selectedInquireArtworks } = useUser();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [inquiryArtworks, setInquiryArtworks] = useState<Artwork[]>([]);

  const postInquiry = (data: any) => {
    console.log("Inquiry data", data);
  };

  const { setShowInquiryModal, InquiryModal } = useInquiryModal(
    inquiryArtworks,
    postInquiry,
  );

  const router = useRouter();

  const handleFloatingButtonCLick = () => {
    setShowInquiryModal(true);
  };

  useEffect(() => {
    if (savedArtworks?.length !== 0) {
      setArtworks(savedArtworks);
    } else {
      setArtworks([]);
    }
  }, [savedArtworks]);

  useEffect(() => {
    if (selectedInquireArtworks?.length !== 0) {
      setInquiryArtworks(selectedInquireArtworks);
    } else {
      setInquiryArtworks([]);
    }
  }, [selectedInquireArtworks]);

  return (
    <LayoutGroup>
      <PageLayout title="Saved Artworks">
        {/* Render each column of artworks */}
        {artworks?.length === 0 ? (
          // TODO: Add a loading state
          <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-center text-gray-600">No Saved Artworks</p>
            <button
              className="mt-10 rounded-sm border border-gray-600 bg-gray-600 px-4 py-2 uppercase tracking-wide text-gray-100 hover:text-white"
              onClick={() => router.push("/artworks")}
            >
              Browse Artworks
            </button>
          </div>
        ) : (
          <ResponsiveGrid>
            {artworks.map((artwork, i) => (
              // <SavedArtworkCard key={i} artwork={artwork} />
              <ArtworkCard key={i} artwork={artwork} />
            ))}
          </ResponsiveGrid>
        )}

        {inquiryArtworks?.length > 0 && (
          <FloatingButton onClick={handleFloatingButtonCLick} />
        )}
        <InquiryModal />
      </PageLayout>
    </LayoutGroup>
  );
};

export default SavedArtworksContainer;
