import { Component, Input } from '@angular/core';

@Component({
  selector: 'store-subinfo',
  templateUrl: './store-subinfo.component.html',
  styleUrls: ['./store-subinfo.component.scss'],
})
//İki sayfadada kullanılan min tutar, uzaklık, ve süreyi tutan reusable component
export class StoreSubInfoComponent {
  @Input() title: string = ''; 
  @Input() min_order_price: number = 0; 
  @Input() theme: number = 0; 
  @Input() distance: number = 0; 

  constructor() {}
}
