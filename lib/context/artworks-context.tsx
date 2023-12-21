// artworks-context.tsx
import React, { createContext, useState, useContext } from "react";
import { Artwork, WithChildren } from "../../types/global";
import { fetchArtworks, fetchArtworkById } from "@/lib/strapi/artworks";

interface ArtworksContextType {
  artworks: Artwork[];
  initialArtwork?: Artwork;
  addToArtworks: (newArtworks: Artwork | Artwork[]) => void;
  loadArtworks: (page: number, pageSize: number) => Promise<void>;
  loadArtworkById: (artworkId: string) => Promise<void>;
  loadMoreArtworks: () => Promise<void>;
  currentPage: number;
  hasMoreArtworks: boolean;
}

const ArtworksContext = createContext<ArtworksContextType | undefined>(
  undefined,
);

export const ArtworksProvider: React.FC<WithChildren> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [initialArtwork, setInitialArtwork] = useState<Artwork | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreArtworks, setHasMoreArtworks] = useState(true);
  const pageSize = 10;

  const addToArtworks = (newArtworks: Artwork | Artwork[]) => {
    setArtworks((prevArtworks = []) => {
      // Default to an empty array if prevArtworks is undefined
      const newArtworksArray = Array.isArray(newArtworks)
        ? newArtworks
        : [newArtworks];

      const filteredNewArtworks = newArtworksArray.filter(
        (newArtwork) =>
          newArtwork &&
          !prevArtworks.some((art) => art && art.id === newArtwork.id),
      );

      return [...prevArtworks, ...filteredNewArtworks];
    });
  };

  // Function to load artworks based on page and pageSize
  const loadArtworks = async (page: number, pageSize: number) => {
    try {
      const newArtworks = await fetchArtworks(page, pageSize);

      addToArtworks(newArtworks);
      //   if (page === 1) {
      //     // If loading the first page, reset the artworks
      //     setArtworks(newArtworks);
      //   } else {
      //     // Add new artworks without duplicates
      //     addToArtworks(newArtworks);
      //   }

      setCurrentPage(page);
      setHasMoreArtworks(newArtworks.length === pageSize);
    } catch (error) {
      console.error("Failed to load artworks:", error);
      // Handle error appropriately
    }
  };

  // Function to load a single artwork by ID
  const loadArtworkById = async (artworkId: string) => {
    try {
      // First, check if the artwork is already in the context
      const existingArtwork = artworks.find(
        (art) => art.id === Number(artworkId),
      );
      if (!existingArtwork) {
        // Fetch the artwork only if it's not already in the context
        const artwork = await fetchArtworkById(artworkId);
        addToArtworks(artwork);
      }
      // If the artwork already exists in the context, no further action is needed
    } catch (error) {
      console.error("Failed to load artwork:", error);
      // Handle error appropriately
    }
  };

  // Function to load more artworks
  const loadMoreArtworks = async () => {
    await loadArtworks(currentPage + 1, pageSize);
  };

  return (
    <ArtworksContext.Provider
      value={{
        artworks,
        addToArtworks,
        loadArtworks,
        loadArtworkById,
        loadMoreArtworks,
        currentPage,
        hasMoreArtworks,
      }}
    >
      {children}
    </ArtworksContext.Provider>
  );
};

export const useArtworks = (): ArtworksContextType => {
  const context = useContext(ArtworksContext);
  if (!context) {
    throw new Error("useArtworks must be used within an ArtworksProvider");
  }
  return context;
};
