import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type NewsData = {
  title: string;
  link: string;
};

type NewsState = {
  articles: NewsData[];
  loading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const response = await axios.get(
    `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency&language=en`
  );

  // Ensure the response data structure matches the expected format
  const articles = response.data.results.slice(0, 5).map((article: any) => ({
    title: article.title,
    link: article.link,
  }));

  return articles;
});

const newsSlice = createSlice({
  name: "news",
  initialState,
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
        state.error = action.error.message || "Failed to fetch news data";
      });
  },
});

export default newsSlice.reducer;
