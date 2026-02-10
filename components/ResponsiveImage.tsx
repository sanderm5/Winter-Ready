"use client";

import Image from "next/image";
import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: "16:9" | "4:3" | "3:2" | "1:1";
}

const aspectRatioClasses = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
};

export default function ResponsiveImage({
  src,
  alt,
  priority = false,
  className = "",
  aspectRatio = "16:9",
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <div
      className={`relative w-full ${aspectRatioClasses[aspectRatio]} ${className} overflow-hidden rounded-xl`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-ice-blue animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        unoptimized
        className={`object-cover ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        sizes="(max-width: 768px) 100vw, 672px"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
