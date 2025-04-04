// src/store/newsSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Replace 'us' or 'crypto' based on your desired topic/language/country
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const response = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${apiKey}&q=crypto&language=en`
  );

  console.log("News response:", response.data);

  // Assuming response.data.results is an array of articles
  const articles = response.data.results?.map((item: any) => item.title) || [];

  return articles.slice(0, 5); // Top 5 headlines
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
