// components/PriceToast.tsx
type PriceToastProps = {
  coin: string;
  price: number;
};

export const PriceToast = ({ coin, price }: PriceToastProps) => (
  <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200 text-black">
    🔔 Price Alert [{coin.toUpperCase()}]: ${price.toFixed(2)}
  </div>
);
