import { createAction, props } from '@ngrx/store';
import { StoreInfo } from './store-info.model'; // Assuming you have a Post model

export const loadStoreInfo = createAction(
  '[StoreInfo] Load StoreInfo',
  props<{ id: string; skip: number,latitude: number; longitude: number }>()
);
export const loadStoreInfoSuccess = createAction(
  '[StoreInfo] Load StoreInfo Success',
  props<{ storeInfo: StoreInfo }>()
);
export const loadStoreInfoFailure = createAction(
  '[StoreInfo] Load StoreInfo Failure',
  props<{ error: any }>()
);
