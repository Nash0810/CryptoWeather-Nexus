"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import WeatherAlertToast from "components/WeatherAlertToast";

const cities = ["New York", "London", "Tokyo"];

export const useSimulatedWeatherAlert = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      toast.custom(() => <WeatherAlertToast city={randomCity} />);
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);
};
