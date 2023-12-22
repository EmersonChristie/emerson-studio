// pages/api/artworks.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchArtworks } from "../../lib/strapi/artworks";
import { Artwork } from "../../types/global";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Artwork[] | { message: string }>,
) {
  try {
    if (req.method === "GET") {
      const artworks = await fetchArtworks(1, 15);
      res.status(200).json(artworks);
    } else {
      // Handle any non-GET requests
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error fetching artworks:", error);
    res.status(500).json({ message: "Error fetching artworks" });
  }
}
