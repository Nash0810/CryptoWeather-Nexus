"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { toggleFavoriteCity, toggleFavoriteCrypto } from "store/favoritesSlice";

export const ClientFavoritesProvider = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.cryptos?.forEach((id: string) =>
        dispatch(toggleFavoriteCrypto(id))
      );
      parsed.cities?.forEach((city: string) =>
        dispatch(toggleFavoriteCity(city))
      );
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return null;
};
