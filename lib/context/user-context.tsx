import React, { ReactNode, createContext, useContext } from "react";
import { Artwork, WithChildren } from "../../types/global";
import useLocalStorage from "../hooks/use-local-storage"; // Adjust the path as necessary
import { useToast } from "./toast-context";
import SaveToast from "@/components/shared/save-toast";
import { Save } from "lucide-react";

interface UserContextType {
  savedArtworks: Artwork[];
  toggleSaveArtwork: (artwork: Artwork) => void;
  isArtworkSaved: (artworkId: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<WithChildren> = ({ children }) => {
  const [savedArtworks, setSavedArtworks] = useLocalStorage<Artwork[]>(
    "savedArtworks",
    [],
  );
  const { showToast } = useToast();

  const toggleSaveArtwork = (artwork: Artwork) => {
    const isSaved = savedArtworks.some((aw) => aw.id === artwork.id);

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

  const isArtworkSaved = (artworkId: number): boolean => {
    return savedArtworks.some((artwork) => artwork.id === artworkId);
  };

  return (
    <UserContext.Provider
      value={{ savedArtworks, toggleSaveArtwork, isArtworkSaved }}
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
