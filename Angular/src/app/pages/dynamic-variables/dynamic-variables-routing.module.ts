import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicVariablesPage } from './dynamic-variables.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicVariablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DynamicVariablesPageRoutingModule {}
