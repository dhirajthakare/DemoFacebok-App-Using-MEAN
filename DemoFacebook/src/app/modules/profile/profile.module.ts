import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileBodyComponent } from './profile-body/profile-body.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { ProfileStoryArchiveComponent } from './profile-story-archive/profile-story-archive.component';
import { ProfileIntroComponent } from './profile-intro/profile-intro.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { AllPhotosComponent } from './all-photos/all-photos.component';
import { AboutProfileComponent } from './about-profile/about-profile.component';
import { SearchUserResultModule } from 'src/app/common/search-user-result/search-user-result.module';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';
import { DisplayPostModule } from 'src/app/common/display-post/display-post.module';
import { CreatePostModule } from 'src/app/common/create-post/create-post.module';
import { StoriesModule } from '../stories/stories.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileBodyComponent,
    UserFriendsComponent,
    ProfileStoryArchiveComponent,
    ProfileIntroComponent,
    ProfileHeaderComponent,
    AllPhotosComponent,
    AboutProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SearchUserResultModule,
    MainHeaderModule,
    DisplayPostModule,
    CreatePostModule,
    StoriesModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
