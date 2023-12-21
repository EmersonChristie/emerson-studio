// pages/index.tsx
import { useEffect } from "react";
import { Artwork } from "../types/global";
import GalleryContainer from "@/components/gallery";
import { fetchArtworks } from "@/lib/strapi/artworks";
import { useArtworks } from "@/lib/context/artworks-context";
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
      {/* <Head>
        {initialArtworks.slice(0, 6).map((artwork) => (
          <link
            key={artwork.id}
            rel="preload"
            href={artwork.mainImage.data.attributes.url}
            as="image"
          />
        ))}
      </Head> */}
      <GalleryContainer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const initialArtworks = await fetchArtworks(1, 10); // Fetch the first 10 artworks
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
