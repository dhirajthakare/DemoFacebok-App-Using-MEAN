import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';
import { AuthGuard } from './common/guards/auth.guard';
import { GuestGuard } from './common/guards/guest.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule), canActivate:[GuestGuard] },
  { path: 'messenger', loadChildren: () => import('./modules/messenger/messenger.module').then(m => m.MessengerModule), canActivate:[AuthGuard] },
  { path: 'friends', loadChildren: () => import('./modules/friends/friends.module').then(m => m.FriendsModule), canActivate:[AuthGuard] },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule), canActivate:[AuthGuard] },
  { path: 'search', loadChildren: () => import('./modules/search-results/search-results.module').then(m => m.SearchResultsModule), canActivate:[AuthGuard] },
  { path: 'deskbook', loadChildren: () => import('./modules/main-body/main-body.module').then(m => m.MainBodyModule) , canActivate:[AuthGuard] },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate:[AuthGuard] },
  { path: 'takecall', loadChildren: () => import('./modules/take-call/take-call.module').then(m => m.TakeCallModule) },
  { path: '**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
