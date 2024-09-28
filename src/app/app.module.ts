import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { feedReducer } from '@store/feed/feed.reducer';
import { FeedEffects } from '@store/feed/feed.effects';
import { storeInfoReducer } from '@store/store-info/store-info.reducer';
import { StoreInfoEffects } from '@store/store-info/store-info.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, StoreModule.forRoot({feed: feedReducer,storeInfo: storeInfoReducer}), EffectsModule.forRoot([FeedEffects,StoreInfoEffects])],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
