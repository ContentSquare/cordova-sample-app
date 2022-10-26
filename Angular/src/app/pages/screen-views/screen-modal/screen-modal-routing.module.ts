import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenModalPage } from './screen-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenModalPageRoutingModule {}
