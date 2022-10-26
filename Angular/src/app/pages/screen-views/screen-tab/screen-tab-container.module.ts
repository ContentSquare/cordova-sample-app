import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenTabContainerPageRoutingModule } from './screen-tab-container-routing.module';

import { ScreenTabContainerPage } from './screen-tab-container.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenTabContainerPageRoutingModule
  ],
  declarations: [ScreenTabContainerPage]
})
export class ScreenTabContainerPageModule {}
