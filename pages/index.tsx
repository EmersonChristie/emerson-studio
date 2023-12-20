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
  const { setArtworks } = useArtworks(); // Custom hook from your ArtworksContext

  useEffect(() => {
    setArtworks(initialArtworks);
  }, [initialArtworks]);
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
      <GalleryContainer initialArtworks={initialArtworks} />
    </>
  );
}

// pages/index.js

// export async function getStaticProps() {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;

//   try {
//     const res = await fetch(`${baseUrl}/api/artworks`);
//     if (!res.ok) {
//       throw new Error(`Failed to fetch artworks: ${res.status}`);
//     }
//     const artworks = await res.json();
//     console.log("artworks in getStaticProps:", JSON.stringify(artworks));

//     return {
//       props: {
//         artworks,
//       },
//       revalidate: 10, // for Incremental Static Regeneration (ISR)
//     };
//   } catch (error) {
//     console.error("Error in getStaticProps:", error);
//     return {
//       props: {
//         artworks: [],
//       },
//     };
//   }
// }

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
