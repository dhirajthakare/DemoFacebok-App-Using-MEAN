import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainBodyRoutingModule } from './main-body-routing.module';
import { MainBodyComponent } from './main-body.component';
import { MainSidebarLeftComponent } from './main-sidebar-left/main-sidebar-left.component';
import { MainSidebarRightComponent } from './main-sidebar-right/main-sidebar-right.component';
import { MainHomepageComponent } from './main-homepage/main-homepage.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SearchUserResultModule } from 'src/app/common/search-user-result/search-user-result.module';
import { MainHeaderModule } from 'src/app/common/main-header/main-header.module';
import { StoriesModule } from '../stories/stories.module';
import { CreatePostModule } from 'src/app/common/create-post/create-post.module';
import { DisplayPostModule } from 'src/app/common/display-post/display-post.module';
import { BoxMessengerModule } from 'src/app/common/box-messenger/box-messenger.module';
import { FooterModule } from 'src/app/common/footer/footer.module';
import { AcceptCallModule } from 'src/app/common/accept-call/accept-call.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    MainBodyComponent,
    MainSidebarLeftComponent,
    MainSidebarRightComponent,
    MainHomepageComponent,
    MainContentComponent,
  ],
  imports: [
    CommonModule,
    MainBodyRoutingModule,
    SearchUserResultModule,
    MainHeaderModule,
    StoriesModule,
    CreatePostModule,
    DisplayPostModule,
    BoxMessengerModule,
    FooterModule,
    AcceptCallModule,  
    InfiniteScrollModule
  ]
})
export class MainBodyModule { }
