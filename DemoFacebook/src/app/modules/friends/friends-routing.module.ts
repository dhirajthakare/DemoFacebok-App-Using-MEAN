import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFriendsComponent } from './all-friends/all-friends.component';
import { FriendHomeComponent } from './friend-home/friend-home.component';
import { FriendsRequestsComponent } from './friends-requests/friends-requests.component';
import { FriendsComponent } from './friends.component';

const routes: Routes = [{ path: '', component: FriendsComponent ,children:[
  {path:'' , component:FriendHomeComponent},
  {path:'friend-request',component:FriendsRequestsComponent },
  {path:'all-friends' , component:AllFriendsComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
