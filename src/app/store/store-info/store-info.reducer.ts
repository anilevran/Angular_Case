import { createReducer, on } from '@ngrx/store';
import { loadStoreInfo, loadStoreInfoSuccess, loadStoreInfoFailure } from './store-info.actions';
import { StoreInfo } from './store-info.model'; // Import your Post model

export interface StoreInfoState {
  storeInfo: StoreInfo;
  error: string | null;
}

export const initialState: StoreInfoState = {
  storeInfo: { } as StoreInfo,
  error: null,
};

export const storeInfoReducer = createReducer(
  initialState,
  on(loadStoreInfo, state => ({ ...state, error: null })),
  on(loadStoreInfoSuccess, (state, { storeInfo }) => ({ ...state, storeInfo })),
  on(loadStoreInfoFailure, (state, { error }) => ({ ...state, error }))
);
