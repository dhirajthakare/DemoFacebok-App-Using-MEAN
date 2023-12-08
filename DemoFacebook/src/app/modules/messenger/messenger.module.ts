import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { MessengerSidebarRightComponent } from './messanger-sidebar-right/messanger-sidebar-right.component';
import { MessengerSidebarLeftComponent } from './messanger-sidebar-left/messanger-sidebar-left.component';
import { MessengerMainComponent } from './messenger-main/messenger-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FooterModule } from 'src/app/common/footer/footer.module';
import { SearchUserResultModule } from 'src/app/common/search-user-result/search-user-result.module';
import { AcceptCallModule } from 'src/app/common/accept-call/accept-call.module';


@NgModule({
  declarations: [
    MessengerComponent,
    MessengerSidebarRightComponent,
    MessengerSidebarLeftComponent,
    MessengerMainComponent
    ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainHeaderModule,
    PickerModule,
    FooterModule,
    SearchUserResultModule,
    AcceptCallModule
  ]
})
export class MessengerModule { }
