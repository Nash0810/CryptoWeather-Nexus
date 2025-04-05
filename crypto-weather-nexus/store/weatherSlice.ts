import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type WeatherData = {
  city: string;
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  condition: string;
};

type WeatherAlert = {
  message: string;
  type: string;
};

type WeatherState = {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
  alerts: WeatherAlert[];
};

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
  alerts: [],
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async () => {
    const cities = ["New York", "London", "Tokyo"];
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const responses = await Promise.all(
      cities.map((city) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        )
      )
    );

    const data = responses.map((response, index) => ({
      id: response.data.id.toString(),
      city: cities[index], // Use the city from the predefined array
      name: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description,
    }));

    return data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addWeatherAlert(state, action: PayloadAction<WeatherAlert>) {
      state.alerts.push(action.payload);
    },
  },
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
        state.error = action.error.message || "Failed to fetch weather data";
      });
  },
});

export const { addWeatherAlert } = weatherSlice.actions;
export default weatherSlice.reducer;
