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

const statusVariant: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
};

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
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

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

  const handleStatusChange = async (id: Id<"registrations">, status: string) => {
    setStatusUpdating(true);
    try {
      await updateStatus({ id, status: status as "pending" | "confirmed" | "cancelled" });
      setToast({ message: `Inscrição marcada como ${statusLabels[status]}.`, type: "success" });
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
            <AdminTableHeadCell>Estado</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={7}>
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
                  <select
                    value={reg.status}
                    disabled={statusUpdating}
                    onChange={(e) => handleStatusChange(reg._id, e.target.value)}
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
