"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function ProgramacaoAdmin() {
  const schedule = useQuery(api.schedule.get);
  const createSchedule = useMutation(api.schedule.create);
  const removeSchedule = useMutation(api.schedule.remove);

  const [form, setForm] = useState({ day: "20 de Novembro", time: "", title: "", type: "Painel" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSchedule(form);
      setForm({ ...form, time: "", title: "" });
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar evento.");
    } finally {
      setLoading(false);
    }
  };

  if (schedule === undefined) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Programação</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-white p-6 shadow sm:rounded-lg">
          <h2 className="text-xl font-bold mb-4">Adicionar Evento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dia</label>
              <select value={form.day} onChange={e => setForm({...form, day: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border">
                <option value="20 de Novembro">20 de Novembro</option>
                <option value="21 de Novembro">21 de Novembro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hora (ex: 09:00)</label>
              <input type="text" required value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gold focus:ring-gold sm:text-sm p-2 border">
                <option value="Painel">Painel</option>
                <option value="Workshop">Workshop</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Exposição">Exposição</option>
                <option value="Música">Música</option>
                <option value="Cerimónia">Cerimónia</option>
                <option value="Networking">Networking</option>
                <option value="Apresentação">Apresentação</option>
                <option value="Feira">Feira</option>
                <option value="Pausa">Pausa</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-gold text-white p-2 rounded hover:bg-gold-metallic disabled:opacity-50">
              {loading ? "A Adicionar..." : "Adicionar Evento"}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedule.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.time}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button onClick={() => { if(confirm("Apagar?")) removeSchedule({ id: item._id }) }} className="text-red-600 hover:text-red-900">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {schedule.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum evento registado.</td>
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
