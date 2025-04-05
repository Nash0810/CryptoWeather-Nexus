type CryptoCardProps = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
};

export default function CryptoCard({
  name,
  symbol,
  price,
  change24h,
  marketCap,
}: CryptoCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">
        {name} ({symbol})
      </h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>24h Change: {change24h.toFixed(2)}%</p>
      <p>Market Cap: ${marketCap.toLocaleString()}</p>
    </div>
  );
}
