import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { FriendHomeComponent } from './friend-home/friend-home.component';
import { FriendsSidebarComponent } from './friends-sidebar/friends-sidebar.component';
import { FriendsRequestsComponent } from './friends-requests/friends-requests.component';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { SearchUserResultModule } from 'src/app/common/search-user-result/search-user-result.module';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';
import { FooterModule } from 'src/app/common/footer/footer.module';


@NgModule({
  declarations: [
    FriendsComponent,
    FriendHomeComponent,
    FriendsSidebarComponent,
    FriendsRequestsComponent,
    AllFriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    SearchUserResultModule,
    MainHeaderModule,
    FooterModule
  ]
})
export class FriendsModule { }
