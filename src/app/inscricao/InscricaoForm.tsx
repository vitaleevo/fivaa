"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

type UploadState = { storageId?: Id<"_storage">; preview: string; fileName: string };

const emptyUpload: UploadState = { storageId: undefined, preview: "", fileName: "" };

const MAX_BYTES = 5 * 1024 * 1024;

export default function InscricaoForm() {
  const tickets = useQuery(api.tickets.get);
  const generateUploadUrl = useMutation(api.registrations.generateUploadUrl);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Angola");
  const [org, setOrg] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [payment, setPayment] = useState<UploadState>(emptyUpload);
  const [photo, setPhoto] = useState<UploadState>(emptyUpload);
  const [uploading, setUploading] = useState<"payment" | "photo" | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const upload = async (kind: "payment" | "photo", file: File | undefined, acceptPdf: boolean) => {
    if (!file) return;
    const okType = acceptPdf
      ? file.type.startsWith("image/") || file.type === "application/pdf"
      : file.type.startsWith("image/");
    if (!okType) {
      setError(kind === "payment" ? "Comprovativo deve ser JPG, PNG ou PDF." : "Foto deve ser JPG ou PNG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Cada ficheiro deve ter no máximo 5MB.");
      return;
    }
    setError("");
    setUploading(kind);
    try {
      const uploadUrl = await generateUploadUrl({});
      const res = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
      if (!res.ok) throw new Error("upload failed");
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
      const state = { storageId, preview, fileName: file.name };
      if (kind === "payment") setPayment(state);
      else setPhoto(state);
    } catch {
      setError("Erro ao enviar ficheiro. Tente novamente.");
    } finally {
      setUploading(null);
    }
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!payment.storageId || !photo.storageId) {
      setError("Anexe o comprovativo de pagamento e a foto.");
      return;
    }
    if (!ticketId) {
      setError("Escolha a modalidade de bilhete.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, country, org, ticketId,
          startedAt, honeypot: "",
          paymentStorageId: payment.storageId,
          photoStorageId: photo.storageId,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "submit failed");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar inscrição.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-[1.5rem] border border-green-dark/10 bg-white p-8 text-center shadow-sm">
        <p className="font-montserrat text-2xl font-black text-green-dark">Inscrição recebida!</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-medium">
          A nossa equipa vai rever o seu comprovativo. Receberá novidades por email.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-green-dark/15 bg-white px-4 py-3 text-sm text-green-dark outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30";

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-gold/20 bg-white p-8 shadow-[0_24px_70px_rgba(18,71,52,0.10)]">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} required minLength={3} maxLength={80} placeholder="Nome completo *"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inputCls} required type="email" placeholder="Email *"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputCls} required placeholder="Telefone * (ex: +244 900 000 000)"
          value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className={inputCls} required minLength={2} maxLength={50} placeholder="País *"
          value={country} onChange={(e) => setCountry(e.target.value)} />
        <input className={`${inputCls} sm:col-span-2`} maxLength={100} placeholder="Organização / Cargo (opcional)"
          value={org} onChange={(e) => setOrg(e.target.value)} />
        <select className={`${inputCls} sm:col-span-2`} required value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}>
          <option value="">Modalidade de bilhete *</option>
          {(tickets ?? []).map((t) => (
            <option key={t._id} value={t._id}>{t.name} — {t.price}</option>
          ))}
        </select>
        <label className="rounded-xl border border-dashed border-green-dark/25 p-4 text-sm">
          <span className="font-bold text-green-dark">Comprovativo de pagamento *</span>
          <span className="mt-1 block text-xs text-gray-medium">JPG, PNG ou PDF até 5MB</span>
          {payment.fileName && <span className="mt-1 block text-xs font-semibold text-green-dark">{payment.fileName}</span>}
          <input type="file" accept="image/*,application/pdf" className="mt-2 w-full text-xs"
            disabled={uploading !== null}
            onChange={(e) => upload("payment", e.target.files?.[0], true)} />
          {uploading === "payment" && <span className="text-xs text-gray-medium">A enviar...</span>}
        </label>
        <label className="rounded-xl border border-dashed border-green-dark/25 p-4 text-sm">
          <span className="font-bold text-green-dark">Foto *</span>
          <span className="mt-1 block text-xs text-gray-medium">JPG ou PNG até 5MB</span>
          {photo.preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo.preview} alt="Pré-visualização da foto" className="mt-2 h-16 w-16 rounded-full object-cover" />
          )}
          <input type="file" accept="image/*" className="mt-2 w-full text-xs"
            disabled={uploading !== null}
            onChange={(e) => upload("photo", e.target.files?.[0], false)} />
          {uploading === "photo" && <span className="text-xs text-gray-medium">A enviar...</span>}
        </label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      <button type="submit" disabled={sending || uploading !== null}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 font-montserrat text-sm font-extrabold text-green-dark transition-all hover:-translate-y-0.5 hover:bg-gold-metallic disabled:opacity-50">
        {sending ? "A enviar..." : "Submeter inscrição"}
      </button>
    </form>
  );
}
