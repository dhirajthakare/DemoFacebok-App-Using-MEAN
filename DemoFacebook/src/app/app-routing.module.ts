import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'messanger', loadChildren: () => import('./modules/messanger/messanger.module').then(m => m.MessangerModule) },
  { path: 'friends', loadChildren: () => import('./modules/friends/friends.module').then(m => m.FriendsModule) },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule) },
  { path: 'search', loadChildren: () => import('./modules/search-results/search-results.module').then(m => m.SearchResultsModule) },
  { path: 'deskbook', loadChildren: () => import('./modules/main-body/main-body.module').then(m => m.MainBodyModule) },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  { path: '**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
