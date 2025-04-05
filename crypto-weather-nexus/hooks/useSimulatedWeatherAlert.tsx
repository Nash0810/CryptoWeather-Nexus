import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addWeatherAlert } from "../store/weatherSlice";

export const useSimulatedWeatherAlert = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      const alert = {
        message: "Simulated Weather Alert!",
        type: "weather_alert",
      };
      dispatch(addWeatherAlert(alert));
    }, 60000); // Simulate every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);
};
