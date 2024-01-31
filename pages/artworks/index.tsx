// pages/index.tsx
import { useEffect } from "react";
import { Artwork } from "types/global";
import GalleryContainer from "@/components/gallery";
import { fetchArtworks } from "@/lib/strapi/artworks";
import { useArtworks } from "@/lib/context/artworks-context";
import PageLayout from "@/components/shared/page-layout";
import Head from "next/head";

interface HomePageProps {
  initialArtworks: Artwork[];
}

export default function HomePage({ initialArtworks }: HomePageProps) {
  const { artworks, addToArtworks } = useArtworks();

  useEffect(() => {
    if (artworks.length === 0) {
      // Initialize the context with the statically fetched artworks
      addToArtworks(initialArtworks);
    }
  }, [initialArtworks, addToArtworks, artworks]);
  return (
    <>
      <PageLayout title="Artworks">
        <GalleryContainer />
      </PageLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const initialArtworks = await fetchArtworks(1, 15); // Fetch the first 10 artworks
    return {
      props: {
        initialArtworks,
      },
      revalidate: 60, // Revalidate at a regular interval if using ISR
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        initialArtworks: [],
      },
    };
  }
}
