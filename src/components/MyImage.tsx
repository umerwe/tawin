"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface MyImageProps extends ImageProps {
  fallbackSrc?: string;
}

const MyImage = ({
  src,
  alt,
  fallbackSrc = "/fallback.png",
  className,
  fill,
  ...props
}: MyImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
  }, [src]);

  const imageEl = (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill={fill}
      onLoadingComplete={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
      }}
      className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
    />
  );

  // When fill is used, the parent is already positioned — no wrapper needed
  if (fill) {
    return imageEl;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Shimmer Loader */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size[200%_100%] shimmer" />
      )}
      {imageEl}
    </div>
  );
};

export default MyImage;