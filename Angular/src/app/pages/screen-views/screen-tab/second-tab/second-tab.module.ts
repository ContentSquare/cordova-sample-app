import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondTabPageRoutingModule } from './second-tab-routing.module';

import { SecondTabPage } from './second-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondTabPageRoutingModule
  ],
  declarations: [SecondTabPage]
})
export class SecondTabPageModule {}
