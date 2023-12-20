import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ArtworkType } from "../../types/global";

type Artwork = ArtworkType;

type GalleryContextType = {
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  savedArtworks: Artwork[];
  setSavedArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  toggleSaveArtwork: (artworkId: number) => void;
};

const initialContextValue: GalleryContextType = {
  artworks: [],
  setArtworks: () => {},
  savedArtworks: [],
  setSavedArtworks: () => {},
  toggleSaveArtwork: () => {},
};

const GalleryContext = createContext<GalleryContextType>(initialContextValue);

type GalleryProviderProps = {
  children: ReactNode;
};

const sortArtworksByImportance = (artworks: Artwork[]) => {
  return artworks.sort((a, b) => b.importanceRating - a.importanceRating);
};

export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/artlogic-artworks.json");
        const data = await response.json();
        // Sort artworks by importanceRating descending
        sortArtworksByImportance(data);
        // console log artworks title and importanceRating
        // console.log("Artworks:", data);
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };

    if (artworks.length === 0) {
      fetchData();
    }
  }, []);

  const toggleSaveArtwork = (artworkId: number) => {
    setArtworks((currentArtworks) =>
      currentArtworks.map((artwork) => {
        if (artwork.id === artworkId) {
          const updatedArtwork = { ...artwork, saved: !artwork.saved };
          // Update savedArtworks state as well
          if (updatedArtwork.saved) {
            setSavedArtworks((prev) => [...prev, updatedArtwork]);
          } else {
            setSavedArtworks((prev) =>
              prev.filter((aw) => aw.id !== artworkId),
            );
          }
          return updatedArtwork;
        }
        return artwork;
      }),
    );
    console.log("Toggled save for artwork with id: ", artworkId);
  };

  return (
    <GalleryContext.Provider
      value={{
        artworks,
        setArtworks,
        savedArtworks,
        setSavedArtworks,
        toggleSaveArtwork,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
