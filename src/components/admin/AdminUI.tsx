"use client";

import { cn } from "@/lib/utils";

/* ─── Stat Card ─── */
interface AdminCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function AdminCard({ title, value, subtitle, icon, trend, className }: AdminCardProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md", className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-gray-400">{subtitle}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend.value >= 0 ? "text-emerald-600" : "text-red-500"
                )}
              >
                {trend.value >= 0 ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ─── Section Card ─── */
interface AdminSectionCardProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  empty?: boolean;
  emptyMessage?: string;
}

export function AdminSectionCard({ title, action, children, className, empty, emptyMessage }: AdminSectionCardProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white shadow-sm", className)}>
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {action}
      </div>
      {empty ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-gray-400">{emptyMessage || "Nenhum registo encontrado."}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/* ─── Search Input ─── */
interface AdminSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AdminSearch({ value, onChange, placeholder, className }: AdminSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Pesquisar..."}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gold focus:bg-white focus:ring-1 focus:ring-gold/20"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Limpar pesquisa"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Filter Tabs ─── */
interface FilterTab {
  label: string;
  value: string;
  count?: number;
}

interface AdminFilterTabsProps {
  tabs: FilterTab[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function AdminFilterTabs({ tabs, active, onChange, className }: AdminFilterTabsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1 rounded-lg bg-gray-100 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
            active === tab.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                active === tab.value ? "bg-gold/15 text-gold" : "bg-gray-200 text-gray-500"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Page Header ─── */
interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function AdminPageHeader({ title, subtitle, action, breadcrumbs, className }: AdminPageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-3 flex items-center gap-1.5 text-sm text-gray-400">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="transition-colors hover:text-gray-600">{crumb.label}</a>
              ) : (
                <span className="text-gray-600">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

/* ─── Confirm Dialog ─── */
interface AdminConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function AdminConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  variant = "danger",
  onConfirm,
  onCancel,
  loading,
}: AdminConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50",
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gold text-green-dark hover:bg-gold-metallic"
            )}
          >
            {loading ? "A processar..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast / Notification ─── */
interface AdminToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function AdminToast({ message, type = "success", onClose }: AdminToastProps) {
  const icons = {
    success: <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    error: <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    info: <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
        {icons[type]}
        <span className="text-sm font-medium text-gray-700">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Empty State ─── */
interface AdminEmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({ icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* ─── Loading Spinner ─── */
export function AdminLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex items-center gap-3 rounded-full border border-gold/20 bg-white px-5 py-3 shadow-lg">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        <span className="text-sm font-medium text-gray-600">A carregar...</span>
      </div>
    </div>
  );
}

/* ─── Badge ─── */
interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function AdminBadge({ children, variant = "default", className }: AdminBadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-red-50 text-red-700",
    info: "bg-blue-50 text-blue-700",
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

/* ─── Table ─── */
interface AdminTableProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminTable({ children, className }: AdminTableProps) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
}

export function AdminTableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <thead className={cn("bg-gray-50", className)}><tr>{children}</tr></thead>;
}

export function AdminTableHeadCell({ children, className, align = "left" }: { children: React.ReactNode; className?: string; align?: "left" | "right" | "center" }) {
  return (
    <th className={cn("px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500", align === "right" && "text-right", align === "center" && "text-center", className)}>
      {children}
    </th>
  );
}

export function AdminTableBody({ children, empty, emptyColSpan = 5 }: { children: React.ReactNode; empty?: boolean; emptyColSpan?: number }) {
  return (
    <tbody className="divide-y divide-gray-100 bg-white">
      {empty ? (
        <tr>
          <td colSpan={emptyColSpan} className="px-6 py-12 text-center text-sm text-gray-400">
            Nenhum registo encontrado.
          </td>
        </tr>
      ) : children}
    </tbody>
  );
}

export function AdminTableRow({ children, className, highlight }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  return (
    <tr className={cn("transition-colors hover:bg-gray-50/50", highlight && "bg-blue-50/50", className)}>
      {children}
    </tr>
  );
}

export function AdminTableCell({ children, className, primary, truncate, maxWidth, align }: { children: React.ReactNode; className?: string; primary?: boolean; truncate?: boolean; maxWidth?: string; align?: "left" | "right" | "center" }) {
  return (
    <td
      className={cn(
        "px-6 py-4 text-sm",
        primary ? "font-medium text-gray-900" : "text-gray-500",
        truncate && "max-w-xs truncate",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className
      )}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {children}
    </td>
  );
}

/* ─── Pagination ─── */
interface AdminPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function AdminPagination({ page, totalPages, onPageChange, className }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-between border-t border-gray-100 px-6 py-3", className)}>
      <p className="text-sm text-gray-500">
        Página <span className="font-medium">{page}</span> de <span className="font-medium">{totalPages}</span>
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                page === pageNum ? "bg-gold text-green-dark" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Seguinte
        </button>
      </div>
    </div>
  );
}
