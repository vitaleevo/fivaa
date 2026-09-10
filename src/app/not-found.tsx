import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-warm-white px-6 py-24 text-center text-green-dark">
      <p className="font-bold">404</p>
      <h1 className="mt-4 font-montserrat text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-4">O endereço pode ter mudado. Continue a explorar o FIVAA.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-gold px-8 py-4 font-bold">Voltar ao início</Link>
    </section>
  );
}
