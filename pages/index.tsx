// pages/index.tsx
import { useEffect } from "react";
import { Artwork } from "types/global";
import GalleryContainer from "@/components/gallery";
import ArtCollectionSlide from "@/components/hero-section/art-collection-slide";
import HeroSection from "@/components/hero-section/hero";
import { fetchArtworks } from "@/lib/strapi/artworks";
import { fetchWebsiteCollections } from "@/lib/strapi/website-collection";
import { useArtworks } from "@/lib/context/artworks-context";
import Head from "next/head";

import { HomePageSlider } from "@/components/home-page-slider/slider";

interface SlideArtwork {
  src: string;
  alt: string;
}

interface ArtCollectionSlideProps {
  artworks: SlideArtwork[];
  collectionTitle: string;
  onSlideComplete?: () => void;
}

interface HomePageProps {
  initialArtworks: Artwork[];
  artCollectionSlides: ArtCollectionSlideProps[];
}

export default function HomePage({
  initialArtworks,
  artCollectionSlides,
}: HomePageProps) {
  const { artworks, addToArtworks } = useArtworks();
  const backgroundImage = "/images/gallery-wall.jpg";

  // Create ArtCollectionSlide components
  const artCollectionSlideComponents = artCollectionSlides.map(
    (props, index) => (
      <ArtCollectionSlide
        key={index}
        {...props}
        onSlideComplete={() => {
          /* ... */
        }}
      />
    ),
  );
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
            as="imaghttps://res.cloudinary.com/dainpisbj/image/upload/v1702430751/383_image_0d6d4d7069.jpge"
          />
https://res.cloudinary.com/dainpisbj/image/upload/v1702430751/383_image_0d6d4d7069.jpg        ))}
      </Head> */}
      <HeroSection slides={artCollectionSlideComponents} />
      {/* <HomePageSlider
        artworks={initialArtworks.slice(0, 6)}
   
        background={backgroundImage}
      />
      <GalleryContainer /> */}
    </>
  );
}

interface ArtworkAttributes {
  title: string;
  mainImage: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string | null;
      };
    };
  };
}

interface CollectionArtwork {
  id: number;
  attributes: ArtworkAttributes;
}

interface Collection {
  id: number;
  title: string;
  artworks: CollectionArtwork[];
}

const transformToArtCollectionSlides = (data: Collection[]) => {
  return data.map((collection) => ({
    collectionTitle: collection.title,
    artworks: collection.artworks.map((artwork: CollectionArtwork) => ({
      src: artwork.attributes.mainImage.data.attributes.url,
      alt:
        artwork.attributes.mainImage.data.attributes.alternativeText ||
        artwork.attributes.title,
    })),
  }));
};

export async function getStaticProps() {
  try {
    const initialArtworks = await fetchArtworks(1, 15); // Fetch the first 10 artworks
    const websiteCollections = await fetchWebsiteCollections(1, 20);
    const artCollectionSlides =
      transformToArtCollectionSlides(websiteCollections);

    return {
      props: {
        initialArtworks,
        artCollectionSlides,
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
