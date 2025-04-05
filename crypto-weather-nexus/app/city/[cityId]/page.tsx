import { Metadata } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // <-- Add this import
import axios from "axios";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  return {
    title: `${params.id.toUpperCase()} | Weather Detail`,
  };
}

export default function WeatherDetailPage() {
  const { query } = useRouter(); // <-- useRouter hook
  const { id } = query;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&exclude=hourly,minutely&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>City not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Weather Details</h1>
      {/* Display weather details */}
    </div>
  );
}
