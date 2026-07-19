import { mutation } from "./_generated/server";
import { requireAdmin } from "./security";

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    // Check if speakers already exist
    const existingSpeakers = await ctx.db.query("speakers").collect();
    if (existingSpeakers.length === 0) {
      const speakers = [
        { name: "Ana Tijila", role: "Artista Plástica", country: "Angola", color: "from-gold to-orange" },
        { name: "Kabongo Tshibanda", role: "Curador de Arte", country: "RDC", color: "from-green-medium to-green-dark" },
        { name: "Maria da Luz", role: "Produtora Cultural", country: "Angola", color: "from-orange to-gold" },
        { name: "Sékou Camara", role: "Músico e Compositor", country: "Mali", color: "from-gold-metallic to-gold" },
        { name: "Ngozi Okonkwo", role: "Empreendedora Criativa", country: "Nigéria", color: "from-green-dark to-green-medium" },
        { name: "João Muteka", role: "Cineasta", country: "Angola", color: "from-orange to-gold-metallic" },
        { name: "Yara Costa", role: "Designer e Fashion Stylist", country: "Angola", color: "from-gold to-green-medium" },
        { name: "Thandiwe Banda", role: "Investigadora Cultural", country: "Zâmbia", color: "from-green-medium to-orange" },
        { name: "Carlos Ngola", role: "Fotógrafo", country: "Angola", color: "from-gold-metallic to-orange" },
        { name: "Amina Sy", role: "Galerista", country: "Senegal", color: "from-gold to-green-dark" },
        { name: "Pedro Cafuxi", role: "Músico Tradicional", country: "Angola", color: "from-orange to-gold" },
        { name: "Zola Mbeki", role: "Jornalista Cultural", country: "África do Sul", color: "from-green-dark to-gold-metallic" },
      ];
      for (const speaker of speakers) {
        await ctx.db.insert("speakers", speaker);
      }
    }

    // Tickets
    const existingTickets = await ctx.db.query("tickets").collect();
    if (existingTickets.length === 0) {
      const tickets = [
        {
          name: "Presencial",
          price: "150.000 Kz",
          desc: "Acesso completo aos 2 dias do evento no Palácio de Ferro.",
          features: ["Todas as palestras e painéis", "Workshops e masterclasses", "Exposições e feira", "Coffee breaks e almoço", "Certificado de participação"],
        },
        {
          name: "Online",
          price: "50.000 Kz",
          desc: "Acesso virtual a todas as transmissões ao vivo do evento.",
          features: ["Streaming de palestras", "Conteúdo gravado por 30 dias", "Chat com oradores", "Certificado digital"],
        },
        {
          name: "Pack Institucional",
          price: "500.000 Kz",
          desc: "Pacote premium para instituições e parceiros.",
          features: ["Acesso presencial VIP", "Jantar de gala", "Meeting com oradores", "Kit institucional", "Visita guiada à exposição", "Certificado VIP"],
        },
      ];
      for (const ticket of tickets) {
        await ctx.db.insert("tickets", ticket);
      }
    }

    // Testimonials
    const existingTestimonials = await ctx.db.query("testimonials").collect();
    if (existingTestimonials.length === 0) {
      const testimonials = [
        {
          name: "Maria Santos",
          role: "Artista Visual",
          quote: "O FIVAA transformou a minha carreira. Através dos workshops e da mentoria, consegui desenvolver um estilo próprio e receber reconhecimento internacional.",
          location: "Luanda, Angola",
        },
        {
          name: "João Silva",
          role: "Parceiro Empresarial",
          quote: "Associar a nossa marca ao FIVAA foi uma decisão estratégica. O retorno em visibilidade e networking superou todas as expectativas.",
          location: "Luanda, Angola",
        },
        {
          name: "Ana Costa",
          role: "Mentora",
          quote: "Partilhar o meu conhecimento com artistas emergentes é extremamente gratificante. O FIVAA cria um ambiente perfeito para esta troca.",
          location: "Maputo, Moçambique",
        },
        {
          name: "Pedro Mendes",
          role: "Galerista",
          quote: "O Festival Anual do FIVAA é um dos eventos culturais mais importantes da região. É onde encontro os novos talentos da arte africana.",
          location: "Johannesburg, África do Sul",
        },
        {
          name: "Lucia Fernandes",
          role: "Estudante de Arte",
          quote: "Os recursos educativos do FIVAA são incomparáveis. Aprendi mais em 6 meses do que em anos de estudo formal.",
          location: "Windhoek, Namíbia",
        },
        {
          name: "Carlos Matos",
          role: "Músico",
          quote: "A comunidade do FIVAA é como uma família. O apoio e a encorajamento que recebo são fundamentais para a minha evolução artística.",
          location: "Maputo, Moçambique",
        },
      ];
      for (const testimonial of testimonials) {
        await ctx.db.insert("testimonials", testimonial);
      }
    }

    // Schedule
    const existingSchedule = await ctx.db.query("schedule").collect();
    if (existingSchedule.length === 0) {
      const schedule = [
        { day: "20 de Novembro", time: "09:00", title: "Abertura Oficial", type: "Cerimónia" },
        { day: "20 de Novembro", time: "10:00", title: "Painel: O Futuro das Indústrias Criativas em África", type: "Painel" },
        { day: "20 de Novembro", time: "11:30", title: "Workshop: Estratégias de Preservação Cultural", type: "Workshop" },
        { day: "20 de Novembro", time: "13:00", title: "Intervalo para Almoço", type: "Pausa" },
        { day: "20 de Novembro", time: "14:30", title: "Exposição de Arte Africana Contemporânea", type: "Exposição" },
        { day: "20 de Novembro", time: "16:00", title: "Masterclass: Empreendedorismo Criativo", type: "Masterclass" },
        { day: "20 de Novembro", time: "18:00", title: "Atuação Musical ao Vivo", type: "Música" },
        { day: "20 de Novembro", time: "20:00", title: "Jantar de Networking", type: "Networking" },
        { day: "21 de Novembro", time: "09:00", title: "Painel: Arte e Tecnologia", type: "Painel" },
        { day: "21 de Novembro", time: "10:30", title: "Workshop: Curadoria e Museologia", type: "Workshop" },
        { day: "21 de Novembro", time: "12:00", title: "Apresentação de Cases de Sucesso", type: "Apresentação" },
        { day: "21 de Novembro", time: "13:00", title: "Intervalo para Almoço", type: "Pausa" },
        { day: "21 de Novembro", time: "14:30", title: "Feira de Oportunidades e Parcerias", type: "Feira" },
        { day: "21 de Novembro", time: "16:00", title: "Painel de Encerramento", type: "Painel" },
        { day: "21 de Novembro", time: "18:00", title: "Cerimónia de Encerramento", type: "Cerimónia" },
        { day: "21 de Novembro", time: "20:00", title: "Festa de Gala", type: "Música" },
      ];
      for (const item of schedule) {
        await ctx.db.insert("schedule", item);
      }
    }
  },
});
