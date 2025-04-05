import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  favorites: {
    cities: string[];
    cryptos: string[];
  };
}

const initialState: UserState = {
  favorites: {
    cities: [],
    cryptos: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addFavoriteCity(state, action: PayloadAction<string>) {
      state.favorites.cities.push(action.payload);
    },
    removeFavoriteCity(state, action: PayloadAction<string>) {
      state.favorites.cities = state.favorites.cities.filter(
        (city) => city !== action.payload
      );
    },
    addFavoriteCrypto(state, action: PayloadAction<string>) {
      state.favorites.cryptos.push(action.payload);
    },
    removeFavoriteCrypto(state, action: PayloadAction<string>) {
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
