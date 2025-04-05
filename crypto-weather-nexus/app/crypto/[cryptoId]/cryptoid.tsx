import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const CryptoDetailPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const [coin, setCoin] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const [coinRes, historyRes] = await Promise.all([
          axios.get(`https://api.coincap.io/v2/assets/${id}`),
          axios.get(
            `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
          ),
        ]);

        setCoin(coinRes.data.data);
        setHistory(historyRes.data.data);
      } catch (error) {
        console.error("Failed to fetch coin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!coin) return <div className="text-red-500">Crypto not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">
        {coin.name} ({coin.symbol})
      </h1>
      <p className="text-lg">Price: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p>24h Change: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      <p>Volume (24h): ${parseFloat(coin.volumeUsd24Hr).toLocaleString()}</p>

      <h2 className="text-2xl font-semibold mt-6">Price History</h2>
      <div className="mt-4">
        {history.length > 0 ? (
          <ul className="space-y-1 text-sm text-gray-600">
            {history.slice(-7).map((entry, i) => (
              <li key={i}>
                {entry.date.split("T")[0]} - $
                {parseFloat(entry.priceUsd).toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No historical data available.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoDetailPage;
