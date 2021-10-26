import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAndLoginComponent } from './create-and-login/create-and-login.component';
import { ErrorComponent } from './error/error.component';
import { AllFriendsComponent } from './friends/all-friends/all-friends.component';
import { FriendsRequestsComponent } from './friends/friends-requests/friends-requests.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './friends/home/home.component';
import { ContentBodyComponent } from './main/content-body/content-body.component';
import { HeaderComponent } from './main/header/header.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { Sidebar2Component } from './main/sidebar2/sidebar2.component';
import { AboutProfileComponent } from './profile/about-profile/about-profile.component';
import { AllPhotosComponent } from './profile/all-photos/all-photos.component';
import { MessangerComponent } from './profile/messanger/messanger.component';
import { ProfileStoryArchiveComponent } from './profile/profile-story-archive/profile-story-archive.component';
import { ProfileComponent } from './profile/profile.component';
import { UserFriendsComponent } from './profile/user-friends/user-friends.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { AllSearchResultComponent } from './search-results/all-search-result/all-search-result.component';
import { SearchPeopleComponent } from './search-results/search-people/search-people.component';
import { SearchPostComponent } from './search-results/search-post/search-post.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { CreatestoriesComponent } from './stories/createstories/createstories.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  {path:'' , component:CreateAndLoginComponent},
  {
  path:'facebook' , component:MainComponent , children:[
  {path:'header' , component:HeaderComponent},
  {path:'' , component:ContentBodyComponent},
  {path:'sidebar' , component:SidebarComponent},
  {path:'sidebar2' , component:Sidebar2Component},]
 },
  {
      path:'stories' , component:StoriesComponent , children:[
      {path:'create',component:CreatestoriesComponent}
    ]
  },
  {path:'profile/:token',component:ProfileComponent , children:[
    {path:'' , component:UserProfileComponent},
    {path:'photos' , component:AllPhotosComponent},
    {path:'friends' , component:UserFriendsComponent},
    {path:'about' , component:AboutProfileComponent},
    {path:'archive' , component:ProfileStoryArchiveComponent},
    {path:'messanger' , component:MessangerComponent},

  ] },
  {path:'friends',component:FriendsComponent, children:[
    {path:'' , component:HomeComponent},
    {path:'friend-request',component:FriendsRequestsComponent },
    {path:'allfriends' , component:AllFriendsComponent}
  ] },
  {path:'search',component:SearchResultsComponent , children:[
    {path:'',redirectTo:'top',pathMatch:'prefix'},
    {path:'top',component:AllSearchResultComponent},
    {path:'posts',component:SearchPostComponent},
    {path:'peoples',component:SearchPeopleComponent},

  ]},
  // {path:':name' , component:ProfileComponent},
  {path:'**' , component:ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
