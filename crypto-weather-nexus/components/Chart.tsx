import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Chart = ({ id }: { id: string }) => {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Price (USD)",
        data: [] as number[],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  });

  useEffect(() => {
    async function fetchChartData() {
      const res = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
      );
      const { data } = await res.json();

      const labels = data.map((entry: any) =>
        new Date(entry.time).toLocaleDateString()
      );
      const prices = data.map((entry: any) =>
        parseFloat(entry.priceUsd).toFixed(2)
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Price (USD)",
            data: prices,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      });
    }

    fetchChartData();
  }, [id]);

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
