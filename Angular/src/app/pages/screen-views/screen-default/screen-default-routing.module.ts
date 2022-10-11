import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenDefaultPage } from './screen-default.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenDefaultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenDefaultPageRoutingModule {}
