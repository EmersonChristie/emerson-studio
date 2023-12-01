// pages/index.tsx
import { ArtworkType } from "../types/global";
import GalleryContainer from "@/components/gallery"; // Adjust the import path as necessary
import Layout from "@/components/layout";
import artworksData from "../public/data/artlogic-artworks.json"; // Adjust the path to your JSON file

interface HomePageProps {
  artworks: ArtworkType[];
}

export default function HomePage({ artworks }: HomePageProps) {
  return (
    // <Layout
    //   meta={{
    //     title: "ArtLogic Gallery",
    //     description: "A sample gallery built with Next.js and ArtLogic.",
    //   }}
    // >
    <GalleryContainer initialArtworks={artworks} />
    // </Layout>
  );
}

export async function getStaticProps() {
  // TODO: Fetch artworks from API
  const artworks = await artworksData;
  console.log("Artworks prop in HomePage:", artworks);

  return {
    props: {
      artworks: artworks,
    },
    // Omit revalidate if not needed
  };
}
