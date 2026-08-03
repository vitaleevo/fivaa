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

const typeOptions = [
  "Painel",
  "Workshop",
  "Masterclass",
  "Exposição",
  "Música",
  "Cerimónia",
  "Networking",
  "Apresentação",
  "Feira",
  "Pausa",
];

const dayOptions = ["20 de Novembro", "21 de Novembro"];

const typeBadgeVariant: Record<string, "default" | "success" | "warning" | "danger" | "info"> = {
  Painel: "info",
  Workshop: "success",
  Masterclass: "warning",
  "Exposição": "default",
  Música: "danger",
  Cerimónia: "warning",
  Networking: "success",
  Apresentação: "info",
  Feira: "default",
  Pausa: "default",
};

export default function ProgramacaoAdmin() {
  const schedule = useQuery(api.schedule.get);
  const createSchedule = useMutation(api.schedule.create);
  const removeSchedule = useMutation(api.schedule.remove);

  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ day: "20 de Novembro", time: "", title: "", type: "Painel" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"schedule">; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    if (!schedule) return [];
    return schedule.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.time.includes(search) ||
        item.type.toLowerCase().includes(search.toLowerCase());

      const matchesDay = dayFilter === "all" || item.day === dayFilter;

      return matchesSearch && matchesDay;
    });
  }, [schedule, search, dayFilter]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => a.time.localeCompare(b.time)), [filtered]);
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.time.trim()) e.time = "Hora é obrigatória.";
    else if (!/^\d{2}:\d{2}$/.test(form.time.trim())) e.time = "Formato: HH:MM";
    if (form.title.trim().length < 3) e.title = "Título deve ter pelo menos 3 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createSchedule({ ...form, time: form.time.trim(), title: form.title.trim() });
      setForm({ ...form, time: "", title: "" });
      setShowForm(false);
      setToast({ message: "Evento adicionado com sucesso.", type: "success" });
    } catch {
      setToast({ message: "Erro ao adicionar evento.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeSchedule({ id: deleteTarget.id });
      setToast({ message: "Evento removido com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover evento.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  if (schedule === undefined) return <AdminLoading />;

  const dayCounts = schedule.reduce(
    (acc, item) => {
      acc[item.day] = (acc[item.day] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      <AdminPageHeader
        title="Programação"
        subtitle={`${schedule.length} eventos agendados`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Programação" },
        ]}
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Evento
          </button>
        }
      />

      {/* Create Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Adicionar Evento</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Dia *</label>
              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Hora *</label>
              <input
                type="text"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="09:00"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.time ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
              />
              {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Título *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Nome do evento"
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.title ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tipo *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
              >
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic disabled:opacity-50"
              >
                {loading ? "A adicionar..." : "Adicionar Evento"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminFilterTabs
          tabs={[
            { label: "Todos", value: "all", count: schedule.length },
            ...dayOptions.map((d) => ({ label: d.replace(" de Novembro", ""), value: d, count: dayCounts[d] || 0 })),
          ]}
          active={dayFilter}
          onChange={(v) => { setDayFilter(v); setPage(1); }}
        />
        <AdminSearch
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por título, tipo..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Table */}
      <AdminSectionCard
        title={`Eventos (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search || dayFilter !== "all" ? "Nenhum evento corresponde aos filtros." : "Nenhum evento agendado."}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeadCell>Hora</AdminTableHeadCell>
            <AdminTableHeadCell>Título</AdminTableHeadCell>
            <AdminTableHeadCell>Tipo</AdminTableHeadCell>
            <AdminTableHeadCell>Dia</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={5}>
            {paginated.map((item) => (
              <AdminTableRow key={item._id}>
                <AdminTableCell primary>{item.time}</AdminTableCell>
                <AdminTableCell>{item.title}</AdminTableCell>
                <AdminTableCell>
                  <AdminBadge variant={typeBadgeVariant[item.type] || "default"}>{item.type}</AdminBadge>
                </AdminTableCell>
                <AdminTableCell>{item.day}</AdminTableCell>
                <AdminTableCell align="right">
                  <button
                    onClick={() => setDeleteTarget({ id: item._id, title: item.title })}
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

      <AdminConfirmDialog
        open={!!deleteTarget}
        title="Remover evento"
        message={`Tem a certeza que deseja remover "${deleteTarget?.title}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
