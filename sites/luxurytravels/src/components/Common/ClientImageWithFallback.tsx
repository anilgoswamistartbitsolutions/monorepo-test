"use client";
import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ClientImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export default function ClientImageWithFallback({
  fallbackSrc,
  src,
  alt,
  ...rest
}: ClientImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error && fallbackSrc ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
