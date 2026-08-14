"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { AdminCard, AdminSectionCard, AdminBadge, AdminLoading, AdminTable, AdminTableHead, AdminTableHeadCell, AdminTableBody, AdminTableRow, AdminTableCell, AdminToast } from "@/components/admin/AdminUI";

const quickLinks = [
  { href: "/admin/inscricoes", label: "Inscrições", color: "bg-blue-50 text-blue-600" },
  { href: "/admin/mensagens", label: "Mensagens", color: "bg-amber-50 text-amber-600" },
  { href: "/admin/bilhetes", label: "Bilhetes", color: "bg-teal-50 text-teal-600" },
  { href: "/admin/oradores", label: "Oradores", color: "bg-purple-50 text-purple-600" },
  { href: "/admin/programacao", label: "Programação", color: "bg-emerald-50 text-emerald-600" },
  { href: "/admin/testemunhos", label: "Testemunhos", color: "bg-pink-50 text-pink-600" },
];

const quickLinkIcons: Record<string, React.ReactNode> = {
  "/admin/inscricoes": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  ),
  "/admin/mensagens": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  "/admin/bilhetes": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  ),
  "/admin/oradores": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  "/admin/programacao": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  "/admin/testemunhos": (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
    </svg>
  ),
};

export default function AdminDashboard() {
  const registrations = useQuery(api.registrations.get);
  const messages = useQuery(api.messages.get);
  const speakers = useQuery(api.speakers.get);
  const tickets = useQuery(api.tickets.get);
  const schedule = useQuery(api.schedule.get);
  const runSeed = useMutation(api.seed.run);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await runSeed({});
      setToast({ message: "Dados de demonstração carregados com sucesso.", type: "success" });
    } catch {
      setToast({ message: "Erro ao carregar dados de demonstração.", type: "error" });
    } finally {
      setSeeding(false);
    }
  };

  if (registrations === undefined || messages === undefined || speakers === undefined || tickets === undefined || schedule === undefined) {
    return <AdminLoading />;
  }

  const unreadMessages = messages.filter((m) => !m.read).length;
  const totalRegistrations = registrations.length;
  const totalSpeakers = speakers.length;
  const totalSchedule = schedule.length;
  const totalTickets = tickets.length;

  const recentRegistrations = [...registrations].slice(-5).reverse();
  const recentMessages = [...messages].slice(-5).reverse();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visão geral do FIVAA 2026 — Palácio de Ferro, Luanda
          </p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {seeding ? "A carregar…" : "Carregar dados de demonstração"}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminCard
          title="Inscrições"
          value={totalRegistrations}
          subtitle="Total de registos"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
          }
        />
        <AdminCard
          title="Mensagens"
          value={unreadMessages}
          subtitle={`${messages.length} total · ${unreadMessages} por ler`}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        />
        <AdminCard
          title="Oradores"
          value={totalSpeakers}
          subtitle="Registados no sistema"
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />
        <AdminCard
          title="Programação"
          value={totalSchedule}
          subtitle={`${totalTickets} tipos de bilhete`}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Acesso rápido</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${link.color}`}>
                {quickLinkIcons[link.href]}
              </span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gold">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Two columns: Recent Registrations + Recent Messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Registrations */}
        <AdminSectionCard
          title="Inscrições recentes"
          action={
            <Link href="/admin/inscricoes" className="text-sm font-medium text-gold hover:text-gold-metallic">
              Ver todas &rarr;
            </Link>
          }
          empty={recentRegistrations.length === 0}
          emptyMessage="Nenhuma inscrição ainda."
        >
          <AdminTable>
            <AdminTableHead>
              <AdminTableHeadCell>Nome</AdminTableHeadCell>
              <AdminTableHeadCell>Bilhete</AdminTableHeadCell>
              <AdminTableHeadCell>País</AdminTableHeadCell>
            </AdminTableHead>
            <AdminTableBody empty={recentRegistrations.length === 0}>
              {recentRegistrations.map((reg) => {
                const ticket = tickets.find((t) => t._id === reg.ticketId);
                return (
                  <AdminTableRow key={reg._id}>
                    <AdminTableCell primary>{reg.name}</AdminTableCell>
                    <AdminTableCell>
                      <AdminBadge variant="info">{ticket?.name ?? "—"}</AdminBadge>
                    </AdminTableCell>
                    <AdminTableCell>{reg.country}</AdminTableCell>
                  </AdminTableRow>
                );
              })}
            </AdminTableBody>
          </AdminTable>
        </AdminSectionCard>

        {/* Recent Messages */}
        <AdminSectionCard
          title="Mensagens recentes"
          action={
            <Link href="/admin/mensagens" className="text-sm font-medium text-gold hover:text-gold-metallic">
              Ver todas &rarr;
            </Link>
          }
          empty={recentMessages.length === 0}
          emptyMessage="Nenhuma mensagem recebida."
        >
          <AdminTable>
            <AdminTableHead>
              <AdminTableHeadCell>Status</AdminTableHeadCell>
              <AdminTableHeadCell>Remetente</AdminTableHeadCell>
              <AdminTableHeadCell>Mensagem</AdminTableHeadCell>
            </AdminTableHead>
            <AdminTableBody empty={recentMessages.length === 0}>
              {recentMessages.map((msg) => (
                <AdminTableRow key={msg._id} highlight={!msg.read}>
                  <AdminTableCell>
                    {msg.read ? (
                      <AdminBadge>Lida</AdminBadge>
                    ) : (
                      <AdminBadge variant="warning">Nova</AdminBadge>
                    )}
                  </AdminTableCell>
                  <AdminTableCell primary>{msg.name}</AdminTableCell>
                  <AdminTableCell truncate maxWidth="200px">{msg.message}</AdminTableCell>
                </AdminTableRow>
              ))}
            </AdminTableBody>
          </AdminTable>
        </AdminSectionCard>
      </div>

      {/* Event Info */}
      <div className="mt-8 rounded-xl border border-gold/20 bg-gold/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold">FIVAA 2026</h3>
            <p className="mt-1 text-sm text-gray-600">
              20–21 Novembro · Palácio de Ferro · Luanda, Angola
            </p>
          </div>
          <a
            href="https://fivaaforum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-medium"
          >
            Ver site ao vivo
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <AdminToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
