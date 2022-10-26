import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdTabPage } from './third-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdTabPageRoutingModule {}
