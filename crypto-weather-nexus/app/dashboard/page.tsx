"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "store/weatherSlice";
import { fetchCryptoData } from "store/cryptoSlice";
import { RootState, AppDispatch } from "store/store";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );
  const crypto = useSelector((state: RootState) => state.crypto); // ✅ This was missing

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData()); // ✅ fetch crypto on load too
  }, [dispatch]);

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CryptoWeather Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Weather Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">🌦️ Weather</h2>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-2">
            {data.map((city) => (
              <div key={city.city} className="border rounded p-3">
                <p className="font-semibold">{city.city}</p>
                <p>
                  🌡️ {city.temp}°C | 💧 {city.humidity}%
                </p>
                <p>{city.condition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Crypto Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <div>
            <h2 className="text-xl font-bold">💰 Cryptocurrency</h2>
            {crypto.loading ? (
              <p>Loading...</p>
            ) : crypto.error ? (
              <p className="text-red-500">Error: {crypto.error}</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {crypto.data.map((coin) => (
                  <div key={coin.id} className="p-4 border rounded shadow">
                    <h3 className="text-lg font-semibold">{coin.name}</h3>
                    <p>Price: ${coin.price.toFixed(2)}</p>
                    <p>24h Change: {coin.change24h.toFixed(2)}%</p>
                    <p>Market Cap: ${coin.marketCap.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* News Placeholder */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">📰 News</h2>
          <p>Coming soon...</p>
        </section>
      </div>
    </main>
  );
}
