import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeuanganPageRoutingModule } from './keuangan-routing.module';

import { KeuanganPage } from './keuangan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeuanganPageRoutingModule
  ],
  declarations: [KeuanganPage]
})
export class KeuanganPageModule {}
