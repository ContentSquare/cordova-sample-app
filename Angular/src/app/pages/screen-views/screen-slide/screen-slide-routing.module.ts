import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenSlidePage } from './screen-slide.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenSlidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenSlidePageRoutingModule {}
