import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondTabPage } from './second-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SecondTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondTabPageRoutingModule {}
