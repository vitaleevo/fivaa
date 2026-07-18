"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export default function Sidebar({
  title,
  links,
}: {
  title: string;
  links: SidebarLink[];
}) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 rounded-2xl border border-gold/10 bg-white p-6 shadow-lg shadow-gold/5">
      <h3 className="mb-4 font-montserrat text-lg font-bold text-green-dark">
        {title}
      </h3>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 font-montserrat text-sm font-medium transition-all duration-200",
                active
                  ? "border-l-4 border-gold bg-gradient-to-r from-gold/15 to-gold/5 text-gold shadow-sm"
                  : "border-l-4 border-transparent text-gray-medium hover:border-gold/30 hover:bg-gold/5 hover:text-gold"
              )}
            >
              {link.icon && (
                <span
                  className={cn(
                    "flex-shrink-0 transition-colors duration-200",
                    active ? "text-gold" : "text-gray-medium group-hover:text-gold"
                  )}
                >
                  {link.icon}
                </span>
              )}
              <span className="flex-1">{link.label}</span>
              {active && (
                <span className="flex h-2 w-2 rounded-full bg-gold shadow-sm shadow-gold/50" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
