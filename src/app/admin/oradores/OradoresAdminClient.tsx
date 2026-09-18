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

const CATEGORIES = ["Orador", "Palestrante", "Artista", "Moderador", "Convidado", "Outro"] as const;

const colorOptions = [
  { value: "from-gold to-orange", label: "Ouro → Laranja", preview: "bg-gradient-to-r from-gold to-orange" },
  { value: "from-green-medium to-green-dark", label: "Verde", preview: "bg-gradient-to-r from-green-medium to-green-dark" },
  { value: "from-orange to-gold", label: "Laranja → Ouro", preview: "bg-gradient-to-r from-orange to-gold" },
  { value: "from-gold-metallic to-gold", label: "Dourado", preview: "bg-gradient-to-r from-gold-metallic to-gold" },
  { value: "from-green-dark to-green-medium", label: "Verde Escuro", preview: "bg-gradient-to-r from-green-dark to-green-medium" },
  { value: "from-orange to-gold-metallic", label: "Laranja → Metálico", preview: "bg-gradient-to-r from-orange to-gold-metallic" },
  { value: "from-gold to-green-medium", label: "Ouro → Verde", preview: "bg-gradient-to-r from-gold to-green-medium" },
];

type FormState = {
  name: string;
  role: string;
  country: string;
  color: string;
  bio: string;
  category: string;
  photoStorageId?: Id<"_storage">;
  photoPreview: string;
};

const emptyForm: FormState = {
  name: "",
  role: "",
  country: "",
  color: "from-gold to-orange",
  bio: "",
  category: "Orador",
  photoStorageId: undefined,
  photoPreview: "",
};

export default function OradoresAdmin() {
  const speakers = useQuery(api.speakers.get);
  const createSpeaker = useMutation(api.speakers.create);
  const updateSpeaker = useMutation(api.speakers.update);
  const removeSpeaker = useMutation(api.speakers.remove);
  const generateUploadUrl = useMutation(api.speakers.generateUploadUrl);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"speakers"> | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ id: Id<"speakers">; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = useMemo(() => {
    if (!speakers) return [];
    const q = search.toLowerCase();
    return speakers.filter(
      (s) =>
        search === "" ||
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        (s.category ?? "").toLowerCase().includes(q) ||
        (s.bio ?? "").toLowerCase().includes(q)
    );
  }, [speakers, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Nome deve ter pelo menos 2 caracteres.";
    if (form.role.trim().length < 2) e.role = "Cargo deve ter pelo menos 2 caracteres.";
    if (form.country.trim().length < 2) e.country = "País deve ter pelo menos 2 caracteres.";
    if (form.bio.trim().length > 500) e.bio = "Biografia deve ter no máximo 500 caracteres.";
    if (!CATEGORIES.includes(form.category as (typeof CATEGORIES)[number])) e.category = "Categoria inválida.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePhoto = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast({ message: "Escolha uma imagem JPG/PNG.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: "Imagem deve ter no máximo 5MB.", type: "error" });
      return;
    }
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({});
      const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error("upload failed");
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      setForm((f) => ({ ...f, photoStorageId: storageId, photoPreview: URL.createObjectURL(file) }));
    } catch {
      setToast({ message: "Erro ao enviar foto.", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setForm((f) => ({ ...f, photoStorageId: undefined, photoPreview: "" }));
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        role: form.role,
        country: form.country,
        color: form.color,
        bio: form.bio,
        category: form.category,
        photoStorageId: form.photoStorageId,
      };
      if (editingId) {
        await updateSpeaker({ id: editingId, ...payload });
        setToast({ message: "Orador atualizado com sucesso.", type: "success" });
      } else {
        await createSpeaker(payload);
        setToast({ message: "Orador adicionado com sucesso.", type: "success" });
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
    } catch {
      setToast({ message: editingId ? "Erro ao atualizar orador." : "Erro ao adicionar orador.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (speaker: {
    _id: Id<"speakers">;
    name: string;
    role: string;
    country: string;
    color: string;
    bio?: string;
    category?: string;
    photoStorageId?: Id<"_storage">;
    resolvedPhotoUrl?: string | null;
    photoUrl?: string;
  }) => {
    setEditingId(speaker._id);
    setForm({
      name: speaker.name,
      role: speaker.role,
      country: speaker.country,
      color: speaker.color,
      bio: speaker.bio ?? "",
      category: speaker.category ?? "Orador",
      photoStorageId: speaker.photoStorageId,
      photoPreview: speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? "",
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
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Foto</label>
              <div className="flex items-center gap-3">
                {form.photoPreview ? (
                  <img src={form.photoPreview} alt="Pré-visualização" className="h-14 w-14 rounded-full object-cover" />
                ) : (
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white bg-gradient-to-r ${form.color}`}>
                    {form.name.charAt(0) || "?"}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {uploading ? "A enviar..." : "Escolher foto"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => handlePhoto(e.target.files?.[0])}
                    />
                  </label>
                  {form.photoPreview && (
                    <button type="button" onClick={handleRemovePhoto} className="text-xs text-red-500 hover:text-red-700">
                      Remover foto
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-400">JPG/PNG até 5MB. Aparece logo no site.</p>
            </div>
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
              <label className="mb-1 block text-sm font-medium text-gray-700">Categoria *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Cor (fallback sem foto)</label>
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
                <div className={`h-8 w-8 shrink-0 rounded-lg bg-gradient-to-r ${form.color}`} />
              </div>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Biografia <span className="font-normal text-gray-400">({form.bio.length}/500)</span>
              </label>
              <textarea
                value={form.bio}
                maxLength={500}
                rows={3}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-1 ${errors.bio ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:border-gold focus:ring-gold/20"}`}
                placeholder="Breve biografia visível no site..."
              />
              {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio}</p>}
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={toggleForm}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
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
          placeholder="Pesquisar por nome, cargo, país, categoria..."
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
            <AdminTableHeadCell>Categoria</AdminTableHeadCell>
            <AdminTableHeadCell align="right">Ações</AdminTableHeadCell>
          </AdminTableHead>
          <AdminTableBody empty={filtered.length === 0} emptyColSpan={5}>
            {paginated.map((speaker) => {
              const photo = speaker.resolvedPhotoUrl ?? speaker.photoUrl ?? null;
              return (
                <AdminTableRow key={speaker._id}>
                  <AdminTableCell primary>
                    <div className="flex items-center gap-3">
                      {photo ? (
                        <img src={photo} alt={speaker.name} className="h-9 w-9 shrink-0 rounded-full object-cover" />
                      ) : (
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white bg-gradient-to-r ${speaker.color}`}>
                          {speaker.name.charAt(0)}
                        </div>
                      )}
                      <span>{speaker.name}</span>
                    </div>
                  </AdminTableCell>
                  <AdminTableCell>{speaker.role}</AdminTableCell>
                  <AdminTableCell>{speaker.country}</AdminTableCell>
                  <AdminTableCell>{speaker.category ?? "—"}</AdminTableCell>
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
              );
            })}
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
