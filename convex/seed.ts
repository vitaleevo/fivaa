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
          name: "Acesso Fóruns",
          price: "3.000 AKZ",
          desc: "Acesso aos workshops, showcases, palestras, exposições e masterclasses do dia escolhido.",
          features: ["1.º ou 2.º dia", "Workshops", "Showcases", "Palestras", "Exposições", "Masterclasses"],
        },
        {
          name: "Acesso Concertos",
          price: "5.000 AKZ",
          desc: "Acesso a todas as apresentações musicais do dia escolhido.",
          features: ["1.º ou 2.º dia", "Apresentações musicais"],
        },
        {
          name: "Acesso Total",
          price: "14.000 AKZ",
          desc: "Acesso completo aos fóruns e concertos dos dois dias do evento.",
          features: ["1.º e 2.º dia", "Workshops", "Showcases", "Palestras", "Exposições", "Masterclasses", "Apresentações musicais"],
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
          name: "Direção do FIVAA",
          role: "Direção Institucional",
          quote: "O FIVAA nasce para dar à arte africana o palco, a projeção e as oportunidades que merece, aproximando criadores, instituições e mercados.",
          location: "Luanda, Angola",
        },
        {
          name: "Coordenação de Parcerias",
          role: "Parcerias Estratégicas",
          quote: "Cada parceria é construída para gerar valor partilhado, ampliar o impacto cultural e criar ligações duradouras no ecossistema criativo africano.",
          location: "Luanda, Angola",
        },
        {
          name: "Curadoria do FIVAA",
          role: "Direção Artística",
          quote: "A programação reúne diferentes linguagens, gerações e territórios para celebrar a diversidade e projetar novas narrativas da arte africana.",
          location: "Luanda, Angola",
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
