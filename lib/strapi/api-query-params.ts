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
};

/**
 * Serializes an object into a query string.
 * @param obj - The object to be serialized.
 * @param prefix - Optional prefix for the query parameters.
 * @returns The serialized query string.
 */
export const serialize = (
  obj: Record<string, any>,
  prefix?: string,
): string => {
  const query = Object.keys(obj).map((key) => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    const value = obj[key];

    return value !== null && typeof value === "object"
      ? serialize(value, fullKey)
      : `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
  });

  return query.join("&");
};

interface QueryParams {
  filters?: any; // Define more specific types as needed
  populate?: any;
  fields?: string[];
  publicationState?: string;
}

/**
 * Returns the query string for retrieving artworks with optional custom parameters.
 * @param page The page number to retrieve (default: 1)
 * @param pageSize The number of artworks per page (default: 10)
 * @param customParams Optional custom query parameters
 * @returns The serialized query string
 */
export const getArtworksQuery = (
  page: number = 1, // Default to page 1 if not provided
  pageSize: number = 10, // Default to pageSize 10 if not provided
  customParams?: QueryParams,
): string => {
  const defaultParams = artworksQueryParams;

  const finalQueryParams = {
    ...(customParams || defaultParams),
    pagination: {
      pageSize,
      page,
    },
  };

  return serialize(finalQueryParams);
};
