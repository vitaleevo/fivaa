"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function OradoresAdmin() {
  const speakers = useQuery(api.speakers.get);
  const createSpeaker = useMutation(api.speakers.create);
  const removeSpeaker = useMutation(api.speakers.remove);

  const [form, setForm] = useState({ name: "", role: "", country: "", color: "from-gold to-orange" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSpeaker(form);
      setForm({ name: "", role: "", country: "", color: "from-gold to-orange" });
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar orador.");
    } finally {
      setLoading(false);
    }
  };

  if (speakers === undefined) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Oradores</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white p-6 shadow sm:rounded-lg">
          <h2 className="text-xl font-bold mb-4">Adicionar Orador</h2>
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
              <label className="block text-sm font-medium text-gray-700">País</label>
              <input type="text" required value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gradiente de Cor</label>
              <select value={form.color} onChange={e => setForm({...form, color: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border">
                <option value="from-gold to-orange">Ouro para Laranja</option>
                <option value="from-green-medium to-green-dark">Verde</option>
                <option value="from-orange to-gold">Laranja para Ouro</option>
                <option value="from-gold-metallic to-gold">Dourado Metálico</option>
                <option value="from-green-dark to-green-medium">Verde Escuro</option>
                <option value="from-orange to-gold-metallic">Laranja para Metálico</option>
                <option value="from-gold to-green-medium">Ouro para Verde</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold text-white p-2 rounded hover:bg-gold-metallic disabled:opacity-50">
              {loading ? "A Adicionar..." : "Adicionar Orador"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cargo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">País</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {speakers.map((speaker) => (
                  <tr key={speaker._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{speaker.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{speaker.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{speaker.country}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button onClick={() => { if(confirm("Apagar?")) removeSpeaker({ id: speaker._id }) }} className="text-red-600 hover:text-red-900">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {speakers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum orador registado.</td>
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
