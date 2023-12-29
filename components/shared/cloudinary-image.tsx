import Image from "next/image";
import React from "react";

interface CloudinaryImageProps {
  mainImageUrl: string;
  style?: React.CSSProperties;
  alt?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  priority?: boolean;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  mainImageUrl,
  style,
  alt,
  loading,
  width = 800,
  height = 800,
  priority,
}) => {
  // Function to create a blurred image URL
  const createBlurredImageUrl = (url: string): string => {
    const transformationString = "e_blur:1000,q_auto:low,w_30";
    const [baseUrl, imagePath] = url.split("/upload/");
    return `${baseUrl}/upload/${transformationString}/${imagePath}`;
  };

  const blurredImageUrl = createBlurredImageUrl(mainImageUrl);

  return (
    <Image
      src={mainImageUrl}
      alt={alt || "Image"}
      placeholder="blur"
      blurDataURL={blurredImageUrl}
      style={style}
      loading={loading}
      // You need to specify the width and height, or use layout='fill' with parent positioning
      width={width}
      height={height}
      priority={priority}
    />
  );
};

export default CloudinaryImage;
