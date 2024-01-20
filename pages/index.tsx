// pages/index.tsx
import { useEffect, useRef } from "react";
import { Artwork } from "types/global";
import GalleryContainer from "@/components/gallery";
import ArtCollectionSlide from "@/components/hero-section/art-collection-slide";
import HeroSection from "@/components/hero-section/hero";
import { fetchArtworks } from "@/lib/strapi/artworks";
import { fetchWebsiteCollections } from "@/lib/strapi/website-collection";
import { useArtworks } from "@/lib/context/artworks-context";
import Head from "next/head";
import PageHeader from "@/components/shared/page-header";
import PageLayout from "@/components/shared/page-layout";
import useObserveHeroSection from "@/lib/hooks/use-observe-hero-section";
import { HomePageSlider } from "@/components/home-page-slider/slider";

interface SlideArtwork {
  src: string;
  alt: string;
  id: number;
}

interface CollectionProps {
  artworks: SlideArtwork[];
  collectionTitle: string;
}

interface HomePageProps {
  initialArtworks: Artwork[];
  artCollectionSlides: CollectionProps[];
}

export default function HomePage({
  initialArtworks,
  artCollectionSlides,
}: HomePageProps) {
  const { artworks, addToArtworks } = useArtworks();
  const backgroundImage = "/images/gallery-wall.jpg";

  const heroSectionRef = useRef(null);
  useObserveHeroSection(heroSectionRef);

  useEffect(() => {
    if (artworks.length === 0) {
      // Initialize the context with the statically fetched artworks
      addToArtworks(initialArtworks);
    }
  }, [initialArtworks, addToArtworks, artworks]);
  return (
    <>
      <Head>
        {artCollectionSlides.map((collection) =>
          collection.artworks.map((artwork) => (
            <link
              key={artwork.id}
              rel="preload"
              href={artwork.src}
              as="image"
            />
          )),
        )}
      </Head>
      <div className="h-full w-full" ref={heroSectionRef}>
        <HeroSection collections={artCollectionSlides} />
      </div>
      {/* <PageHeader
        title="Current Works"
        classNames="flex pt-16 flex-col pb-0 px-12 text-left md:pb-11 md:pt-20 w-full"
      /> */}
      <PageLayout title="Current Works">
        <GalleryContainer />
      </PageLayout>
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
      id: artwork.id,
    })),
  }));
};

export async function getStaticProps() {
  try {
    const initialArtworks = await fetchArtworks(1, 100); // Fetch the first 10 artworks
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
