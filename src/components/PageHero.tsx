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

export default function PageHero({ title, subtitle, badge, backgroundImage, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-green-dark py-24 text-center text-white sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image src={backgroundImage} alt="" fill sizes="100vw" className="opacity-30" priority style={{ objectFit: "cover", objectPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-green-dark/75 to-green-dark" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(253,184,19,0.16),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <div className="mb-7 flex justify-center">
            <BreadcrumbNav items={breadcrumbs} />
          </div>
        )}
        <Badge className="border-white/20 bg-white/10 text-white/85">{badge}</Badge>
        <h1 className="mt-6 font-montserrat text-4xl font-black leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-5 max-w-2xl font-montserrat text-base font-medium leading-relaxed text-white/75 sm:text-lg">{subtitle}</p>}
        <div className="mx-auto mt-8 h-1 w-16 bg-gradient-to-r from-gold to-orange" aria-hidden="true" />
      </div>
    </section>
  );
}
