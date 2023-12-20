import { ArtworkType } from "../types/global";
import SavedArtworksContainer from "@/components/saved-artworks";
import artworksData from "../public/data/artlogic-artworks.json"; // Adjust the path to your JSON file

interface SavedArtworksPageProps {
  artworks: ArtworkType[];
}

export default function SavedArtworksPage({
  artworks,
}: SavedArtworksPageProps) {
  return <SavedArtworksContainer initialSavedArtworks={artworks} />;
}

// TODO: Fetch saved artworks from API
export async function getStaticProps() {
  // TODO: Fetch artworks from API
  const artworks = await artworksData;

  return {
    props: {
      artworks: [],
    },
    // Omit revalidate if not needed
  };

  //   return {
  //     props: {
  //       artworks: artworks,
  //     },
  //     // Omit revalidate if not needed
  //   };
}
