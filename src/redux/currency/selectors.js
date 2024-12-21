import { createSelector } from '@reduxjs/toolkit';

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const selectIsLoading = state => state.currency.isLoading;
export const selectAllRates = state => state.currency.rates;

export const selectRates = createSelector(
  [selectBaseCurrency, selectAllRates],
  (baseCurrency, rates) => {
    return rates
      .filter(([currency]) => {
        return currency !== baseCurrency;
      })
      .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  },
);
