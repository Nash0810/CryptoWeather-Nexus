import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: {
    cities: [],
    cryptos: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavoriteCity(state, action) {
      state.favorites.cities.push(action.payload);
    },
    removeFavoriteCity(state, action) {
      state.favorites.cities = state.favorites.cities.filter(
        (city) => city !== action.payload
      );
    },
    addFavoriteCrypto(state, action) {
      state.favorites.cryptos.push(action.payload);
    },
    removeFavoriteCrypto(state, action) {
      state.favorites.cryptos = state.favorites.cryptos.filter(
        (crypto) => crypto !== action.payload
      );
    },
  },
});

export const {
  addFavoriteCity,
  removeFavoriteCity,
  addFavoriteCrypto,
  removeFavoriteCrypto,
} = userSlice.actions;
export default userSlice.reducer;
