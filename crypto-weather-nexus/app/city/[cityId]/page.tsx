type Props = {
  params: { cityId: string };
};

export default function CityDetailPage({ params }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        Weather Details for {params.cityId}
      </h1>
      {/* Chart/table will go here later */}
    </div>
  );
}
