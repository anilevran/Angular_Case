import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '@services/data.service';
import { loadFeed, loadFeedSuccess, loadFeedFailure } from './feed.actions';
import { of, map, catchError, switchMap, take } from 'rxjs';
import { selectAllFeed } from './feed.selector';
import { Store } from '@ngrx/store';
import { Feed } from './feed.model';
import { transformFunction } from '@store/utils/distance.util';

@Injectable()
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) {}

  //sayfaya ilk geliş ise, ilk {limit} veriyi çekiyor. Eğer değilse sonraki {limit} veriyi çekerek önceki feed state'i ile birleştiriyor.
  //Aynı zamanda transformFunction ile client ile mağaza arasındaki mesafeyi ölçüyor ve feede ekliyor.
  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFeed),
      switchMap((action) =>
        this.store.select(selectAllFeed).pipe(
          take(1),
          switchMap((currentFeed) =>
            this.dataService
              .getFeed({
                limit: action.limit,
                skip: action.skip,
                latitude: action.latitude || 0,
                longitude: action.longitude || 0,
              })
              .pipe(
                map((newFeed) => {
                  return loadFeedSuccess({
                    feed: [
                      ...currentFeed,
                      ...newFeed.map((item: Feed) => ({
                        ...item,
                        distance: transformFunction(
                          item,
                          action.latitude || 0,
                          action.longitude || 0
                        ),
                      })),
                    ],
                  });
                }),
                catchError((error) => of(loadFeedFailure({ error })))
              )
          )
        )
      )
    )
  );
}
