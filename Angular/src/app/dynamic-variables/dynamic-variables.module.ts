import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicVariablesPageRoutingModule } from './dynamic-variables-routing.module';

import { DynamicVariablesPage } from './dynamic-variables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicVariablesPageRoutingModule
  ],
  declarations: [DynamicVariablesPage]
})
export class DynamicVariablesPageModule {}
