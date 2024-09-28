import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreSubInfoComponent } from './store-subinfo.component';

@NgModule({
  declarations: [StoreSubInfoComponent],
  imports: [CommonModule,IonicModule,FormsModule],
  exports: [StoreSubInfoComponent],
})
export class StoreSubInfoModule {}

