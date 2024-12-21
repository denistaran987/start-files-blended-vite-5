import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrency } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const getFetchCurrency = createAsyncThunk(
  'currency/getFetchCurrency',
  async (coord, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { baseCurrency } = state.currency;

      if (baseCurrency) {
        return thunkAPI.rejectWithValue(null);
      }
      const data = await getCurrency(coord);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async (credentials, thunkAPI) => {
    try {
      const data = await exchangeCurrency(credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { baseCurrency } = state.currency;
      if (!baseCurrency) {
        return thunkAPI.rejectWithValue(null);
      }
      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
