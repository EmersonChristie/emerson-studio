import { Artwork } from "types/global";
// artworks.ts

import { getArtworksQuery, QueryParams } from "./api-query-params";

/**
 * Fetches artworks from the API.
 *
 * @param page - The page number to fetch.
 * @param pageSize - The number of artworks per page.
 * @param queryParams - Optional query parameters to filter the artworks.
 * @returns A promise that resolves to an array of Artwork objects.
 * @throws An error if there was a problem fetching the artworks.
 */
export const fetchArtworks = async (
  page: number,
  pageSize: number,
  queryParams?: QueryParams,
): Promise<Artwork[]> => {
  const query = getArtworksQuery(page, pageSize, queryParams);
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/artworks?${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const { data } = await response.json();
    return data.map((item) => ({ id: item.id, ...item.attributes }));
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/artworks/${id}`,
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
