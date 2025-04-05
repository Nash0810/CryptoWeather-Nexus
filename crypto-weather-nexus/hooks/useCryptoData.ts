import { useEffect, useState } from "react";
import axios from "axios";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
}

const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        const allCoins = response.data.data;
        const coinsToShow = ["bitcoin", "ethereum", "litecoin"];

        const filtered = allCoins
          .filter((coin: any) => coinsToShow.includes(coin.id))
          .map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: parseFloat(coin.priceUsd),
            change24h: parseFloat(coin.changePercent24Hr),
            marketCap: parseFloat(coin.marketCapUsd),
          }));

        setCryptoData(filtered);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.message || error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  return { cryptoData, loading, error };
};

export default useCryptoData;
