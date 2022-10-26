import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenTabContainerPage } from './screen-tab-container.page';

const routes: Routes = [
  {
    path: '',
    component: ScreenTabContainerPage,
    children: [
      {
        path: '',
        redirectTo: '/screen-views/screen-tab-container/first-tab',
        pathMatch: 'full',
      },
      {
        path: 'first-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('./first-tab/first-tab.module').then(m => m.FirstTabPageModule)
          }
        ]

      },
      {
        path: 'second-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('./second-tab/second-tab.module').then(m => m.SecondTabPageModule)
          }
        ]

      },
      {
        path: 'third-tab',
        children: [
          {
            path: '',
            loadChildren: () => import('./third-tab/third-tab.module').then(m => m.ThirdTabPageModule)
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenTabContainerPageRoutingModule { }
