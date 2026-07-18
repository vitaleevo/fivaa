"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function InscricoesAdmin() {
  const registrations = useQuery(api.registrations.get);
  const tickets = useQuery(api.tickets.get);
  const removeRegistration = useMutation(api.registrations.remove);

  if (registrations === undefined || tickets === undefined) {
    return <div className="p-8">Carregando...</div>;
  }

  const getTicketName = (id: string) => tickets.find(t => t._id === id)?.name || "Desconhecido";

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Inscrições</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bilhete</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Org/Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhuma inscrição encontrada.
                </td>
              </tr>
            ) : registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getTicketName(reg.ticketId)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.org}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => { if(confirm("Apagar inscrição?")) removeRegistration({ id: reg._id }) }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
