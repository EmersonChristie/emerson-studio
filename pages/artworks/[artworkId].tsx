// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { GetStaticProps, GetStaticPaths } from "next";
// import { ParsedUrlQuery } from "querystring";
// import Slider from "@/components/slider";
// import { Artwork } from "../../types/global";
// import { fetchArtworks } from "@/lib/strapi/artworks";
// import { useArtworks } from "@/lib/context/artworks-context";

// import { fetchArtworkById, fetchAllArtworkIDs } from "@/lib/strapi/artworks";

// interface IParams extends ParsedUrlQuery {
//   artworkId: string;
// }

// const ArtworkPage: React.FC<{ initialArtwork: Artwork }> = ({
//   initialArtwork,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null);
//   const { artworks, addToArtworks, loadArtworks } = useArtworks();
//   const router = useRouter();

//   // log current url
//   console.log("current url: ", router.asPath);

//   useEffect(() => {
//     // Check if the fetched artwork is already in the context
//     if (artworks.length === 0) {
//       addToArtworks(initialArtwork);
//       setCurrentIndex(0);
//     } else {
//       const index = artworks.findIndex((art) => art.id === initialArtwork.id);
//       if (index === -1) {
//         // Add the fetched artwork to the context if it's not there
//         addToArtworks(initialArtwork);
//         setCurrentIndex(artworks.length);
//       } else {
//         setCurrentIndex(index);
//       }
//     }

//     // Fetch more artworks if needed
//     if (artworks.length < 10) {
//       loadArtworks(1, 10);
//     }
//   }, [initialArtwork, artworks, addToArtworks, loadArtworks]);

//   useEffect(() => {
//     console.log("URL changed to:", router.asPath);
//   }, [router.asPath]);

//   // useEffect(() => {
//   //   if (currentIndex !== null && artworks[currentIndex]) {
//   //     const newUrl = `/artworks/${artworks[currentIndex].id}`;
//   //     router.replace(newUrl, undefined, { shallow: true });
//   //   }
//   // }, [currentIndex, artworks, router]);

//   const updateUrl = (newIndex: number) => {
//     console.log("newIndex passed to update url: ", newIndex);
//     console.log("currentIndex in update url: ", currentIndex);
//     if (newIndex < 0 || newIndex >= artworks.length) {
//       console.log("Index out of range");
//       return; // Index out of range
//     }
//     const newArtworkId = artworks[newIndex].id;
//     console.log("newArtworkId in update url: ", newArtworkId);
//     const newUrl = `/artworks/${newArtworkId}`;
//     router.replace(newUrl, undefined, { shallow: true });
//   };

//   const handleIndexChange = (newIndex: number) => {
//     console.log("newIndex passed to artwork page: ", newIndex);
//     setCurrentIndex(newIndex);
//     // updateUrl(newIndex);
//   };

//   if (currentIndex === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Slider currentIndex={currentIndex} onIndexChange={handleIndexChange} />
//   );
// };

// export default ArtworkPage;

// export const getStaticProps: GetStaticProps<StaticProps, IParams> = async (
//   context,
// ) => {
//   const { params } = context;
//   console.log("params in getStaticProps: ", params);

//   if (!params || !params.artworkId) {
//     return { props: { artwork: null } };
//   }

//   try {
//     // Assuming fetchArtworkByID is an async function that fetches a specific artwork
//     const artwork = await fetchArtworkById(params.artworkId);

//     return { props: { initialArtwork: artwork } };
//   } catch (error) {
//     console.error("Error fetching artwork:", error);
//     return { props: { initialArtwork: null } };
//   }
// };

// export async function getStaticPaths() {
//   const artworkIDs = await fetchAllArtworkIDs();

//   const paths = artworkIDs.map((id) => ({
//     params: { artworkId: id.toString() },
//   }));

//   return {
//     paths,
//     fallback: "blocking", // or 'false' depending on your preference
//   };
// }

//////////////////////////////////////////////////////////////////

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import Slider from "@/components/slider";
import { Artwork } from "../../types/global";

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
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { artworks, initialArtwork, addToArtworks, loadArtworks } =
    useArtworks();

  const router = useRouter();

  console.log("artwork in artwork page: ", artwork);
  console.log("artworks in artwork page: ", artworks);

  useEffect(() => {
    const getIndex = async () => {
      // Check if there are any artworks in the context
      if (artworks.length === 0) {
        // Fetch artworks and add them to the context
        await loadArtworks(1, 10);
      }
      // Find the index of the current artwork in the slider
      const index = artworks.findIndex((art) => art.id === artwork.id);
      // if the initial artwork is not in the context, add it
      if (index === -1) {
        await addToArtworks(artwork);
        console.log("artworks.length in artworks page: ", artworks.length);
        setCurrentIndex(artworks.length);
      } else {
        // Set the currentIndex to the index of the current artwork
        setCurrentIndex(index);
      }
    };
    getIndex();
  }, [artwork.id]);

  if (currentIndex === null) {
    return <div>Loading...</div>;
  } else {
    console.log("currentIndex in artwork page: ", currentIndex);
  }

  // const updateUrl = (newIndex: number) => {
  //   const newArtworkId = artworks[newIndex].id;
  //   const newUrl = `/artworks/${newArtworkId}`;
  //   router.replace(newUrl, undefined, { shallow: true });
  // };

  const handleIndexChange = (newIndex: number) => {
    console.log("newIndex:", newIndex);
    setCurrentIndex(newIndex);
    // updateUrl(newIndex);
  };

  return (
    <Slider
      // artworks={allArtworks}
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
