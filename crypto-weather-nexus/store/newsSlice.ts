// src/store/newsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(`https://api.example.com/news`, {
    headers: {
      Authorization: `Bearer ${process.env.NEWS_API_KEY}`, // only if required
    },
  });

  // Assuming response.data = array of strings
  return response.data.slice(0, 5); // limit to top 5
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [] as string[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news.";
      });
  },
});

export default newsSlice.reducer;
