"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  AdminPageHeader,
  AdminSearch,
  AdminSectionCard,
  AdminConfirmDialog,
  AdminToast,
  AdminLoading,
  AdminTable,
  AdminTableHead,
  AdminTableHeadCell,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminPagination,
  AdminBadge,
} from "@/components/admin/AdminUI";

const ITEMS_PER_PAGE = 10;

const emptyForm = { name: "", price: "", desc: "", features: "" };

export default function BilhetesAdmin() {
  const tickets = useQuery(api.tickets.get);
  const createTicket = useMutation(api.tickets.create);
  const updateTicket = useMutation(api.tickets.update);
  const removeTicket = useMutation(api.tickets.remove);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"tickets"> | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"tickets">; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    if (!tickets) return [];
    return tickets.filter(
      (t) =>
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.price.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase())
    );
  }, [tickets, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const parseFeatures = (raw: string) =>
    raw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Nome deve ter pelo menos 2 caracteres.";
    if (!form.price.trim()) e.price = "Preço é obrigatório.";
    if (form.desc.trim().length < 10) e.desc = "Descrição deve ter pelo menos 10 caracteres.";
    if (parseFeatures(form.features).length === 0) e.features = "Adicione pelo menos uma característica.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = {
        name: form.name.trim(),
        price: form.price.trim(),
        desc: form.desc.trim(),
        features: parseFeatures(form.features),
      };
      if (editingId) {
        await updateTicket({ id: editingId, ...data });
        setToast({ message: "Bilhete atualizado com sucesso.", type: "success" });
      } else {
        await createTicket(data);
        setToast({ message: "Bilhete adicionado com sucesso.", type: "success" });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch {
      setToast({ message: editingId ? "Erro ao atualizar bilhete." : "Erro ao adicionar bilhete.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ticket: { _id: Id<"tickets">; name: string; price: string; desc: string; features: string[] }) => {
    setEditingId(ticket._id);
    setForm({
      name: ticket.name,
      price: ticket.price,
      desc: ticket.desc,
      features: ticket.features.join("\n"),
    });
    setErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
      setEditingId(null);
    } else {
      setForm(emptyForm);
      setEditingId(null);
      setErrors({});
      setShowForm(true);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeTicket({ id: deleteTarget.id });
      setToast({ message: "Bilhete removido com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover bilhete.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  if (tickets === undefined) return <AdminLoading />;

  return (
    <div>
      <AdminPageHeader
        title="Bilhetes"
        subtitle={`${tickets.length} tipos de bilhete`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Bilhetes" },
        ]}
        action={
          <button
            onClick={toggleForm}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Bilhete
          </button>
        }
      />

      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Editar Bilhete" : "Adicionar Bilhete"}</h2>
            <button onClick={toggleForm} className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: Presencial"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Preço *</label>
              <input
                type="text"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.price ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: 150.000 Kz"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Descrição *</label>
              <input
                type="text"
                required
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.desc ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Acesso completo aos 2 dias do evento..."
              />
              {errors.desc && <p className="mt-1 text-xs text-red-500">{errors.desc}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Características * (uma por linha)</label>
              <textarea
                required
                rows={4}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.features ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder={"Todas as palestras e painéis\nWorkshops e masterclasses\nExposições e feira"}
              />
              {errors.features && <p className="mt-1 text-xs text-red-500">{errors.features}</p>}
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={toggleForm}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic disabled:opacity-50"
              >
                {loading ? "A guardar..." : editingId ? "Atualizar Bilhete" : "Adicionar Bilhete"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6">
        <AdminSearch
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por nome, preço, descrição..."
          className="w-full sm:w-72"
        />
      </div>

      <AdminSectionCard
        title={`Bilhetes (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search ? "Nenhum bilhete corresponde à pesquisa." : "Nenhum bilhete registado."}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeadCell>Bilhete</AdminTableHeadCell>
            <AdminTableHeadCell>Preço</AdminTableHeadCell>
            <AdminTableHeadCell>Descrição</AdminTableHeadCell>
            <AdminTableHeadCell>Características</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={5}>
            {paginated.map((ticket) => (
              <AdminTableRow key={ticket._id}>
                <AdminTableCell primary>
                  <div className="flex items-center gap-2">
                    <AdminBadge variant="info">{ticket.name}</AdminBadge>
                  </div>
                </AdminTableCell>
                <AdminTableCell>{ticket.price}</AdminTableCell>
                <AdminTableCell truncate maxWidth="240px">{ticket.desc}</AdminTableCell>
                <AdminTableCell>
                  <span className="text-xs text-gray-500">{ticket.features.length} itens</span>
                </AdminTableCell>
                <AdminTableCell align="right">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="rounded-md px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ id: ticket._id, name: ticket.name })}
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
        title="Remover bilhete"
        message={`Tem a certeza que deseja remover o bilhete "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
