import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favorites.slice";
import symbolsReducer from "./slices/symbol.slice";

import { loadStateFromStorage, saveStateToStorage } from "./localStorage";

const preloadedState = loadStateFromStorage();

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    symbols: symbolsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveStateToStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
