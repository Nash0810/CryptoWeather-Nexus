// app/crypto/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `${params.id.toUpperCase()} | Crypto Detail`,
  };
}

export default async function CryptoDetailPage({ params }: { params: Params }) {
  const res = await fetch(`https://api.coincap.io/v2/assets/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const { data: coin } = await res.json();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">
        {coin.name} ({coin.symbol})
      </h1>
      <p>Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p>Change 24h: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      {/* Add chart here in next step */}
    </div>
  );
}
