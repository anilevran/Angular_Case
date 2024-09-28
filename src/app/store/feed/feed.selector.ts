import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from './feed.reducer';
export const selectFeedState = createFeatureSelector<FeedState>('feed');

export const selectAllFeed = createSelector(
  selectFeedState,
  (state: FeedState) => state.feed
);

export const selectFeedError = createSelector(
  selectFeedState,
  (state: FeedState) => state.error
);