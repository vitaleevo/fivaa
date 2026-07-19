import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavItem {
  label: string;
  href?: string;
}

export default function BreadcrumbNav({ items }: { items: BreadcrumbNavItem[] }) {
  return (
    <Breadcrumb className="mb-8 font-montserrat text-sm text-gray-medium">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" className="transition-colors hover:text-gold" />}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item) => (
          <React.Fragment key={item.label}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink render={<Link href={item.href} className="transition-colors hover:text-gold" />}>
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-medium text-green-dark">
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
