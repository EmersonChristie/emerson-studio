import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Slider from "@/components/slider";
import { Artwork } from "../../types/global";

import {
  fetchArtworks,
  fetchArtworkById,
  fetchAllArtworkIDs,
} from "@/lib/strapi/artworks";

interface IParams extends ParsedUrlQuery {
  artworkId: string;
}

const ArtworkPage: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch all artworks for the slider
    const getArtworks = async () => {
      const artworks = await fetchArtworks(1, 10);
      setAllArtworks(artworks);
      // Find the index of the current artwork in the slider
      const index = artworks.findIndex((art) => art.id === artwork.id);
      setCurrentIndex(index);
    };

    getArtworks();
  }, [artwork.id]);

  if (currentIndex === null) {
    return <div>Loading...</div>;
  }

  const updateUrl = (newIndex: number) => {
    const newArtworkId = allArtworks[newIndex].id;
    const newUrl = `/artworks/${newArtworkId}`;
    router.replace(newUrl, undefined, { shallow: true });
  };

  const handleIndexChange = (newIndex: number) => {
    console.log("newIndex:", newIndex);
    setCurrentIndex(newIndex);
    updateUrl(newIndex);
  };

  return (
    <Slider
      artworks={allArtworks}
      currentIndex={currentIndex}
      onIndexChange={handleIndexChange}
    />
  );
};

export default ArtworkPage;

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
