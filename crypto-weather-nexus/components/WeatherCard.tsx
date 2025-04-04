type Props = {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
};

export default function WeatherCard({
  city,
  temp,
  humidity,
  condition,
}: Props) {
  return (
    <div className="border rounded p-3">
      <p className="font-semibold">{city}</p>
      <p>
        🌡️ {temp}°C | 💧 {humidity}%
      </p>
      <p>{condition}</p>
    </div>
  );
}
