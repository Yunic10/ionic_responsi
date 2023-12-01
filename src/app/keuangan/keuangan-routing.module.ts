import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeuanganPage } from './keuangan.page';

const routes: Routes = [
  {
    path: '',
    component: KeuanganPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeuanganPageRoutingModule {}
