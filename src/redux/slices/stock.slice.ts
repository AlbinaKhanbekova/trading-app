import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getCompany, getLogo, getQuote, getSybmols } from '../../services/api'
import {
  StockDetails,
  CompanySearchItem,
  SymbolItemResponse,
} from '../../types'
import { RootState } from '../store'

export const fetchSymbols = createAsyncThunk('stock/fetchSymbols', async () => {
  const response = await getSybmols()
  const data: SymbolItemResponse[] = await response.json()

  return data.map((item) => ({ symbol: item.symbol, companyName: item.name }))
})

export const fetchStockDetails = createAsyncThunk<
  StockDetails,
  string,
  { state: RootState }
>('stock/fetchStockDetails', async (symbol: string, thunkAPI) => {
  const [companyResponse, quoteResponse, logoResponse] = await Promise.all([
    getCompany(symbol),
    getQuote(symbol),
    getLogo(symbol),
  ])

  if (companyResponse.ok && quoteResponse.ok && logoResponse.ok) {
    const companyData = await companyResponse.json()
    const quoteData = await quoteResponse.json()
    const logoData = await logoResponse.json()

    const state = thunkAPI.getState()
    const favoriteItem = state.favorites.list.find(
      (item) => item.symbol === (companyData as any).symbol
    )

    return {
      companyName: companyData.companyName,
      description: companyData.description,
      symbol: companyData.symbol,
      sector: companyData.sector,
      country: companyData.country,
      close: quoteData.close,
      latestPrice: quoteData.latestPrice,
      logoUrl: logoData.url,
      isFavorite: !!favoriteItem,
    }
  } else {
    throw new Error()
  }
})

interface StockState {
  list: CompanySearchItem[]
  loading: boolean
  stockDetails: StockDetails | null
  error: string | null | undefined
}

const initialState: StockState = {
  list: [],
  loading: false,
  stockDetails: null,
  error: null,
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    updateStockDetails: (state, action: PayloadAction<StockDetails>) => {
      state.stockDetails = action.payload
    },
    clearStockDetails: (state) => {
      state.stockDetails = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSymbols.fulfilled, (state, action) => {
      state.list.push(...action.payload)
    })
    builder.addCase(fetchStockDetails.fulfilled, (state, action) => {
      state.stockDetails = action.payload
      state.loading = false
    })
    builder.addCase(fetchStockDetails.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchStockDetails.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export const { updateStockDetails, clearStockDetails } = stockSlice.actions

export default stockSlice.reducer
