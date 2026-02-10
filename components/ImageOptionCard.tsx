"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageOptionCardProps {
  label: string;
  description: string;
  imageSrc?: string;
  onClick: () => void;
}

export default function ImageOptionCard({
  label,
  description,
  imageSrc,
  onClick,
}: ImageOptionCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl overflow-hidden border-2 border-gray-200 hover:border-winter-blue hover:shadow-lg transition group"
    >
      {imageSrc && !imageError && (
        <div className="relative h-32 w-full bg-gray-100">
          <Image
            src={imageSrc}
            alt={label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 500px"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="p-4">
        <span className="font-semibold text-gray-900 group-hover:text-winter-blue">
          {label}
        </span>
        <span className="block text-sm text-gray-500">{description}</span>
      </div>
    </button>
  );
}
