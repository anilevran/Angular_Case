import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '@services/data.service';
import {
  loadStoreInfo,
  loadStoreInfoSuccess,
  loadStoreInfoFailure,
} from './store-info.actions';
import { of, map, catchError, switchMap } from 'rxjs';
import { transformFunction } from '@store/utils/distance.util';

@Injectable()
export class StoreInfoEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  //storeInfo verisini iki endpoint verisi ile birleştiren effect
  loadStoreInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStoreInfo),
      switchMap((action) => {
        return this.dataService.getStoreInfo({ id: action.id }).pipe(
          switchMap((storeInfo) => {
            return this.dataService
              .getFeed({
                limit: 1,
                skip: action.skip,
                latitude: action.latitude,
                longitude: action.longitude,
              })
              .pipe(
                map((feedInfo) => {
                  return loadStoreInfoSuccess({
                    storeInfo: {
                      storeInfoDetail: storeInfo,
                      feedInfo: {
                        ...feedInfo[0],
                        distance: transformFunction(
                          feedInfo[0],
                          action.latitude || 0,
                          action.longitude || 0
                        ),
                      },
                    },
                  });
                })
              );
          }),
          catchError((error) => {
            console.error('Error loading store info:', error);
            return of(loadStoreInfoFailure({ error }));
          })
        );
      })
    )
  );
}
