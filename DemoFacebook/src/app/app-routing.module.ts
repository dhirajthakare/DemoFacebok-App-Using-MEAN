import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'messanger', loadChildren: () => import('./modules/messanger/messanger.module').then(m => m.MessangerModule), canActivate:[AuthGuard] },
  { path: 'friends', loadChildren: () => import('./modules/friends/friends.module').then(m => m.FriendsModule), canActivate:[AuthGuard] },
  { path: 'stories', loadChildren: () => import('./modules/stories/stories.module').then(m => m.StoriesModule), canActivate:[AuthGuard] },
  { path: 'search', loadChildren: () => import('./modules/search-results/search-results.module').then(m => m.SearchResultsModule), canActivate:[AuthGuard] },
  { path: 'deskbook', loadChildren: () => import('./modules/main-body/main-body.module').then(m => m.MainBodyModule) , canActivate:[AuthGuard] },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate:[AuthGuard] },
  { path: 'footer', loadChildren: () => import('./common/footer/footer.module').then(m => m.FooterModule) },
  { path: '**', component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
