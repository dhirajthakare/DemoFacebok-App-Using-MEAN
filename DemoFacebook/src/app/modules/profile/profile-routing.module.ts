import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProfileComponent } from './about-profile/about-profile.component';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { ProfileBodyComponent } from './profile-body/profile-body.component';
import { ProfileStoryArchiveComponent } from './profile-story-archive/profile-story-archive.component';
import { ProfileComponent } from './profile.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';

const routes: Routes = [
  { path: ':token', component: ProfileComponent , children:[
    {path:'' , component:ProfileBodyComponent},
    {path:'photos' , component:AllPhotosComponent},
    {path:'friends' , component:UserFriendsComponent},
    {path:'about' , component:AboutProfileComponent},
    {path:'archive' , component:ProfileStoryArchiveComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
