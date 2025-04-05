import React from "react";

interface WeatherCardProps {
  id: string;
  city: string;
  temperature: number;
  humidity: number;
  condition: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  id,
  city,
  temperature,
  humidity,
  condition,
}) => {
  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = temperature - 273.15;

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>Temperature: {temperatureCelsius.toFixed(2)}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Condition: {condition}</p>
    </div>
  );
};

export default WeatherCard;
