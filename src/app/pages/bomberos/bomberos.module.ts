import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BomberosRoutingModule } from './bomberos-routing.module';
import { BomberosComponent } from './bomberos.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [
    BomberosComponent
  ],
  imports: [
    CommonModule,
    BomberosRoutingModule,
    MaterialModule
  ]
})
export class BomberosModule { }
