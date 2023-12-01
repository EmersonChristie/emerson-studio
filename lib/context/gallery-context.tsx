import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/artlogic-artworks.json");
        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };

    if (artworks.length === 0) {
      fetchData();
    }
  }, []); // Remove dependencies to run only once on mount

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
