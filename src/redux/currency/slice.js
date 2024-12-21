import { createSlice } from '@reduxjs/toolkit';
import { getFetchCurrency } from './operations';

const initialState = {
  baseCurrency: '',
};

export const slice = createSlice({
  name: 'currency',
  initialState,
  extraReducers: builder => {
    builder.addCase(getFetchCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});

export default slice.reducer;
