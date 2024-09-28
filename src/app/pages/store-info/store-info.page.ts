import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreInfo } from '@store/store-info/store-info.model';
import { loadStoreInfo } from '@store/store-info/store-info.actions';
import { Observable, of } from 'rxjs';
import { selectStoreInfo } from '@store/store-info/store-info.selector';
import { NavController } from '@ionic/angular';
import { LocationService } from '@services/location.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.page.html',
  styleUrls: ['./store-info.page.scss'],
})
export class StoreInfoPage implements OnInit {
  storeInfo$: Observable<StoreInfo> = of({} as StoreInfo);
  storeId: string;
  skipId: number;
  latitude: number = 0;
  longitude: number = 0;
  isLoading: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private navController: NavController,
    private locationService: LocationService
  ) {
    this.storeId = this.route.snapshot.queryParamMap.get('storeId') || '';
    const skipIdParam = this.route.snapshot.queryParamMap.get('skipId');
    this.skipId = skipIdParam ? parseInt(skipIdParam) : 0;
  }

  //Store-info verilerini çeker ve veri dolana kadar bekler.
  async ngOnInit() {
    await this.getCurrentLocation();
    this.store.dispatch(
      loadStoreInfo({
        id: this.storeId,
        skip: this.skipId,
        latitude: this.latitude,
        longitude: this.longitude,
      })
    );
    this.storeInfo$ = this.store.select(selectStoreInfo);
    this.storeInfo$.subscribe((storeInfo) => {
      if (storeInfo.feedInfo && storeInfo.storeInfoDetail.id === this.storeId) {
        this.isLoading = false;
      }
    });
  }

  //lokasyon servisini çağırır, değerleri setler
  private async getCurrentLocation() {
    try {
      const location = await this.locationService.getCurrentLocation();
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  //butona tıklandığında önceki sayfaya döndüren fonksiyon.
  navigateToFeed() {
    this.navController.setDirection('back');
    this.router.navigate(['/feed']);
  }

  //favori ikonunu aktif/pasif hale getirir
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
/* restoranın çalıştığı saatlere göre açık olduğu saatleri hesaplayan fonksiyonlar BAŞLANGIÇ */
  getCurrentWorkingHours(workingHours: any): any {
    const currentDay = this.getCurrentDay();
    return workingHours.find((wh: any) => wh.day === currentDay);
  }
  getCurrentDay(): number {
    console.log(new Date().getDay() - 1);
    return new Date().getDay() - 1;
  }

  printStoreHours(workingHours: any): { message: string; isOpen: boolean } {
    const currentWorkingHours = this.getCurrentWorkingHours(workingHours);
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    if (!currentWorkingHours || currentWorkingHours.closed) {
      return { message: 'Şuan Kapalı', isOpen: false };
    }

    const [openHour, openMinute] = currentWorkingHours.open
      .split(':')
      .map(Number);
    const [closeHour, closeMinute] = currentWorkingHours.close
      .split(':')
      .map(Number);
    const openInMinutes = openHour * 60 + openMinute;
    const closeInMinutes = closeHour * 60 + closeMinute;

    if (
      currentTimeInMinutes >= openInMinutes &&
      currentTimeInMinutes < closeInMinutes
    ) {
      return {
        message: `Şuan Açık : ${currentWorkingHours.open} - ${currentWorkingHours.close}`,
        isOpen: true,
      };
    } else {
      return { message: 'Şuan Kapalı', isOpen: false };
    }
  }

  /* restoranın çalıştığı saatlere göre açık olduğu saatleri hesaplayan fonksiyonlar BİTİŞ */
}
