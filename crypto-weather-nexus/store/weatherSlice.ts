import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type WeatherData = {
  city: string;
  temp: number;
  humidity: number;
  condition: string;
};

type WeatherState = {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
};

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk to fetch weather for 3 cities
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async () => {
    const cities = ["New York", "London", "Tokyo"];
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const units = "metric"; // for °C

    const requests = cities.map(async (city) => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
      );
      return {
        city,
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        condition: res.data.weather[0].main,
      };
    });

    return Promise.all(requests);
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching weather";
      });
  },
});

export default weatherSlice.reducer;
