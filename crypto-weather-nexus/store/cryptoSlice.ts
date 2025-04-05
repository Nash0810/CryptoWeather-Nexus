import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
};

type CryptoState = {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
};

const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async () => {
    const response = await axios.get("https://api.coincap.io/v2/assets");

    const allCoins = response.data.data;
    const coinsToShow = ["bitcoin", "ethereum", "litecoin"];

    const filtered = allCoins
      .filter((coin: any) => coinsToShow.includes(coin.id))
      .map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: parseFloat(coin.priceUsd),
        change24h: parseFloat(coin.changePercent24Hr),
        marketCap: parseFloat(coin.marketCapUsd),
      }));

    return filtered;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (
      state,
      action: PayloadAction<{ [key: string]: number }>
    ) => {
      const data = action.payload;
      Object.keys(data).forEach((key) => {
        const price = data[key];
        const coin = state.data.find((coin) => coin.id === key);
        if (coin) {
          coin.price = price;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch crypto data";
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
