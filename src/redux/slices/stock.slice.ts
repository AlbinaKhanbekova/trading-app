import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSybmols } from '../../services/api'
import { CompanySearchItem, SymbolItemResponse } from '../../types'

export const fetchSymbols = createAsyncThunk('stock/fetchSymbols', async () => {
  const response = await getSybmols()
  const data: SymbolItemResponse[] = await response.json()

  return data.map((item) => ({ symbol: item.symbol, companyName: item.name }))
})

interface StockState {
  list: CompanySearchItem[]
  loading: boolean
}

const initialState: StockState = {
  list: [],
  loading: false,
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSymbols.fulfilled, (state, action) => {
      state.list.push(...action.payload)
      state.loading = false
    })
    builder.addCase(fetchSymbols.pending, (state) => {
      state.loading = true
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = stockSlice.actions

export default stockSlice.reducer
