"use client";

export default function PageError({ reset }: { reset: () => void }) {
  return (
    <section role="alert" className="bg-warm-white px-6 py-24 text-center text-green-dark">
      <h1 className="font-montserrat text-3xl font-bold">Não foi possível carregar esta página</h1>
      <p className="mt-4">Tente novamente. Se o problema continuar, contacte geral@fivaaforum.com.</p>
      <button type="button" onClick={reset} className="mt-8 rounded-full bg-gold px-8 py-4 font-bold">Tentar novamente</button>
    </section>
  );
}
