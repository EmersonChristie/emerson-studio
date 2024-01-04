import { getSliderQuery } from "./api-query-params";
import { QueryParams } from "./api-query-params";
import { HomePageSlideResponseData } from "types/global";

/**
 * Fetches HomePageSlides from the API.
 *
 * @param page - The page number to fetch.
 * @param pageSize - The number of artworks per page.
 * @param queryParams - Optional query parameters to filter the artworks.
 * @returns A promise that resolves to an array of Artwork objects.
 * @throws An error if there was a problem fetching the artworks.
 */
export const fetchHomePageSlides = async (
  page?: number,
  pageSize?: number,
  queryParams?: QueryParams,
): Promise<HomePageSlideResponseData[]> => {
  const query = getSliderQuery(page, pageSize, queryParams);
  console.log("Query: ", query);
  const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/home-page-sliders?${query}`;
  console.log(`Fetching Home Page Slides from ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    console.log("Response OK!!!!!!!!!");
    const { data } = await response.json();
    return data;
    //   return data.map((item: HomePageSlideResponseData) => ({
    //     id: item.id,
    //     ...item.attributes,
    //   }));
  } catch (error) {
    console.error("There was a problem fetching the Home Page Slides:", error);
    throw error;
  }
};
