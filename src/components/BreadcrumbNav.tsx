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
        <BreadcrumbSeparator />
        {items.map((item, i) => (
          <BreadcrumbItem key={item.label}>
            {item.href ? (
              <>
                <BreadcrumbLink render={<Link href={item.href} className="transition-colors hover:text-gold" />}>
                  {item.label}
                </BreadcrumbLink>
                {i < items.length - 1 && <BreadcrumbSeparator />}
              </>
            ) : (
              <BreadcrumbPage className="font-medium text-green-dark">
                {item.label}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
