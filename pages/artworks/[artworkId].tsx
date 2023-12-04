import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Slider from "@/components/slider";
import { useGalleryContext } from "@/lib/context/gallery-context";
import { useContext } from "react";
import { ArtworkType } from "../../types/global";

import artworks from "../../public/data/artlogic-artworks.json"; // Adjust the path to your JSON file

interface StaticProps {
  artwork: ArtworkType | null;
}

interface IParams extends ParsedUrlQuery {
  artworkId: string;
}

const ArtworkPage = () => {
  const router = useRouter();
  const { artworkId } = router.query;
  const { artworks } = useGalleryContext();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    if (artworks.length > 0 && artworkId) {
      const index = artworks.findIndex(
        (artwork) => artwork.id.toString() === artworkId,
      );
      setCurrentIndex(index);
    }
  }, [artworkId, artworks]);

  if (currentIndex === null) {
    // TODO: Add a loading state page
    return <div>Loading...</div>; // or any other loading state
  }

  return <Slider artworks={artworks} currentIndex={currentIndex} />;
};

export default ArtworkPage;

export const getStaticProps: GetStaticProps<StaticProps, IParams> = async (
  context,
) => {
  const { params } = context;

  // Ensure params and params.artworkId are defined
  if (!params || !params.artworkId) {
    return {
      props: {
        artwork: null, // Return null if the params are not defined
      },
    };
  }

  const artwork = artworks.find(
    (art) => art.id.toString() === params.artworkId,
  );

  if (!artwork) {
    return { notFound: true };
  }

  return {
    props: {
      artwork,
    },
  };
};

export async function getStaticPaths() {
  // Generate paths for each artwork
  const paths = artworks.map((artwork) => ({
    params: { artworkId: artwork.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
