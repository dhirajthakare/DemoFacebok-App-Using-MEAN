import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CreateAndLoginComponent } from './create-and-login/create-and-login.component';
import { HeaderComponent } from './main/header/header.component';
import { ContentBodyComponent } from './main/content-body/content-body.component';
import { SidebarComponent } from './main/sidebar/sidebar.component';
import { Sidebar2Component } from './main/sidebar2/sidebar2.component';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { PostComponent } from './post/post.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SearchUserResultComponent } from './search-user-result/search-user-result.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FriendsComponent } from './friends/friends.component';
import { FriendsSidebarComponent } from './friends/friends-sidebar/friends-sidebar.component';
import { AllFriendsComponent } from './friends/all-friends/all-friends.component';
import { HomeComponent } from './friends/home/home.component';
import { FriendsRequestsComponent } from './friends/friends-requests/friends-requests.component';
import { StoriesComponent } from './stories/stories.component';
import { CreatestoriesComponent } from './stories/createstories/createstories.component';
import { ShowStoriesComponent } from './stories/show-stories/show-stories.component';
import { AllPhotosComponent } from './profile/all-photos/all-photos.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';
import { UserFriendsComponent } from './profile/user-friends/user-friends.component';
import { ProfileIntroComponent } from './profile/profile-intro/profile-intro.component';
import { AboutProfileComponent } from './profile/about-profile/about-profile.component';
import { ProfileStoryArchiveComponent } from './profile/profile-story-archive/profile-story-archive.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AllSearchResultComponent } from './search-results/all-search-result/all-search-result.component';
import { SearchResultSidebarComponent } from './search-results/search-result-sidebar/search-result-sidebar.component';
import { SearchPostComponent } from './search-results/search-post/search-post.component';
import { SearchPeopleComponent } from './search-results/search-people/search-people.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FindYourAccountPageComponent } from './create-and-login/find-your-account-page/find-your-account-page.component';
import { AccountCreateLoginComponent } from './create-and-login/account-create-login/account-create-login.component';
import { EnterRecoverCodeComponent } from './create-and-login/enter-recover-code/enter-recover-code.component';
import { EnterNewPasswordComponent } from './create-and-login/enter-new-password/enter-new-password.component';
import { RecoverComponent } from './create-and-login/recover/recover.component';
import { MatDatepickerModule } from  '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AccountCreateDialogComponent } from './create-and-login/account-create-login/account-create-dialog/account-create-dialog.component';
import { ChatMessangerComponent } from './chat-messanger/chat-messanger.component';
import { MessangerComponent } from './chat-messanger/messanger/messanger.component';
import { LikeUserDialogComponent } from './post/like-user-dialog/like-user-dialog.component';
import { CreatePostDialogComponent } from './createpost/create-post-dialog/create-post-dialog.component';
import { UpdatePostDialogComponent } from './post/update-post-dialog/update-post-dialog.component';
import { FriendsChatSideBar1Component } from './chat-messanger/friends-chat-side-bar1/friends-chat-side-bar1.component';
import { FriendsChatSideBar2Component } from './chat-messanger/friends-chat-side-bar2/friends-chat-side-bar2.component';
import { FriendsChatMainComponent } from './chat-messanger/friends-chat-main/friends-chat-main.component';
import { HomepageComponent } from './main/homepage/homepage.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CreateAndLoginComponent,
    ContentBodyComponent,
    SidebarComponent,
    Sidebar2Component,
    ErrorComponent,
    ProfileComponent,
    UserProfileComponent,
    PostComponent,
    CreatepostComponent,
    SearchUserResultComponent,
    FriendsComponent,
    FriendsSidebarComponent,
    AllFriendsComponent,
    HomeComponent,
    FriendsRequestsComponent,
    StoriesComponent,
    CreatestoriesComponent,
    ShowStoriesComponent,
    AllPhotosComponent,
    ProfileHeaderComponent,
    UserFriendsComponent,
    ProfileIntroComponent,
    AboutProfileComponent,
    ProfileStoryArchiveComponent,
    SearchResultsComponent,
    AllSearchResultComponent,
    SearchResultSidebarComponent,
    SearchPostComponent,
    SearchPeopleComponent,
    FindYourAccountPageComponent,
    AccountCreateLoginComponent,
    EnterRecoverCodeComponent,
    EnterNewPasswordComponent,
    RecoverComponent,
    AccountCreateDialogComponent,
    ChatMessangerComponent,
    MessangerComponent,
    LikeUserDialogComponent,
    CreatePostDialogComponent,
    UpdatePostDialogComponent,
    FriendsChatSideBar1Component,
    FriendsChatSideBar2Component,
    FriendsChatMainComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    PickerModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AccountCreateDialogComponent
  ]
})
export class AppModule { }
