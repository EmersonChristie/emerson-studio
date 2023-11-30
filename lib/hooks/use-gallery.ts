import { useEffect } from "react";
import { useGalleryContext } from "@/lib/context/gallery-context";

export const useGallery = () => {
  const { artworks, setArtworks } = useGalleryContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch static data from a local JSON file in the public folder
        const response = await fetch("/data/artlogic-artworks.json");
        const data = await response.json();
        console.log("Fetched artworks:", data);
        setArtworks(data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      }
    };

    if (artworks.length === 0) {
      fetchData();
    }
  }, [artworks.length, setArtworks]);

  return {
    artworks,
    toggleLike: (artworkId: number) => {
      // This function will be used to toggle the 'liked' state of an artwork
      // Defined in GalleryContext
    },
  };
};
