import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BomberosComponent } from './bomberos.component';

const routes: Routes = [{ path: '', component: BomberosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BomberosRoutingModule { }
