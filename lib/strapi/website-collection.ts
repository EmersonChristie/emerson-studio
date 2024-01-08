import { fetchStrapi } from ".";
import { QueryParams } from "types/global";

export const fetchWebsiteCollections = async (
  page?: number,
  pageSize?: number,
  queryParams?: QueryParams,
) => {
  try {
    const query = {
      populate: {
        artworks: {
          fields: ["title"],
          populate: {
            mainImage: {
              fields: ["url", "alternativeText"],
            },
          },
        },
      },
      fields: ["title"],
    };
    // Using fetchStrapi to fetch the data
    const data = await fetchStrapi(
      "website-collections",
      page,
      pageSize,
      queryParams || query,
    ); // Transforming the response if necessary

    return data.map((item: any) => ({
      ...item,
      artworks: item.artworks.data,
    }));
  } catch (error) {
    console.error(
      "There was a problem fetching the website collections:",
      error,
    );
    throw error;
  }
};
