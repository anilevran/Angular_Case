import { createReducer, on } from '@ngrx/store';
import { loadFeed, loadFeedSuccess, loadFeedFailure } from './feed.actions';
import { Feed } from './feed.model';

export interface FeedState {
  feed: Feed[];
  error: string | null;
}

export const initialState: FeedState = {
  feed: [],
  error: null,
};

export const feedReducer = createReducer(
  initialState,
  on(loadFeed, state => ({ ...state, error: null })),
  on(loadFeedSuccess, (state, { feed }) => ({ ...state, feed })),
  on(loadFeedFailure, (state, { error }) => ({ ...state, error }))
);
