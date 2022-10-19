import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdTabPageRoutingModule } from './third-tab-routing.module';

import { ThirdTabPage } from './third-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdTabPageRoutingModule
  ],
  declarations: [ThirdTabPage]
})
export class ThirdTabPageModule {}
