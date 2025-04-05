type WeatherCardProps = {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  condition: string;
};

export default function WeatherCard({
  name,
  temperature,
  humidity,
  condition,
}: WeatherCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>Condition: {condition}</p>
    </div>
  );
}
