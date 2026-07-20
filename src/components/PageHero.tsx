import Image from "next/image";
import { Badge } from "@/components/BrandElements";
import BreadcrumbNav from "@/components/BreadcrumbNav";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge: string;
  backgroundImage: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHero({
  title,
  subtitle,
  badge,
  backgroundImage,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-green-dark py-24 text-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="opacity-20"
          priority
          aria-hidden="true"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-green-dark/75 to-green-dark" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <div className="mb-4 flex justify-center">
            <BreadcrumbNav items={breadcrumbs} />
          </div>
        )}
        <Badge className="border-white/20 bg-white/5 text-white/80">{badge}</Badge>
        <h1 className="mt-6 font-montserrat text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl font-montserrat text-sm font-medium text-white/70 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
