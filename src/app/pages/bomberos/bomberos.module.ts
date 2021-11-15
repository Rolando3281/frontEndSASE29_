import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BomberosRoutingModule } from './bomberos-routing.module';
import { BomberosComponent } from './bomberos.component';


@NgModule({
  declarations: [
    BomberosComponent
  ],
  imports: [
    CommonModule,
    BomberosRoutingModule
  ]
})
export class BomberosModule { }
