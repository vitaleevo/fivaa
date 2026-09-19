"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  AdminPageHeader,
  AdminSearch,
  AdminFilterTabs,
  AdminSectionCard,
  AdminConfirmDialog,
  AdminToast,
  AdminBadge,
  AdminLoading,
  AdminTable,
  AdminTableHead,
  AdminTableHeadCell,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminPagination,
} from "@/components/admin/AdminUI";

const ITEMS_PER_PAGE = 10;

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

export default function InscricoesAdmin() {
  const registrations = useQuery(api.registrations.get);
  const tickets = useQuery(api.tickets.get);
  const removeRegistration = useMutation(api.registrations.remove);
  const updateStatus = useMutation(api.registrations.updateStatus);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"registrations">; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusTarget, setStatusTarget] = useState<{ id: Id<"registrations">; name: string; status: "pending" | "confirmed" | "cancelled" } | null>(null);
  const [motive, setMotive] = useState("");

  const ticketMap = useMemo(() => {
    if (!tickets) return new Map();
    return new Map(tickets.map((t) => [t._id, t.name]));
  }, [tickets]);

  const filtered = useMemo(() => {
    if (!registrations) return [];
    return registrations.filter((reg) => {
      const matchesSearch =
        search === "" ||
        reg.name.toLowerCase().includes(search.toLowerCase()) ||
        reg.email.toLowerCase().includes(search.toLowerCase()) ||
        reg.country.toLowerCase().includes(search.toLowerCase()) ||
        (reg.org && reg.org.toLowerCase().includes(search.toLowerCase()));

      const ticketName = ticketMap.get(reg.ticketId) ?? "";
      const matchesTicketFilter =
        filter === "all" ||
        (filter === "presencial" && ticketName.toLowerCase().includes("presencial")) ||
        (filter === "online" && ticketName.toLowerCase().includes("online")) ||
        (filter === "institucional" && ticketName.toLowerCase().includes("institucional"));

      const matchesStatusFilter =
        filter === "pending" ||
        filter === "confirmed" ||
        filter === "cancelled"
          ? reg.status === filter
          : true;

      return matchesSearch && matchesTicketFilter && matchesStatusFilter;
    });
  }, [registrations, search, filter, ticketMap]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeRegistration({ id: deleteTarget.id });
      setToast({ message: "Inscrição removida com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover inscrição.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async () => {
    if (!statusTarget) return;
    if (statusTarget.status === "cancelled" && !motive.trim()) {
      setToast({ message: "Indique o motivo do cancelamento.", type: "error" });
      return;
    }
    setStatusUpdating(true);
    try {
      const result = await updateStatus({ id: statusTarget.id, status: statusTarget.status, motive: motive.trim() });
      setToast({
        message: result.notified
          ? `Inscrição ${statusLabels[statusTarget.status].toLowerCase()} e email enviado ao cliente.`
          : `Inscrição marcada como ${statusLabels[statusTarget.status]}.`,
        type: "success",
      });
      setStatusTarget(null);
      setMotive("");
    } catch {
      setToast({ message: "Erro ao atualizar estado.", type: "error" });
    } finally {
      setStatusUpdating(false);
    }
  };

  if (registrations === undefined || tickets === undefined) {
    return <AdminLoading />;
  }

  return (
    <div>
      <AdminPageHeader
        title="Inscrições"
        subtitle={`${registrations.length} inscrições registadas`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Inscrições" },
        ]}
      />

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminFilterTabs
          tabs={[
            { label: "Todas", value: "all", count: registrations.length },
            { label: "Presencial", value: "presencial" },
            { label: "Online", value: "online" },
            { label: "Institucional", value: "institucional" },
            { label: "Pendentes", value: "pending" },
            { label: "Confirmadas", value: "confirmed" },
            { label: "Canceladas", value: "cancelled" },
          ]}
          active={filter}
          onChange={(v) => { setFilter(v); setPage(1); }}
        />
        <AdminSearch
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por nome, email, país..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total", value: registrations.length, color: "text-gray-900" },
          { label: "Pendentes", value: registrations.filter((r) => r.status === "pending").length, color: "text-amber-600" },
          { label: "Confirmadas", value: registrations.filter((r) => r.status === "confirmed").length, color: "text-emerald-600" },
          { label: "Canceladas", value: registrations.filter((r) => r.status === "cancelled").length, color: "text-red-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-xs font-medium text-gray-500">{stat.label}</p>
            <p className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <AdminSectionCard
        title={`Resultados (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search || filter !== "all" ? "Nenhuma inscrição corresponde aos filtros." : "Nenhuma inscrição ainda."}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeadCell>Nome</AdminTableHeadCell>
            <AdminTableHeadCell>Email</AdminTableHeadCell>
            <AdminTableHeadCell>Telefone</AdminTableHeadCell>
            <AdminTableHeadCell>País</AdminTableHeadCell>
            <AdminTableHeadCell>Bilhete</AdminTableHeadCell>
            <AdminTableHeadCell>Anexos</AdminTableHeadCell>
            <AdminTableHeadCell>Estado</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={8}>
            {paginated.map((reg) => (
              <AdminTableRow key={reg._id}>
                <AdminTableCell primary>{reg.name}</AdminTableCell>
                <AdminTableCell>{reg.email}</AdminTableCell>
                <AdminTableCell>{reg.phone}</AdminTableCell>
                <AdminTableCell>{reg.country}</AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant="info">{ticketMap.get(reg.ticketId) ?? "—"}</AdminBadge>
                </AdminTableCell>
                <AdminTableCell>
                  <div className="flex items-center gap-2">
                    {reg.resolvedPhotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={reg.resolvedPhotoUrl} alt={reg.name} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-700">sem foto</span>
                    )}
                    {reg.resolvedPaymentUrl ? (
                      <a href={reg.resolvedPaymentUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-green-dark underline underline-offset-2">
                        comprovativo
                      </a>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-bold text-amber-700">sem comprovativo</span>
                    )}
                  </div>
                </AdminTableCell>
                <AdminTableCell>
                  <select
                    value={reg.status}
                    disabled={statusUpdating}
                    onChange={(e) => {
                      const next = e.target.value as "pending" | "confirmed" | "cancelled";
                      if (next === reg.status) {
                        setToast({ message: `A inscrição já está ${statusLabels[reg.status].toLowerCase()}.`, type: "info" });
                        return;
                      }
                      setStatusTarget({ id: reg._id, name: reg.name, status: next });
                      setMotive("");
                    }}
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20 disabled:opacity-50"
                    aria-label={`Estado da inscrição de ${reg.name}`}
                  >
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                </AdminTableCell>
                <AdminTableCell align="right">
                  <button
                    onClick={() => setDeleteTarget({ id: reg._id, name: reg.name })}
                    className="rounded-md px-2 py-1 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    Remover
                  </button>
                </AdminTableCell>
              </AdminTableRow>
            ))}
          </AdminTableBody>
        </AdminTable>
        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminSectionCard>

      {/* Status Dialog */}
      {statusTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setStatusTarget(null)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900">
              Marcar como {statusLabels[statusTarget.status].toLowerCase()}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {statusTarget.name} vai receber um email com esta decisão.
              {statusTarget.status === "cancelled" ? " O motivo é obrigatório." : ""}
            </p>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Motivo{statusTarget.status === "cancelled" ? " *" : " (opcional)"}
            </label>
            <textarea
              value={motive}
              maxLength={500}
              rows={3}
              onChange={(e) => setMotive(e.target.value)}
              placeholder={statusTarget.status === "cancelled" ? "Ex: comprovativo ilegível, pagamento em falta..." : "Mensagem adicional para o cliente..."}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setStatusTarget(null)}
                disabled={statusUpdating}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Voltar
              </button>
              <button
                onClick={handleStatusChange}
                disabled={statusUpdating}
                className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic disabled:opacity-50"
              >
                {statusUpdating ? "A processar..." : "Confirmar e enviar email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        title="Remover inscrição"
        message={`Tem a certeza que deseja remover a inscrição de "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

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
