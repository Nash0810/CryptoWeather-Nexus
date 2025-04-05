import { notFound } from "next/navigation";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteCrypto, removeFavoriteCrypto } from "store/userSlice";
import { RootState } from "store/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/router"; // <-- Add this import

// Dynamic import for Chart component to avoid SSR issues
const Chart = dynamic(() => import("../../../components/Chart"), {
  ssr: false,
});

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

export default function CryptoDetailPage() {
  const { query } = useRouter(); // <-- useRouter hook
  const { id } = query;

  const [coin, setCoin] = useState<any>(null);
  const [wsPrice, setWsPrice] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.user.favorites.cryptos
  );
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    if (!id) return;

    const fetchCoinData = async () => {
      try {
        const res = await fetch(`https://api.coincap.io/v2/assets/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) return notFound();

        const { data } = await res.json();
        setCoin(data);
      } catch (error) {
        console.error("Failed to fetch coin data", error);
      }
    };

    fetchCoinData();

    const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${id}`);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data[id]) {
        setWsPrice(data[id]);
      }
    };

    return () => socket.close();
  }, [id]);

  if (!coin) return <div>Loading...</div>;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteCrypto(id));
    } else {
      dispatch(addFavoriteCrypto(id));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold">
        {coin.name} ({coin.symbol})
      </h1>
      <p>Price: ${wsPrice ? wsPrice : parseFloat(coin.priceUsd).toFixed(2)}</p>
      <p>Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
      <p>Change 24h: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
      <button
        onClick={handleFavorite}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <Chart id={id} />
    </div>
  );
}
