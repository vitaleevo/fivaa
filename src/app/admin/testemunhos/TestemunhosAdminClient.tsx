"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function TestemunhosAdmin() {
  const testemunhos = useQuery(api.testimonials.get);
  const createTestemunho = useMutation(api.testimonials.create);
  const removeTestemunho = useMutation(api.testimonials.remove);

  const [form, setForm] = useState({ name: "", role: "", location: "", quote: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTestemunho(form);
      setForm({ name: "", role: "", location: "", quote: "" });
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar testemunho.");
    } finally {
      setLoading(false);
    }
  };

  if (testemunhos === undefined) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Testemunhos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white p-6 shadow sm:rounded-lg">
          <h2 className="text-xl font-bold mb-4">Adicionar Testemunho</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <input type="text" required value={form.role} onChange={e => setForm({...form, role: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Localização</label>
              <input type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Citação</label>
              <textarea required value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border"></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold text-white p-2 rounded hover:bg-gold-metallic disabled:opacity-50">
              {loading ? "A Adicionar..." : "Adicionar Testemunho"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome / Cargo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Citação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testemunhos.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.name}
                      <br />
                      <span className="text-gray-500 font-normal">{item.role}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-sm whitespace-pre-wrap">{item.quote}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button onClick={() => { if(confirm("Apagar?")) removeTestemunho({ id: item._id }) }} className="text-red-600 hover:text-red-900">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {testemunhos.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum testemunho registado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
