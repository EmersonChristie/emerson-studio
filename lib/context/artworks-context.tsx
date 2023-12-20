// artworks-context.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { Artwork, WithChildren } from "../../types/global";
import { fetchArtworks } from "@/lib/strapi/artworks";

interface ArtworksContextType {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  loadMoreArtworks: () => void;
  currentPage: number;
}

const ArtworksContext = createContext<ArtworksContextType | undefined>(
  undefined,
);

export const ArtworksProvider: React.FC<WithChildren> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Set your desired page size

  // Function to load more artworks
  const loadMoreArtworks = async () => {
    const newPage = currentPage + 1;
    const newArtworks = await fetchArtworks(newPage, pageSize);
    setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
    setCurrentPage(newPage);
  };

  return (
    <ArtworksContext.Provider
      value={{ artworks, setArtworks, loadMoreArtworks, currentPage }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useArtworks = (): ArtworksContextType => {
  const context = useContext(ArtworksContext);
  if (!context) {
    throw new Error("useArtworks must be used within an ArtworksProvider");
  }
  return context;
};
