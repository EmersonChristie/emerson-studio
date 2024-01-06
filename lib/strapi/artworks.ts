import { Artwork, ArtworkResponseData } from "types/global";
import { fetchStrapi } from "@/lib/strapi";
import { getArtworkQuery, getArtworksQuery } from "./api-query-params";

import { QueryParams } from "types/global";
/**
 * Fetches artworks from the API.
 *
 * @param page - The page number to fetch.
 * @param pageSize - The number of artworks per page.
 * @param queryParams - Optional query parameters to filter the artworks.
 * @returns A promise that resolves to an array of Artwork objects.
 * @throws An error if there was a problem fetching the artworks.
 */
// export const fetchArtworks = async (
//   page: number,
//   pageSize: number,
//   queryParams?: QueryParams,
// ): Promise<Artwork[]> => {
//   const query = getArtworksQuery(page, pageSize, queryParams);
//   const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/artworks?${query}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`API responded with status ${response.status}`);
//     }
//     const { data } = await response.json();
//     return data.map((item: ArtworkResponseData) => ({
//       id: item.id,
//       ...item.attributes,
//     }));
//   } catch (error) {
//     console.error("There was a problem fetching the artworks:", error);
//     throw error;
//   }
// };
const artworksQueryParams = {
  filters: {
    sendToWebsite: { $eq: true },
    featuredArtwork: { $eq: true },
  },
  populate: {
    dimensions: {
      fields: ["height", "width", "dimensions"],
    },
    price: {
      fields: ["price", "formattedPrice"],
    },
    mainImage: {
      fields: ["url", "alternativeText"],
    },
  },
  fields: ["title", "year", "medium", "genre", "series"],
  publicationState: "live",
  sort: ["year:desc"],
};
/**
 * Fetches artworks from the API.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} pageSize - The number of artworks per page.
 * @param {QueryParams} [queryParams] - Optional query parameters to filter the artworks.
 * @returns {Promise<Artwork[]>} A promise that resolves to an array of Artwork objects.
 * @throws {Error} An error if there was a problem fetching the artworks.
 */
export const fetchArtworks = async (
  page: number,
  pageSize: number,
  queryParams?: QueryParams,
): Promise<Artwork[]> => {
  const query = queryParams || artworksQueryParams;
  // console.log("Query Params in fetchArtworks", query);
  try {
    // Using fetchStrapi to fetch the data
    const data = await fetchStrapi(
      "artworks",
      page,
      pageSize,
      artworksQueryParams,
    );
    return data;
  } catch (error) {
    console.error("There was a problem fetching the artworks:", error);
    throw error;
  }
};

// Fetch a single artwork by ID
/**
 * Fetches an artwork by its ID from the Strapi API.
 * @param id - The ID of the artwork to fetch.
 * @returns A Promise that resolves to the fetched artwork.
 * @throws If there was a problem fetching the artwork.
 */
export const fetchArtworkById = async (id: string): Promise<Artwork> => {
  const query = getArtworkQuery();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/artworks/${id}?${query}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    const artwork = {
      id: json.data.id,
      ...json.data.attributes,
    };
    return artwork;
  } catch (error) {
    console.error(
      `There was a problem fetching the artwork with ID ${id}:`,
      error,
    );
    throw error;
  }
};

/**
 * Fetches all artwork IDs.
 *
 * @returns A promise that resolves to an array of strings representing the artwork IDs.
 */
export const fetchAllArtworkIDs = async (): Promise<string[]> => {
  let allIDs: string[] = [];
  let currentPage = 1;
  const pageSize = 10;

  while (true) {
    const artworks = await fetchArtworks(currentPage, pageSize);
    const ids = artworks.map((artwork) => artwork.id.toString());
    allIDs = [...allIDs, ...ids];

    if (ids.length < pageSize) {
      break; // Break the loop if the last page has been reached
    }
    currentPage++;
  }

  return allIDs;
};
