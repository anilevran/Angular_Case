import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'feed',
    loadChildren: () =>
      import('./pages/feed/feed.module').then((m) => m.FeedPageModule),
  },
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full',
  },
  {
    path: 'store-info',
    loadChildren: () =>
      import('./pages/store-info/store-info.module').then(
        (m) => m.StoreInfoPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
