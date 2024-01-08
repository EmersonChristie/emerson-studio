import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Slider from "@/components/slider";
import { Artwork } from "types/global";

import { useArtworks } from "@/lib/context/artworks-context";

import {
  fetchArtworks,
  fetchArtworkById,
  fetchAllArtworkIDs,
} from "@/lib/strapi/artworks";

interface IParams extends ParsedUrlQuery {
  artworkId: string;
}

const ArtworkPage: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isIndexInitialized = useRef(false); // To track if currentIndex is initialized

  const { artworks, initialArtwork, addToArtworks, loadArtworks } =
    useArtworks();

  const router = useRouter();

  useEffect(() => {
    if (!isIndexInitialized.current) {
      const index = artworks.findIndex((art) => art.id === artwork.id);
      if (index !== -1) {
        setCurrentIndex(index);
      } else {
        addToArtworks(artwork);
        setCurrentIndex(0); // Set to 0 as we add the artwork at the beginning
      }
      isIndexInitialized.current = true; // Mark as initialized
    }
  }, [artwork, artworks, addToArtworks]);

  useEffect(() => {
    // Load additional artworks if necessary
    if (
      artworks.length > 0 &&
      artworks.length < 10 &&
      isIndexInitialized.current
    ) {
      loadArtworks(1, 10);
    }
  }, [artworks.length, loadArtworks]);

  if (currentIndex === null) {
    return <div>Loading...</div>;
  }

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    // Update the URL if needed
    const newArtworkId = artworks[newIndex].id;
    router.replace(`/artworks/${newArtworkId}`, undefined, { shallow: true });
  };

  return (
    <Slider currentIndex={currentIndex} onIndexChange={handleIndexChange} />
  );
};

export default ArtworkPage;

type StaticProps = {
  // Define the structure of your static props here
  artwork: Artwork | null; // Example property
};

export const getStaticProps: GetStaticProps<StaticProps, IParams> = async (
  context,
) => {
  const { params } = context;

  if (!params || !params.artworkId) {
    return { props: { artwork: null } };
  }

  try {
    // Assuming fetchArtworkByID is an async function that fetches a specific artwork
    const artwork = await fetchArtworkById(params.artworkId);

    return { props: { artwork } };
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return { props: { artwork: null } };
  }
};

export async function getStaticPaths() {
  const artworkIDs = await fetchAllArtworkIDs();

  const paths = artworkIDs.map((id) => ({
    params: { artworkId: id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // or 'false' depending on your preference
  };
}
