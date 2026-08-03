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
} from "@/components/admin/AdminUI";

const ITEMS_PER_PAGE = 10;

export default function TestemunhosAdmin() {
  const testemunhos = useQuery(api.testimonials.get);
  const createTestemunho = useMutation(api.testimonials.create);
  const removeTestemunho = useMutation(api.testimonials.remove);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", location: "", quote: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"testimonials">; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    if (!testemunhos) return [];
    return testemunhos.filter(
      (t) =>
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.role.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase()) ||
        t.quote.toLowerCase().includes(search.toLowerCase())
    );
  }, [testemunhos, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Nome deve ter pelo menos 2 caracteres.";
    if (form.role.trim().length < 2) e.role = "Cargo deve ter pelo menos 2 caracteres.";
    if (form.location.trim().length < 2) e.location = "Localização deve ter pelo menos 2 caracteres.";
    if (form.quote.trim().length < 10) e.quote = "Citação deve ter pelo menos 10 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createTestemunho(form);
      setForm({ name: "", role: "", location: "", quote: "" });
      setShowForm(false);
      setToast({ message: "Testemunho adicionado com sucesso.", type: "success" });
    } catch {
      setToast({ message: "Erro ao adicionar testemunho.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeTestemunho({ id: deleteTarget.id });
      setToast({ message: "Testemunho removido com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover testemunho.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  if (testemunhos === undefined) return <AdminLoading />;

  return (
    <div>
      <AdminPageHeader
        title="Testemunhos"
        subtitle={`${testemunhos.length} testemunhos registados`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Testemunhos" },
        ]}
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Testemunho
          </button>
        }
      />

      {/* Create Form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Adicionar Testemunho</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
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
                placeholder="Nome completo"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Cargo *</label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.role ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: Artista Visual"
              />
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Localização *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.location ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: Luanda, Angola"
              />
              {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Citação *</label>
              <textarea
                required
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-1 ${errors.quote ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="O testemunho do participante..."
              />
              <div className="mt-1 flex justify-between">
                {errors.quote ? (
                  <p className="text-xs text-red-500">{errors.quote}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-gray-400">{form.quote.length}/600</span>
              </div>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
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
                {loading ? "A adicionar..." : "Adicionar Testemunho"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <AdminSearch
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por nome, cargo, localização..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Table */}
      <AdminSectionCard
        title={`Testemunhos (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search ? "Nenhum testemunho corresponde à pesquisa." : "Nenhum testemunho registado."}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeadCell>Autor</AdminTableHeadCell>
            <AdminTableHeadCell>Localização</AdminTableHeadCell>
            <AdminTableHeadCell>Citação</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={4}>
            {paginated.map((item) => (
              <AdminTableRow key={item._id}>
                <AdminTableCell primary>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </AdminTableCell>
                <AdminTableCell>{item.location}</AdminTableCell>
                <AdminTableCell truncate maxWidth="300px">
                  <span className="italic">&ldquo;{item.quote}&rdquo;</span>
                </AdminTableCell>
                <AdminTableCell align="right">
                  <button
                    onClick={() => setDeleteTarget({ id: item._id, name: item.name })}
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
        title="Remover testemunho"
        message={`Tem a certeza que deseja remover o testemunho de "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
