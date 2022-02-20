import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favorites.slice'
import stockReducer from './slices/stock.slice'

import { loadStateFromStorage, saveStateToStorage } from './localStorage'

const preloadedState = loadStateFromStorage()

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    stock: stockReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveStateToStorage(store.getState())
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
