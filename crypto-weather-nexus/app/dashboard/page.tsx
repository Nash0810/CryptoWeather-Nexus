"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "store/weatherSlice";
import { fetchCryptoData } from "store/cryptoSlice";
import { fetchNews } from "store/newsSlice";
import { RootState, AppDispatch } from "store/store";

import WeatherCard from "components/WeatherCard";
import CryptoCard from "components/CryptoCard";
import NewsCard from "components/NewsCard";

import { useCryptoSocket } from "hooks/useCryptoSocket";
import { useSimulatedWeatherAlert } from "hooks/useSimulatedWeatherAlert";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [weatherSearch, setWeatherSearch] = useState("");
  const [cryptoSearch, setCryptoSearch] = useState("");

  const {
    data: weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useSelector((state: RootState) => state.weather);
  const {
    data: cryptoData,
    loading: cryptoLoading,
    error: cryptoError,
  } = useSelector((state: RootState) => state.crypto);
  const {
    articles: newsArticles,
    loading: newsLoading,
    error: newsError,
  } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchNews());
  }, [dispatch]);

  // Filter logic
  const filteredWeather = weatherData.filter((city) =>
    city.city.toLowerCase().includes(weatherSearch.toLowerCase())
  );

  const filteredCrypto = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  useCryptoSocket();
  useSimulatedWeatherAlert();

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CryptoWeather Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 🌦️ Weather Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <div className="mb-2 flex flex-col gap-1">
            <h2 className="text-xl font-semibold">🌦️ Weather</h2>
            <input
              type="text"
              placeholder="Search city..."
              value={weatherSearch}
              onChange={(e) => setWeatherSearch(e.target.value)}
              className="px-2 py-1 rounded border bg-zinc-50 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {weatherLoading && <p>Loading...</p>}
          {weatherError && <p className="text-red-500">{weatherError}</p>}

          <div className="space-y-2">
            {filteredWeather.map((city) => (
              <WeatherCard key={city.city} {...city} />
            ))}
            {filteredWeather.length === 0 && <p>No results found.</p>}
          </div>
        </section>

        {/* 💰 Crypto Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <div className="mb-2 flex flex-col gap-1">
            <h2 className="text-xl font-semibold">💰 Cryptocurrency</h2>
            <input
              type="text"
              placeholder="Search coin..."
              value={cryptoSearch}
              onChange={(e) => setCryptoSearch(e.target.value)}
              className="px-2 py-1 rounded border bg-zinc-50 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          {cryptoLoading ? (
            <p>Loading...</p>
          ) : cryptoError ? (
            <p className="text-red-500">{cryptoError}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {filteredCrypto.map((coin) => (
                <CryptoCard key={coin.id} {...coin} />
              ))}
              {filteredCrypto.length === 0 && <p>No results found.</p>}
            </div>
          )}
        </section>

        {/* 📰 News Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">📰 News</h2>
          {newsLoading ? (
            <p>Loading...</p>
          ) : newsError ? (
            <p className="text-red-500">{newsError}</p>
          ) : (
            <div className="space-y-2">
              {newsArticles.map((headline, idx) => (
                <NewsCard key={idx} title={headline} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
