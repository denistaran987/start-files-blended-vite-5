import { createSlice } from '@reduxjs/toolkit';
import { fetchExchangeInfo, fetchRates, getFetchCurrency } from './operations';

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  error: null,
  rates: [],
};

export const slice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getFetchCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.baseCurrency = action.payload;
      })
      .addCase(getFetchCurrency.pending, handlePending)
      .addCase(getFetchCurrency.rejected, handleRejected)
      .addCase(fetchExchangeInfo.fulfilled, (state, action) => {
        state.exchangeInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeInfo.rejected, (state, action) => {
        state.exchangeInfo = null;
        state.error = action.payload;
      })
      .addCase(fetchExchangeInfo.pending, handlePending)
      .addCase(fetchRates.fulfilled, (state, action) => {
        state.rates = action.payload;
      })
      .addCase(fetchRates.pending, handlePending)
      .addCase(fetchRates.rejected, handleRejected);
  },
});

export const { setDefaultCurrency } = slice.actions;
export default slice.reducer;
