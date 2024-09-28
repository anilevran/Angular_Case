import { createAction, props } from '@ngrx/store';
import { Feed } from './feed.model';

export const loadFeed = createAction(
  '[Feed] Load Feed',
  props<{ limit: number; skip: number,latitude?: number; longitude?: number }>()
);
export const loadFeedSuccess = createAction(
  '[Feed] Load Feed Success',
  props<{ feed: Feed[] }>()
);
export const loadFeedFailure = createAction(
  '[Feed] Load Feed Failure',
  props<{ error: any }>()
);
