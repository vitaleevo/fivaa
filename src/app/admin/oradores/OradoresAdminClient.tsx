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

const colorOptions = [
  { value: "from-gold to-orange", label: "Ouro → Laranja", preview: "bg-gradient-to-r from-gold to-orange" },
  { value: "from-green-medium to-green-dark", label: "Verde", preview: "bg-gradient-to-r from-green-medium to-green-dark" },
  { value: "from-orange to-gold", label: "Laranja → Ouro", preview: "bg-gradient-to-r from-orange to-gold" },
  { value: "from-gold-metallic to-gold", label: "Dourado", preview: "bg-gradient-to-r from-gold-metallic to-gold" },
  { value: "from-green-dark to-green-medium", label: "Verde Escuro", preview: "bg-gradient-to-r from-green-dark to-green-medium" },
  { value: "from-orange to-gold-metallic", label: "Laranja → Metálico", preview: "bg-gradient-to-r from-orange to-gold-metallic" },
  { value: "from-gold to-green-medium", label: "Ouro → Verde", preview: "bg-gradient-to-r from-gold to-green-medium" },
];

export default function OradoresAdmin() {
  const speakers = useQuery(api.speakers.get);
  const createSpeaker = useMutation(api.speakers.create);
  const updateSpeaker = useMutation(api.speakers.update);
  const removeSpeaker = useMutation(api.speakers.remove);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"speakers"> | null>(null);
  const [form, setForm] = useState({ name: "", role: "", country: "", color: "from-gold to-orange" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"speakers">; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    if (!speakers) return [];
    return speakers.filter(
      (s) =>
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.role.toLowerCase().includes(search.toLowerCase()) ||
        s.country.toLowerCase().includes(search.toLowerCase())
    );
  }, [speakers, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Nome deve ter pelo menos 2 caracteres.";
    if (form.role.trim().length < 2) e.role = "Cargo deve ter pelo menos 2 caracteres.";
    if (form.country.trim().length < 2) e.country = "País deve ter pelo menos 2 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (editingId) {
        await updateSpeaker({ id: editingId, ...form });
        setToast({ message: "Orador atualizado com sucesso.", type: "success" });
      } else {
        await createSpeaker(form);
        setToast({ message: "Orador adicionado com sucesso.", type: "success" });
      }
      setForm({ name: "", role: "", country: "", color: "from-gold to-orange" });
      setEditingId(null);
      setShowForm(false);
    } catch {
      setToast({ message: editingId ? "Erro ao atualizar orador." : "Erro ao adicionar orador.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (speaker: { _id: Id<"speakers">; name: string; role: string; country: string; color: string }) => {
    setEditingId(speaker._id);
    setForm({ name: speaker.name, role: speaker.role, country: speaker.country, color: speaker.color });
    setErrors({});
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleForm = () => {
    if (showForm) {
      setShowForm(false);
      setEditingId(null);
    } else {
      setForm({ name: "", role: "", country: "", color: "from-gold to-orange" });
      setEditingId(null);
      setErrors({});
      setShowForm(true);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeSpeaker({ id: deleteTarget.id });
      setToast({ message: "Orador removido com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover orador.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  if (speakers === undefined) return <AdminLoading />;

  return (
    <div>
      <AdminPageHeader
        title="Oradores"
        subtitle={`${speakers.length} oradores registados`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Oradores" },
        ]}
        action={
          <button
            onClick={toggleForm}
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark transition-colors hover:bg-gold-metallic"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo Orador
          </button>
        }
      />

      {/* Create Form (collapsible) */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Editar Orador" : "Adicionar Orador"}</h2>
            <button onClick={toggleForm} className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1 ${errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
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
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1 ${errors.role ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: Artista Plástica"
              />
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">País *</label>
              <input
                type="text"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1 ${errors.country ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Ex: Angola"
              />
              {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Cor</label>
              <div className="flex items-center gap-2">
                <select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
                >
                  {colorOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className={`h-8 w-8 shrink-0 rounded-lg ${form.color}`} />
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3">
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
                {loading ? "A guardar..." : editingId ? "Atualizar Orador" : "Adicionar Orador"}
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
          placeholder="Pesquisar por nome, cargo, país..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Table */}
      <AdminSectionCard
        title={`Oradores (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search ? "Nenhum orador corresponde à pesquisa." : "Nenhum orador registado."}
      >
        <AdminTable>
          <AdminTableHead>
            <AdminTableHeadCell>Orador</AdminTableHeadCell>
            <AdminTableHeadCell>Cargo</AdminTableHeadCell>
            <AdminTableHeadCell>País</AdminTableHeadCell>
            <AdminTableHeadCell>Cor</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={5}>
            {paginated.map((speaker) => (
              <AdminTableRow key={speaker._id}>
                <AdminTableCell primary>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${speaker.color}`}>
                      {speaker.name.charAt(0)}
                    </div>
                    {speaker.name}
                  </div>
                </AdminTableCell>
                <AdminTableCell>{speaker.role}</AdminTableCell>
                <AdminTableCell>{speaker.country}</AdminTableCell>
                <AdminTableCell>
                  <div className={`h-6 w-10 rounded-md ${speaker.color}`} />
                </AdminTableCell>
                <AdminTableCell align="right">
                  <button
                    onClick={() => handleEdit(speaker)}
                    className="rounded-md px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setDeleteTarget({ id: speaker._id, name: speaker.name })}
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
        title="Remover orador"
        message={`Tem a certeza que deseja remover "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />

      {toast && <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
