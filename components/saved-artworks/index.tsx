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

  const { setShowInquiryModal, InquiryModal } =
    useInquiryModal(inquiryArtworks);

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
        <button
          className="md-px-8 md-py-4 my-10 mb-16 rounded-sm border border-gray-600 bg-gray-600 px-4 py-2 uppercase tracking-wide text-gray-100 hover:text-white lg:text-lg"
          onClick={() => router.push("/artworks")}
        >
          Browse Artworks
        </button>
        <InquiryModal />
      </PageLayout>
    </LayoutGroup>
  );
};

export default SavedArtworksContainer;
