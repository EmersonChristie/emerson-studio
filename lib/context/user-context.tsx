import React, { ReactNode, createContext, useContext } from "react";
import { Artwork, WithChildren } from "../../types/global";
import useLocalStorage from "../hooks/use-local-storage"; // Adjust the path as necessary

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

  const toggleSaveArtwork = (artwork: Artwork) => {
    // Compute the new array first
    const newArtworks = savedArtworks.some((aw) => aw.id === artwork.id)
      ? savedArtworks.filter((aw) => aw.id !== artwork.id) // Remove the artwork if it's already saved
      : [...savedArtworks, artwork]; // Add the artwork if it's not saved

    // Then set the new array
    setSavedArtworks(newArtworks);
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
