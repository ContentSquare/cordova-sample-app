import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenModalPageRoutingModule } from './screen-modal-routing.module';

import { ScreenModalPage } from './screen-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenModalPageRoutingModule
  ],
  declarations: [ScreenModalPage]
})
export class ScreenModalPageModule {}
