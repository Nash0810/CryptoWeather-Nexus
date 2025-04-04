import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice"; // <-- add this

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer, // <-- and this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
