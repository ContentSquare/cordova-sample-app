import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstTabPage } from './first-tab.page';

const routes: Routes = [
  {
    path: '',
    component: FirstTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstTabPageRoutingModule {}
