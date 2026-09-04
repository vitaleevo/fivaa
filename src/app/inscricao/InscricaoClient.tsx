"use client";

import { IconCheck, IconTicket } from "@/components/Icon";
import { AccentBar, AfricanPattern, Badge, Divider, TribalDivider } from "@/components/BrandElements";
import PageHero from "@/components/PageHero";
import { ticketModes } from "@/lib/site";

export default function InscricaoClient() {
  return (
    <>
      <PageHero
        badge="Modalidades de acesso"
        title="Escolha o seu acesso"
        subtitle="Participe no FIVAA 2026, no Palácio de Ferro, em Luanda, nos dias 20 e 21 de novembro."
        backgroundImage="/images/hero/fivaa-experiencia.webp"
      />
      <AccentBar />
      <section className="site-grid relative overflow-hidden bg-warm-white py-20 md:py-28">
        <AfricanPattern />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge>Experiência FIVAA</Badge>
            <h2 className="mt-6 font-montserrat text-4xl font-black tracking-[-0.035em] text-green-dark sm:text-5xl">Modalidades de acesso</h2>
            <p className="mt-5 text-base leading-relaxed text-gray-medium sm:text-lg">Selecione a modalidade que melhor corresponde à sua experiência. A compra é concluída na bilheteira oficial.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {ticketModes.map((ticket) => {
              const isAvailable = ticket.purchaseUrl.length > 0;
              return (
                <article key={ticket.id} className="flex flex-col rounded-[2rem] border border-gold/20 bg-white p-8 shadow-[0_24px_70px_rgba(18,71,52,0.10)] transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gold/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-green-dark">
                    <IconTicket className="h-4 w-4 text-gold" />
                    {ticket.period}
                  </div>
                  <h3 className="mt-6 font-montserrat text-2xl font-black text-green-dark">{ticket.name}</h3>
                  <p className="mt-3 font-montserrat text-4xl font-black text-gold">{ticket.price}</p>
                  <Divider className="my-7" />
                  <p className="text-sm leading-relaxed text-gray-medium">Este bilhete dá acesso a:</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-medium">{ticket.description}</p>
                  <div className="mt-auto pt-8">
                    {isAvailable ? (
                      <a href={ticket.purchaseUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:bg-gold-metallic hover:shadow-xl hover:shadow-gold/20">
                        Adquira o seu bilhete <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <div className="rounded-full border border-gold/25 bg-gold/10 px-6 py-4 text-center font-montserrat text-sm font-bold text-green-dark">Bilheteira disponível em breve</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-[1.5rem] border border-green-dark/10 bg-cream px-6 py-5 text-center text-sm leading-relaxed text-gray-medium">
            <div className="mb-2 flex justify-center text-gold"><IconCheck className="h-5 w-5" /></div>
            Cada acesso é válido para a modalidade e dias indicados no respetivo bilhete.
          </div>
        </div>
      </section>
      <TribalDivider className="rotate-180 bg-green-dark text-warm-white" />
    </>
  );
}
