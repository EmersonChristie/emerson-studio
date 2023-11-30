import React, { createContext, useState, useContext, ReactNode } from "react";
import { ArtworkType } from "../../types/global";

// Artwork type definition (adjust according to your data structure)
type Artwork = ArtworkType;

// Context value type
type GalleryContextType = {
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  toggleLikeArtwork: (artworkId: number) => void;
};

// Initial context value
const initialContextValue: GalleryContextType = {
  artworks: [], // Initialize as an empty array
  setArtworks: () => {}, // Placeholder function
  toggleLikeArtwork: () => {}, // Placeholder function
};

// Creating the context
const GalleryContext = createContext<GalleryContextType>(initialContextValue);

type GalleryProviderProps = {
  children: ReactNode; // Explicitly typing the children prop
};

// Provider component
export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const toggleLikeArtwork = (artworkId: number) => {
    setArtworks((currentArtworks) =>
      currentArtworks.map((artwork) =>
        artwork.id === artworkId
          ? { ...artwork, liked: !artwork.liked }
          : artwork,
      ),
    );
    console.log("Toggled like for artwork with id: ", artworkId);
  };

  return (
    <GalleryContext.Provider
      value={{ artworks, setArtworks, toggleLikeArtwork }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

// Hook to use the context
export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
