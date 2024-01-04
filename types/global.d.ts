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

///////// Strapi Types //////////
interface ArtworkDimensions {
  id: number;
  height: number;
  width: number;
  dimensions: string;
}

interface ArtworkPrice {
  id: number;
  price: number;
  formattedPrice: string;
}

interface ArtworkImageAttributes {
  url: string;
  alternativeText: string | null;
}

interface ArtworkImageData {
  id: number;
  attributes: ArtworkImageAttributes;
}

interface ArtworkMainImage {
  data: ArtworkImageData;
}

interface ArtworkAttributes {
  title: string;
  year: string;
  medium: string;
  genre: string;
  series: string;
  dimensions: ArtworkDimensions;
  price: ArtworkPrice;
  mainImage: ArtworkMainImage;
}

interface SimpleArtworkAttributes {
  title: string;
  year: string;
  medium: string;
  genre: string;
  series: string;
}

export interface ArtworkResponseData {
  id: number;
  attributes: ArtworkAttributes;
}

export interface SlideProps {
  image: string;
  title: string;
  slug: string;
  onClick: (slug: string) => void;
}

export interface SliderProps {
  slides: React.ReactElement<SlideProps>[];
}

///////// Home Page Slider Types //////////

export interface SliderItem {
  id: number;
  attributes: SliderAttributes;
}

export interface SliderAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  artwork: ArtworkWrapper;
  coverImage: ImageWrapper;
}

export interface ArtworkWrapper {
  data: ArtworkData;
}

interface ArtworkData {
  id: number;
  attributes: ArtworkAttributes;
}

interface ArtworkAttributes {
  title: string;
  year: string;
  medium: string;
  genre: string | null;
  series: string | null;
}

interface ImageWrapper {
  data: ImageData;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ImageAttributes {
  url: string;
  alternativeText: string | null;
}

interface MetaData {
  pagination: PaginationData;
}

interface PaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface HomePageSlideResponseData {
  data?: SliderItem[];
  meta?: MetaData;
}

declare module "lodash.debounce";
declare module "lodash.throttle";
