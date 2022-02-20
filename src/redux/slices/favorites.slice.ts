import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Favorite } from "../../types/favorites";

interface FavoritesState {
  favorites: Favorite[];
}

const initialState: FavoritesState = {
  favorites: [{ symbol: "AAPL", company: "Apple" }],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Favorite>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
      state.favorites = state.favorites.filter(
        (f) => f.symbol !== action.payload.symbol
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
