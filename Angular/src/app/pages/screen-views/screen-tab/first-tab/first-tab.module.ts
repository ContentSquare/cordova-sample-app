import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstTabPageRoutingModule } from './first-tab-routing.module';

import { FirstTabPage } from './first-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstTabPageRoutingModule
  ],
  declarations: [FirstTabPage]
})
export class FirstTabPageModule {}
