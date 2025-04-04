"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "store/weatherSlice";
import { RootState, AppDispatch } from "store/store";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherData());
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

        {/* Crypto and News Sections - keep placeholders for now */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">🪙 Crypto</h2>
          <p>Coming soon...</p>
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">📰 News</h2>
          <p>Coming soon...</p>
        </section>
      </div>
    </main>
  );
}
