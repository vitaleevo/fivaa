"use client";

import Link from "next/link";

type FlipLinkProps = {
  href: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

/** Link for use inside server-rendered flip faces: stops the click from
 *  reaching the flip container (server components cannot pass onClick
 *  directly to Link). */
export default function FlipLink({ href, className, ariaLabel, children }: FlipLinkProps) {
  return (
    <Link
      href={href}
      onClick={(e) => e.stopPropagation()}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
