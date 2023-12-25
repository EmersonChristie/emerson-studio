import React, { createContext, useContext } from "react";
import { Artwork, WithChildren } from "types/global";
import useLocalStorage from "../hooks/use-local-storage"; // Adjust the path as necessary
import { useToast } from "./toast-context";
import SaveToast from "@/components/shared/save-toast";

interface UserContextType {
  savedArtworks: Artwork[];
  setSavedArtworks: (artworks: Artwork[]) => void;

  toggleSaveArtwork: (artwork: Artwork) => void;
  isArtworkSaved: (artworkId: number) => boolean;
  selectedInquireArtworks: Artwork[];
  setSelectedInquireArtworks: (artworks: Artwork[]) => void;
  toggleSelectInquireArtwork: (artwork: Artwork) => void;
  isArtworkSelected: (artworkId: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<WithChildren> = ({ children }) => {
  const [savedArtworks, setSavedArtworks] = useLocalStorage<Artwork[]>(
    "savedArtworks",
    [],
  );
  const [selectedInquireArtworks, setSelectedInquireArtworks] = useLocalStorage<
    Artwork[]
  >("selectedInquireArtworks", []);

  const { showToast } = useToast();

  const isArtworkSaved = (artworkId: number): boolean => {
    return savedArtworks.some((artwork) => artwork.id === artworkId);
  };

  const toggleSaveArtwork = (artwork: Artwork) => {
    const isSaved = savedArtworks.some((aw) => aw.id === artwork.id);
    const isSelected = selectedInquireArtworks.some(
      (aw) => aw.id === artwork.id,
    );

    if (isSelected) {
      // If the artwork is selected, unselect it
      toggleSelectInquireArtwork(artwork);
    }

    // Compute the new array first
    const newArtworks = isSaved
      ? savedArtworks.filter((aw) => aw.id !== artwork.id)
      : [...savedArtworks, artwork];

    setSavedArtworks(newArtworks);

    // Show toast notification
    showToast(
      <SaveToast
        imgSrc={artwork.mainImage.data.attributes.url}
        text={isSaved ? "Artwork Unsaved" : "Artwork Saved"}
        slug={`/saved-artworks`}
      />,
    );
  };

  const isArtworkSelected = (artworkId: number): boolean => {
    return selectedInquireArtworks.some((artwork) => artwork.id === artworkId);
  };

  const toggleSelectInquireArtwork = (artwork: Artwork) => {
    const isArtworkSelected = selectedInquireArtworks.some(
      (aw) => aw.id === artwork.id,
    );

    // Compute the new array first
    const newArtworks = isArtworkSelected
      ? selectedInquireArtworks.filter((aw) => aw.id !== artwork.id)
      : [...selectedInquireArtworks, artwork];

    console.log("selectedInquiryArtworks: ", newArtworks);

    setSelectedInquireArtworks(newArtworks);
  };

  return (
    <UserContext.Provider
      value={{
        savedArtworks,
        setSavedArtworks,
        toggleSaveArtwork,
        isArtworkSaved,
        selectedInquireArtworks,
        setSelectedInquireArtworks,
        toggleSelectInquireArtwork,
        isArtworkSelected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
