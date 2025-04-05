import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCryptoPrice } from "../store/cryptoSlice";

export const useCryptoSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,litecoin"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(updateCryptoPrice(data));
    };

    return () => socket.close();
  }, [dispatch]);
};
