type Props = {
  id: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
};

export default function CryptoCard({
  name,
  price,
  change24h,
  marketCap,
}: Props) {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>24h Change: {change24h.toFixed(2)}%</p>
      <p>Market Cap: ${marketCap.toLocaleString()}</p>
    </div>
  );
}
