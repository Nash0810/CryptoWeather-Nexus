"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../../store/weatherSlice";
import { fetchCryptoData } from "../../store/cryptoSlice";
import { fetchNews } from "../../store/newsSlice";
import { RootState, AppDispatch } from "../../store/store";
import WeatherCard from "../../components/WeatherCard";
import CryptoCard from "../../components/CryptoCard";
import NewsCard from "../../components/NewsCard";
import { useCryptoSocket } from "../../hooks/useCryptoSocket";
import { useSimulatedWeatherAlert } from "../../hooks/useSimulatedWeatherAlert";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchCryptoData());
    dispatch(fetchNews());
  }, [dispatch]);

  const weather = useSelector((state: RootState) => state.weather);
  const crypto = useSelector((state: RootState) => state.crypto);
  const news = useSelector((state: RootState) => state.news);

  useCryptoSocket();
  useSimulatedWeatherAlert();

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">CryptoWeather Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Weather Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Weather</h2>
          {weather.loading && <p>Loading...</p>}
          {weather.error && <p className="text-red-500">{weather.error}</p>}
          <div className="space-y-2">
            {weather.data.map((cityData) => (
              <WeatherCard
                key={cityData.id}
                city={cityData.city}
                temperature={cityData.temperature}
                humidity={cityData.humidity}
                condition={cityData.condition}
              />
            ))}
          </div>
        </section>

        {/* Crypto Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Cryptocurrency</h2>
          {crypto.loading && <p>Loading...</p>}
          {crypto.error && <p className="text-red-500">{crypto.error}</p>}
          <div className="space-y-2">
            {crypto.data.map((coin) => (
              <CryptoCard key={coin.id} {...coin} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">News</h2>
          {news.loading && <p>Loading...</p>}
          {news.error && <p className="text-red-500">{news.error}</p>}
          <div className="space-y-2">
            {news.articles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
