import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSubInfoModule } from './store-subinfo/store-subinfo.module';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule,StoreSubInfoModule]
})
export class SharedModule { }