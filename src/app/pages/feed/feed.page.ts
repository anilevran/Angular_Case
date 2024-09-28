import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Feed } from '@store/feed/feed.model';
import { loadFeed } from '@store/feed/feed.actions';
import { selectAllFeed, selectFeedError } from '@store/feed/feed.selector';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  feed$: Observable<Feed[]> = of([]);
  limit: number = 5;
  skip: number = 0;
  loading: boolean = false;
  latitude: number = 0;
  longitude: number = 0;
  isFavorite: { [key: string]: boolean } = {};

  constructor(
    private store: Store,
    private router: Router,
    private locationService: LocationService
  ) {}

  //Feed verisini çeker
  async ngOnInit() {
    await this.getCurrentLocation();
    this.store.dispatch(
      loadFeed({
        limit: this.limit,
        skip: this.skip,
        latitude: this.latitude,
        longitude: this.longitude,
      })
    );
    this.skip += 5;
    this.feed$ = this.store.select(selectAllFeed);
  }

  //scroll olduğunda sonraki {limit} veriyi çeken fonksiyon
  loadData(event: InfiniteScrollCustomEvent) {
    if (this.loading) {
      event.target.complete();
      return;
    }

    this.loading = true;
    this.store.dispatch(
      loadFeed({
        limit: this.limit,
        skip: this.skip,
        latitude: this.latitude,
        longitude: this.longitude,
      })
    );
    this.skip += 5;

    setTimeout(() => {
      this.loading = false;
      event.target.complete();
    }, 1000);
  }

  //Card navigasyonunu sağlar,parameteleri iletir.
  onCardClick(storeId: string, skipId: number) {
    this.router.navigate(['/store-info'], { queryParams: { storeId, skipId } });
  }

  private async getCurrentLocation() {
    try {
      const location = await this.locationService.getCurrentLocation();
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    } catch (error) {
      console.error('Error getting location', error);
    }
  }
  //favori ikonlarını aktif/pasif hale getirir
  toggleFavorite(event: Event, storeId: string) { 
    event.stopPropagation();
    this.isFavorite[storeId] = !this.isFavorite[storeId]; 
}
}
