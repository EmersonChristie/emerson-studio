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
  liked: boolean;
}
