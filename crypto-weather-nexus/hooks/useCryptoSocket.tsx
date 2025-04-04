"use client";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { PriceToast } from "components/PriceToast";

export const useCryptoSocket = () => {
  useEffect(() => {
    const ws = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum"
    );

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      Object.entries(data).forEach(([coin, price]) => {
        toast.custom((t) => (
          <PriceToast coin={coin} price={parseFloat(price as string)} />
        ));
      });
    };

    return () => {
      ws.close();
    };
  }, []);
};
