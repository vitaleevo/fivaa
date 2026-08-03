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
  AdminPagination,
} from "@/components/admin/AdminUI";

const ITEMS_PER_PAGE = 10;

export default function MensagensAdmin() {
  const messages = useQuery(api.messages.get);
  const removeMessage = useMutation(api.messages.remove);
  const markRead = useMutation(api.messages.markRead);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!messages) return [];
    return messages.filter((msg) => {
      const matchesSearch =
        search === "" ||
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase()) ||
        msg.message.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && !msg.read) ||
        (filter === "read" && msg.read);

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  const handleMarkRead = async (id: string) => {
    try {
      await markRead({ id: id as Id<"messages"> });
      setToast({ message: "Mensagem marcada como lida.", type: "success" });
    } catch {
      setToast({ message: "Erro ao marcar mensagem.", type: "error" });
    }
  };

  const handleMarkAllRead = async () => {
    if (!messages) return;
    const unread = messages.filter((m) => !m.read);
    try {
      for (const msg of unread) {
        await markRead({ id: msg._id });
      }
      setToast({ message: `${unread.length} mensagens marcadas como lidas.`, type: "success" });
    } catch {
      setToast({ message: "Erro ao marcar mensagens.", type: "error" });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await removeMessage({ id: deleteTarget.id as Id<"messages"> });
      setToast({ message: "Mensagem removida com sucesso.", type: "success" });
      setDeleteTarget(null);
    } catch {
      setToast({ message: "Erro ao remover mensagem.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  if (messages === undefined) {
    return <AdminLoading />;
  }

  return (
    <div>
      <AdminPageHeader
        title="Mensagens"
        subtitle={`${messages.length} mensagens recebidas${unreadCount > 0 ? ` · ${unreadCount} por ler` : ""}`}
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Mensagens" },
        ]}
        action={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Marcar todas como lidas
            </button>
          ) : undefined
        }
      />

      {/* Filters & Search */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminFilterTabs
          tabs={[
            { label: "Todas", value: "all", count: messages.length },
            { label: "Por ler", value: "unread", count: unreadCount },
            { label: "Lidas", value: "read" },
          ]}
          active={filter}
          onChange={(v) => { setFilter(v); setPage(1); }}
        />
        <AdminSearch
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por nome, email..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Messages List */}
      <AdminSectionCard
        title={`Resultados (${filtered.length})`}
        empty={filtered.length === 0}
        emptyMessage={search || filter !== "all" ? "Nenhuma mensagem corresponde aos filtros." : "Nenhuma mensagem recebida."}
      >
        {filtered.length > 0 && (
          <div className="divide-y divide-gray-100">
            {paginated.map((msg) => {
              const isExpanded = expandedId === msg._id;
              return (
                <div
                  key={msg._id}
                  className={`transition-colors hover:bg-gray-50/50 ${!msg.read ? "bg-blue-50/30" : ""}`}
                >
                  <div
                    className="flex cursor-pointer items-start gap-4 px-6 py-4"
                    onClick={() => setExpandedId(isExpanded ? null : msg._id)}
                  >
                    {/* Unread dot */}
                    <div className="pt-1.5">
                      {!msg.read ? (
                        <span className="block h-2.5 w-2.5 rounded-full bg-blue-500" />
                      ) : (
                        <span className="block h-2.5 w-2.5 rounded-full bg-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-semibold text-gray-900">{msg.name}</p>
                        <AdminBadge variant={msg.read ? "default" : "warning"}>
                          {msg.read ? "Lida" : "Nova"}
                        </AdminBadge>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-400">{msg.email}</p>
                      <p className={`mt-1.5 text-sm text-gray-600 ${isExpanded ? "" : "line-clamp-2"}`}>
                        {msg.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
                        >
                          Marcar lida
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteTarget({ id: msg._id, name: msg.name })}
                        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </AdminSectionCard>

      {/* Delete Dialog */}
      <AdminConfirmDialog
        open={!!deleteTarget}
        title="Remover mensagem"
        message={`Tem a certeza que deseja remover a mensagem de "${deleteTarget?.name}"? Esta ação não pode ser desfeita.`}
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
