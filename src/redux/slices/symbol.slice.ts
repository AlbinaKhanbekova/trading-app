import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSybmols } from "../../services/api";
import { SymbolListItem } from "../../types/symbols";

export const fetchSymbols = createAsyncThunk("stock/fetchSymbols", async () => {
  const response = await getSybmols();
  const data: SymbolListItem[] = await response.json();

  return data.map((item) => ({ symbol: item.symbol, name: item.name }));
});

interface SymbolsState {
  list: SymbolListItem[];
  loading: boolean;
}

const initialState: SymbolsState = {
  list: [],
  loading: false,
};

export const symbolsSlice = createSlice({
  name: "symbols",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSymbols.fulfilled, (state, action) => {
      state.list.push(...action.payload);
      state.loading = false;
    });
    builder.addCase(fetchSymbols.pending, (state) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = symbolsSlice.actions;

export default symbolsSlice.reducer;
