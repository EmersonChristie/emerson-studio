// pages/index.tsx
import { useEffect } from "react";
import { Artwork } from "types/global";
import GalleryContainer from "@/components/gallery";
import { fetchArtworks } from "@/lib/strapi/artworks";
import { fetchHomePageSlides } from "@/lib/strapi/homePageSlider";
import { useArtworks } from "@/lib/context/artworks-context";
import Head from "next/head";

import CollectionsSlider from "@/components/collections-slider";
import { SliderItem } from "types/global";

interface HomePageProps {
  slides: SliderItem[];
}

export default function HomePage({ slides }: HomePageProps) {
  // const { artworks, addToArtworks } = useArtworks();
  // const backgroundImage = "/images/gallery-wall.jpg";

  // useEffect(() => {
  //   if (artworks.length === 0) {
  //     // Initialize the context with the statically fetched artworks
  //     addToArtworks(initialArtworks);
  //   }
  // }, [initialArtworks, addToArtworks, artworks]);
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
      {/* <HomePageSlider
        artworks={initialArtworks.slice(0, 6)}
        background={backgroundImage}
      /> */}
      <CollectionsSlider slides={slides} />
      {/* <GalleryContainer /> */}
    </>
  );
}

export async function getStaticProps() {
  try {
    const slides = await fetchHomePageSlides(1, 20);
    console.log("slides", slides);
    return {
      props: {
        slides,
      },
      revalidate: 60, // Revalidate at a regular interval if using ISR
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        slides: [],
      },
    };
  }
}
