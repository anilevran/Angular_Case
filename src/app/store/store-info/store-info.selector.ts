import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoreInfoState } from './store-info.reducer';

export const selectStoreInfoState = createFeatureSelector<StoreInfoState>('storeInfo');

export const selectStoreInfo = createSelector(
  selectStoreInfoState,
  (state: StoreInfoState) => state.storeInfo
);

export const selectStoreInfoError = createSelector(
  selectStoreInfoState,
  (state: StoreInfoState) => state.error
);
