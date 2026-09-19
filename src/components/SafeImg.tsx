"use client";

import { useState } from "react";

type SafeImgProps = {
  src: string;
  alt: string;
  className?: string;
  fallback: React.ReactNode;
};

/** Plain <img> that swaps to `fallback` if the file fails to load.
 *  The error resets automatically when `src` changes. */
export default function SafeImg({ src, alt, className, fallback }: SafeImgProps) {
  const [failedFor, setFailedFor] = useState<string | null>(null);
  if (!src || failedFor === src) return <>{fallback}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailedFor(src)} />
  );
}
