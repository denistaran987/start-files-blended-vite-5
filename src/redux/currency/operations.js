import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrency } from '../../service/opencagedataApi';

export const getFetchCurrency = createAsyncThunk(
  'currency/getFetchCurrency',
  async (coord, thunkAPI) => {
    try {
      const data = await getCurrency(coord);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
