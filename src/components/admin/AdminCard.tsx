"use client";

import { cn } from "@/lib/utils";

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
