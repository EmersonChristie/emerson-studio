import { Artwork } from "../types/global";
import SavedArtworksContainer from "@/components/saved-artworks";

interface SavedArtworksPageProps {
  artworks: Artwork[];
}

export default function SavedArtworksPage() {
  return <SavedArtworksContainer />;
}
