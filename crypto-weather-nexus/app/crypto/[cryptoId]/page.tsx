type Props = {
  params: { cryptoId: string };
};

export default function CryptoDetailPage({ params }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Crypto Details: {params.cryptoId}</h1>
      {/* Historical chart & extended metrics will go here */}
    </div>
  );
}
