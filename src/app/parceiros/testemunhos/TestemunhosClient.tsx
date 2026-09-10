"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const institutionalTestimonials = {
  pt: [
    { name: "Direção do FIVAA", role: "Direção Institucional", location: "Luanda, Angola", quote: "O FIVAA nasce para dar à arte africana o palco, a projeção e as oportunidades que merece, aproximando criadores, instituições e mercados." },
    { name: "Coordenação de Parcerias", role: "Parcerias Estratégicas", location: "Luanda, Angola", quote: "Cada parceria é construída para gerar valor partilhado, ampliar o impacto cultural e criar ligações duradouras no ecossistema criativo africano." },
    { name: "Curadoria do FIVAA", role: "Direção Artística", location: "Luanda, Angola", quote: "A programação reúne diferentes linguagens, gerações e territórios para celebrar a diversidade e projetar novas narrativas da arte africana." },
  ],
  en: [
    { name: "FIVAA Board", role: "Institutional Leadership", location: "Luanda, Angola", quote: "FIVAA was created to give African art the stage, visibility, and opportunities it deserves, bringing creators, institutions, and markets together." },
    { name: "Partnership Coordination", role: "Strategic Partnerships", location: "Luanda, Angola", quote: "Every partnership is designed to create shared value, expand cultural impact, and build lasting connections across Africa's creative ecosystem." },
    { name: "FIVAA Curatorial Team", role: "Artistic Direction", location: "Luanda, Angola", quote: "The programme brings together different art forms, generations, and territories to celebrate diversity and project new narratives of African art." },
  ],
  fr: [
    { name: "Direction du FIVAA", role: "Direction institutionnelle", location: "Luanda, Angola", quote: "Le FIVAA est né pour offrir à l'art africain la scène, la visibilité et les opportunités qu'il mérite, en rapprochant créateurs, institutions et marchés." },
    { name: "Coordination des partenariats", role: "Partenariats stratégiques", location: "Luanda, Angola", quote: "Chaque partenariat vise à créer une valeur partagée, à renforcer l'impact culturel et à établir des liens durables dans l'écosystème créatif africain." },
    { name: "Équipe curatoriale du FIVAA", role: "Direction artistique", location: "Luanda, Angola", quote: "Le programme réunit différents langages artistiques, générations et territoires pour célébrer la diversité et porter de nouveaux récits de l'art africain." },
  ],
};

const deprecatedDemoNames = new Set([
  "Maria Santos",
  "João Silva",
  "Ana Costa",
  "Pedro Mendes",
  "Lucia Fernandes",
  "Carlos Matos",
]);

export default function TestemunhosClient() {
  const testemunhos = useQuery(api.testimonials.get);
  const { language } = useLanguage();

  if (testemunhos === undefined) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  const approvedTestimonials = testemunhos.filter((item) => !deprecatedDemoNames.has(item.name));
  const items = approvedTestimonials.length > 0 ? approvedTestimonials : institutionalTestimonials[language];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <div key={`${t.name}-${t.role}-${t.location}`} className="rounded-2xl border border-gold/10 bg-white p-8 shadow-md shadow-gold/5 transition-all hover:border-gold/30 hover:shadow-lg">
          <div className="mb-4 text-4xl text-gold/30">&ldquo;</div>
          <p className="mb-6 text-sm text-gray-medium italic">&ldquo;{t.quote}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange font-montserrat text-lg font-bold text-white">
              {t.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-montserrat text-sm font-bold text-green-dark">{t.name}</h4>
              <p className="text-xs text-gray-medium">{t.role}</p>
              <p className="text-xs text-gold">{t.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
