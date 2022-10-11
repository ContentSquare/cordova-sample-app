import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenViewsPage } from './screen-views.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenViewsPage
  },
  {
    path: 'screen-default',
    loadChildren: () => import('./screen-default/screen-default.module').then( m => m.ScreenDefaultPageModule)
  },
  {
    path: 'screen-modal',
    loadChildren: () => import('./screen-modal/screen-modal.module').then( m => m.ScreenModalPageModule)
  },
  {
    path: 'screen-slide',
    loadChildren: () => import('./screen-slide/screen-slide.module').then( m => m.ScreenSlidePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenViewsPageRoutingModule {}
