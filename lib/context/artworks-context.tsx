// artworks-context.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { Artwork, WithChildren } from "../../types/global";
import { fetchArtworks } from "@/lib/strapi/artworks";

interface ArtworksContextType {
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  loadMoreArtworks: () => void;
  currentPage: number;
  hasMoreArtworks: boolean;
}

const ArtworksContext = createContext<ArtworksContextType | undefined>(
  undefined,
);

export const ArtworksProvider: React.FC<WithChildren> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreArtworks, setHasMoreArtworks] = useState(true);
  const pageSize = 10;

  // Function to load more artworks
  const loadMoreArtworks = async () => {
    const newPage = currentPage + 1;
    console.log("New page:", newPage);
    console.log("pageSize:", pageSize);
    const newArtworks = await fetchArtworks(newPage, pageSize);
    console.log("newArtworks:", newArtworks);
    setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
    setCurrentPage(newPage);
    // Update hasMoreArtworks based on the API response
    // For example, if the API returns fewer items than the page size,
    // it means there are no more artworks to load
    setHasMoreArtworks(newArtworks.length === pageSize);
  };

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        setArtworks,
        loadMoreArtworks,
        currentPage,
        hasMoreArtworks,
      }}
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
