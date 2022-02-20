import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FavoriteItem } from '../../types'

interface FavoritesState {
  list: FavoriteItem[]
}

const initialState: FavoritesState = {
  list: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      state.list = [...state.list, action.payload]
    },
    removeFromFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      state.list = state.list.filter((f) => f.symbol !== action.payload.symbol)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
