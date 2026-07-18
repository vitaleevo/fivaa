"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function MensagensAdmin() {
  const messages = useQuery(api.messages.get);
  const removeMessage = useMutation(api.messages.remove);
  const markRead = useMutation(api.messages.markRead);

  if (messages === undefined) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mensagens de Contacto</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhuma mensagem recebida.
                </td>
              </tr>
            ) : messages.map((msg) => (
              <tr key={msg._id} className={msg.read ? "bg-white" : "bg-blue-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {msg.read ? "Lida" : <span className="font-bold text-blue-600">Nova</span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{msg.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-md whitespace-pre-wrap">{msg.message}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-4">
                  {!msg.read && (
                    <button 
                      onClick={() => markRead({ id: msg._id })}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Marcar Lida
                    </button>
                  )}
                  <button 
                    onClick={() => { if(confirm("Apagar mensagem?")) removeMessage({ id: msg._id }) }}
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
