import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreInfoPageRoutingModule } from './store-info-routing.module';
import { StoreInfoPage } from './store-info.page';
import { SharedModule } from '@components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreInfoPageRoutingModule,
    SharedModule
  ],
  declarations: [StoreInfoPage]
})
export class StoreInfoPageModule {}
