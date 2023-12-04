// pages/index.tsx
import { ArtworkType } from "../types/global";
import GalleryContainer from "@/components/gallery"; // Adjust the import path as necessary
import Layout from "@/components/layout";
import artworksData from "../public/data/artlogic-artworks.json"; // Adjust the path to your JSON file

interface HomePageProps {
  artworks: ArtworkType[];
}

export default function HomePage({ artworks }: HomePageProps) {
  return <GalleryContainer initialArtworks={artworks} />;
}

export async function getStaticProps() {
  // TODO: Fetch artworks from API
  const artworks = await artworksData;

  return {
    props: {
      artworks: artworks,
    },
    // Omit revalidate if not needed
  };
}
