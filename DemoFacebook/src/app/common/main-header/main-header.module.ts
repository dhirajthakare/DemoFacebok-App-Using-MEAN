import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHeaderRoutingModule } from './main-header-routing.module';
import { MainHeaderComponent } from './main-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    MainHeaderRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    MainHeaderComponent
  ]
})
export class MainHeaderModule { }
