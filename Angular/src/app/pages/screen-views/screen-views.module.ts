import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenViewsPageRoutingModule } from './screen-views-routing.module';

import { ScreenViewsPage } from './screen-views.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenViewsPageRoutingModule
  ],
  declarations: [ScreenViewsPage]
})
export class ScreenViewsPageModule {}
