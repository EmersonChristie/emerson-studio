import { QueryParams } from "types/global";

/**
 * Fetches data from a Strapi API endpoint.
 *
 * @param {string} slug - The endpoint slug to fetch data from.
 * @param {number} [page] - Optional page number for pagination.
 * @param {number} [pageSize] - Optional number of items per page for pagination.
 * @param {QueryParams} [queryParams] - Optional query parameters to filter/sort the data.
 * @returns {Promise<any[]>} A promise that resolves to an array of data objects.
 * @throws {Error} An error if there was a problem fetching the data.
 *
 * @example
 * // Example of fetching artworks with pagination and custom query parameters
 * fetchStrapi('artworks', 1, 10, {
 *   filters: {
 *     sendToWebsite: { $eq: true },
 *     featuredArtwork: { $eq: true },
 *   },
 *   populate: {
 *     dimensions: { fields: ["height", "width", "dimensions"] },
 *     price: { fields: ["price", "formattedPrice"] },
 *     mainImage: { fields: ["url", "alternativeText"] },
 *   },
 *   fields: ["title", "year", "medium", "genre", "series"],
 *   publicationState: "live",
 *   sort: ["year:desc"],
 * }).then(data => console.log(data));
 *
 * @example
 * // Example of fetching a specific artist without pagination
 * fetchStrapi('artists/123').then(data => console.log(data));
 */
export const fetchStrapi = async (
  slug: string,
  page?: number,
  pageSize?: number,
  queryParams?: QueryParams,
): Promise<any[]> => {
  console.log("Query Params in fetchStrapi", queryParams);
  // Construct the query
  const query = serialize({
    ...(queryParams || {}),
    pagination: page && pageSize ? { page, pageSize } : undefined,
  });

  // Construct the URL
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${slug}?${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const { data } = await response.json();
    console.log(`Fetched from ${url} and got:`, data);
    return data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    }));
  } catch (error) {
    console.error(`There was a problem fetching data from ${slug}:`, error);
    throw error;
  }
};

/**
 * Serializes an object into a query string.
 * @param obj - The object to be serialized.
 * @param prefix - Optional prefix for the query parameters.
 * @returns The serialized query string.
 */
const serialize = (obj: Record<string, any>, prefix?: string): string => {
  const query = Object.keys(obj).map((key) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    const value = obj[key];

    return value !== null && typeof value === "object"
      ? serialize(value, fullKey)
      : `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
  });

  return query.join("&");
};
