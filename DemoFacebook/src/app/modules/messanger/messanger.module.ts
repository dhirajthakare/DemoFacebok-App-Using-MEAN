import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessangerRoutingModule } from './messanger-routing.module';
import { MessangerComponent } from './messanger.component';
import { MessangerSidebarRightComponent } from './messanger-sidebar-right/messanger-sidebar-right.component';
import { MessangerSidebarLeftComponent } from './messanger-sidebar-left/messanger-sidebar-left.component';
import { MessangerMainComponent } from './messanger-main/messanger-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FooterModule } from 'src/app/common/footer/footer.module';
import { SearchUserResultModule } from 'src/app/common/search-user-result/search-user-result.module';


@NgModule({
  declarations: [
    MessangerComponent,
    MessangerSidebarRightComponent,
    MessangerSidebarLeftComponent,
    MessangerMainComponent
    ],
  imports: [
    CommonModule,
    MessangerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainHeaderModule,
    PickerModule,
    FooterModule,
    SearchUserResultModule
  ]
})
export class MessangerModule { }
