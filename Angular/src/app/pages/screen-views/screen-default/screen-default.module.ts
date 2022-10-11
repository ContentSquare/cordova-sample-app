import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenDefaultPageRoutingModule } from './screen-default-routing.module';

import { ScreenDefaultPage } from './screen-default.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenDefaultPageRoutingModule
  ],
  declarations: [ScreenDefaultPage]
})
export class ScreenDefaultPageModule {}
