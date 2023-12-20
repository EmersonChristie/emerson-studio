export interface ArtworkProps {
  id: string;
  title: string;
  artist: string;
  year: string | number;
  dimensions: string;
  mediumImage: string;
  medium: string;
  genre: string;
  price: number;
}

export interface ArtCardProps {
  id: string;
  key: string;
  title: string;
  dimensions: string;
  image: string;
}

export interface ArtworkType {
  id: number;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  genre: string;
  importanceRating: number;
  price: number;
  mainImageUrlMedium: string;
  saved: boolean;
}

export type WithChildren<T = {}> = T & { children?: ReactNode };

///////// Strapi Types //////////
export interface Artwork {
  id: number;
  title: string;
  artist?: Artist;
  year: string;
  medium: string;
  dimensions: Dimensions;
  price?: Price;
  description?: string;
  availability?: Availability;
  mainImage: any;
  genre?: "Abstract" | "Landscape" | "Seascape" | "Figurative";
  series?: string;
  featuredArtwork?: boolean;
}

export interface ArtworkCard {
  id: number;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  genre?: string;
  series?: string;
  importanceRating?: number;
  price?: number;
  imageUrl: string;
}

// Placeholder types for relations and components
// These should be replaced with actual definitions
interface Artist {
  name: string;
  mainImage?: Media;
  yearBorn?: number;
  country?: string;
}

interface Dimensions {
  height?: number;
  width?: number;
  depth?: number;
  dimensions: string;
}

interface Price {
  price?: number;
  formattedPrice: string;
}

interface Availability {
  isAvailable: boolean;
  availability?: string;
}

interface Media {
  // ... media attributes
}
