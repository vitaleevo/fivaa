"use client";

import { Badge, AfricanPatternDark } from "@/components/BrandElements";
import { iconMap } from "@/components/ScheduleIcons";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const typeColors: Record<string, string> = {
  "Painel": "bg-orange/10 text-orange border-orange/20",
  "Workshop": "bg-green-medium/10 text-green-medium border-green-medium/20",
  "Masterclass": "bg-gold/10 text-gold border-gold/20",
  "Exposição": "bg-gold-metallic/10 text-gold-metallic border-gold-metallic/20",
  "Música": "bg-orange/10 text-orange border-orange/20",
  "Cerimónia": "bg-gold/10 text-gold border-gold/20",
  "Networking": "bg-green-medium/10 text-green-medium border-green-medium/20",
  "Apresentação": "bg-gold/10 text-gold border-gold/20",
  "Feira": "bg-orange/10 text-orange border-orange/20",
  "Pausa": "bg-gray-medium/10 text-gray-medium border-gray-medium/20",
};

const typeColorsDark: Record<string, string> = {
  "Painel": "bg-orange/20 text-orange border-orange/30",
  "Workshop": "bg-green-medium/20 text-green-medium border-green-medium/30",
  "Masterclass": "bg-gold/20 text-gold border-gold/30",
  "Exposição": "bg-gold-metallic/20 text-gold-metallic border-gold-metallic/30",
  "Música": "bg-orange/20 text-orange border-orange/30",
  "Cerimónia": "bg-gold/20 text-gold border-gold/30",
  "Networking": "bg-green-medium/20 text-green-medium border-green-medium/30",
  "Apresentação": "bg-gold/20 text-gold border-gold/30",
  "Feira": "bg-orange/20 text-orange border-orange/30",
  "Pausa": "bg-white/10 text-white/40 border-white/20",
};

const fallbackSchedule = [
  { _id: "fallback-01", day: "20 de novembro", time: "09:00", title: "Abertura Oficial", type: "Cerimónia" },
  { _id: "fallback-02", day: "20 de novembro", time: "10:00", title: "Painel: O Futuro das Indústrias Criativas em África", type: "Painel" },
  { _id: "fallback-03", day: "20 de novembro", time: "11:30", title: "Workshop: Estratégias de Preservação Cultural", type: "Workshop" },
  { _id: "fallback-04", day: "20 de novembro", time: "13:00", title: "Intervalo para Almoço", type: "Pausa" },
  { _id: "fallback-05", day: "20 de novembro", time: "14:30", title: "Exposição de Arte Africana Contemporânea", type: "Exposição" },
  { _id: "fallback-06", day: "20 de novembro", time: "16:00", title: "Masterclass: Empreendedorismo Criativo", type: "Masterclass" },
  { _id: "fallback-07", day: "20 de novembro", time: "18:00", title: "Atuação Musical ao Vivo", type: "Música" },
  { _id: "fallback-08", day: "20 de novembro", time: "20:00", title: "Jantar de Networking", type: "Networking" },
  { _id: "fallback-09", day: "21 de novembro", time: "09:00", title: "Painel: Arte e Tecnologia", type: "Painel" },
  { _id: "fallback-10", day: "21 de novembro", time: "10:30", title: "Workshop: Curadoria e Museologia", type: "Workshop" },
  { _id: "fallback-11", day: "21 de novembro", time: "12:00", title: "Apresentação de Casos de Sucesso", type: "Apresentação" },
  { _id: "fallback-12", day: "21 de novembro", time: "13:00", title: "Intervalo para Almoço", type: "Pausa" },
  { _id: "fallback-13", day: "21 de novembro", time: "14:30", title: "Feira de Oportunidades e Parcerias", type: "Feira" },
  { _id: "fallback-14", day: "21 de novembro", time: "16:00", title: "Painel de Encerramento", type: "Painel" },
  { _id: "fallback-15", day: "21 de novembro", time: "18:00", title: "Cerimónia de Encerramento", type: "Cerimónia" },
  { _id: "fallback-16", day: "21 de novembro", time: "20:00", title: "Festa de Gala", type: "Música" },
];

export default function ProgramacaoClient() {
  const scheduleData = useQuery(api.schedule.get);
  const scheduleItems = scheduleData && scheduleData.length > 0 ? scheduleData : fallbackSchedule;

  // Group by day
  const grouped = scheduleItems.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, typeof scheduleItems>);

  const days = Object.keys(grouped).sort();

  return (
    <>
      {days.map((day, index) => {
        const isDark = index % 2 === 0;
        const items = grouped[day].sort((a, b) => a.time.localeCompare(b.time));
        
        return (
          <section key={day} className={`relative overflow-hidden py-20 ${isDark ? 'bg-green-dark' : 'bg-warm-white'}`}>
            {isDark && <AfricanPatternDark />}
            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="mb-10 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <Badge className={isDark ? "border-white/20 bg-white/5 text-white/80" : ""}>{day}</Badge>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
              </div>
              
              {items.length === 0 ? (
                <div className={`text-center py-10 ${isDark ? 'text-white/50' : 'text-gray-medium'}`}>
                  Nenhuma atividade agendada.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => {
                    const Icon = iconMap[item.type as keyof typeof iconMap];
                    return (
                      <div key={item._id} className={`group relative overflow-hidden rounded-2xl border p-6 transition-all ${
                        isDark 
                          ? 'border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold/30 hover:bg-white/10'
                          : 'border-gold/10 bg-white shadow-md shadow-gold/5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/10'
                      }`}>
                        <div className="absolute right-0 top-0 h-16 w-16 opacity-[0.05]">
                          <svg viewBox="0 0 100 100" fill="currentColor" className="text-gold">
                            <path d="M50 0L100 50L50 100L0 50Z"/>
                          </svg>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-all group-hover:bg-gold group-hover:text-green-dark">
                            {Icon && <Icon className="w-6 h-6" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="mb-1 font-montserrat text-xs font-bold text-gold">{item.time}</p>
                            <h3 className={`font-montserrat text-base font-bold leading-tight ${isDark ? 'text-white' : 'text-green-dark'}`}>{item.title}</h3>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isDark ? typeColorsDark[item.type] : typeColors[item.type]}`}>{item.type}</span>
                          <div className="h-[1px] w-0 bg-gradient-to-r from-gold to-orange transition-all group-hover:w-12" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}
      
      {days.length === 0 && (
        <section className="bg-green-dark py-20 text-center text-white/50">
          A programação será anunciada em breve.
        </section>
      )}
    </>
  );
}
