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
  toggleSaveArtwork: (artworkId: number) => void;
  getSavedArtworks: () => Artwork[]; // Add this line
};

// Initial context value
const initialContextValue: GalleryContextType = {
  artworks: [], // Initialize as an empty array
  setArtworks: () => {}, // Placeholder function
  toggleSaveArtwork: () => {}, // Placeholder function
  getSavedArtworks: () => [], // Add this line
};

// Creating the context
const GalleryContext = createContext<GalleryContextType>(initialContextValue);

type GalleryProviderProps = {
  children: ReactNode; // Explicitly typing the children prop
};

// Function to sort artworks by importanceRating
const sortArtworksByImportance = (artworks: Artwork[]) => {
  return artworks.sort(
    (a: Artwork, b: Artwork) => b.importanceRating - a.importanceRating,
  );
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
        // Sort artworks by importanceRating descending
        sortArtworksByImportance(data);
        // console log artworks title and importanceRating
        console.log("Artworks:", data);
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };

    if (artworks.length === 0) {
      fetchData();
    }
  }, []); // Remove dependencies to run only once on mount

  const toggleSaveArtwork = (artworkId: number) => {
    setArtworks((currentArtworks) =>
      currentArtworks.map((artwork) =>
        artwork.id === artworkId
          ? { ...artwork, saved: !artwork.saved }
          : artwork,
      ),
    );
    console.log("Toggled save for artwork with id: ", artworkId);
  };

  // Function to get saved artworks
  const getSavedArtworks = () => {
    return artworks.filter((artwork) => artwork.saved);
  };

  return (
    <GalleryContext.Provider
      value={{ artworks, setArtworks, toggleSaveArtwork, getSavedArtworks }}
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
